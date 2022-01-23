const { spawn } = require('child_process');
const { Logger } = require('@jobscale/logger');

const logger = new Logger({ logLevel: 'trace' });

class Core {
  constructor() {
    this.initializePrototype();
    global.spawn = this.spawn;
    global.fetch = this.fetch;
  }

  initializePrototype() {
    Object(Date).prototype.toLocaleString = function _() {
      const d = {
        Y: this.getFullYear(),
        m: `0${this.getMonth() + 1}`.slice(-2),
        d: `0${this.getDate()}`.slice(-2),
        H: `0${this.getHours()}`.slice(-2),
        M: `0${this.getMinutes()}`.slice(-2),
        S: `0${this.getSeconds()}`.slice(-2),
      };
      return `${d.Y}-${d.m}-${d.d} ${d.H}:${d.M}:${d.S}`;
    };
  }

  spawn(command, params, options) {
    const prom = {};
    prom.pending = new Promise((...args) => {
      [prom.resolve] = args;
    });
    const { res } = options || {};
    const result = [];
    const proc = spawn(command, params, { shell: true, ...options });
    proc.stdout.on('data', data => {
      if (!res) {
        result.push(data);
        return;
      }
      res.write(data);
      clearTimeout(prom.timer);
      prom.timer = setInterval(() => res.write(''), 60000);
    });
    proc.stderr.on('data', data => {
      logger.error(`stderr: ${data.toString()}`);
    });
    proc.on('close', code => {
      logger.info(`child process exited with code ${code}`);
      clearTimeout(prom.timer);
      prom.resolve(result.join(''));
    });
    return prom.pending;
  }

  fetch(url, options) {
    const loader = require;
    const instanceOptions = { ...options };
    const [protocol] = url.split(':');
    const proxy = process.env[`${protocol}_proxy`];
    if (!instanceOptions.agent && proxy) {
      logger.info({ protocol, proxy });
      const Agent = loader(`${protocol}-proxy-agent`);
      instanceOptions.agent = new Agent(proxy);
    }
    return loader('node-fetch')(url, instanceOptions);
  }
}

module.exports = new Core();
module.exports.Logger = Logger;
