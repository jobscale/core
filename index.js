class Core {
  constructor() {
    this.initializeProperty();
    this.initializePrototype();
    global.logger = this.logger;
    global.promise = this.promise;
    global.fetch = this.fetch;
  }

  initializeProperty() {
    Object.defineProperty(global, '__line', {
      get() { return new Error().stack.split('\n')[3].split(':').reverse()[1]; },
    });
    Object.defineProperty(global, '__fname', {
      get() { return new Error().stack.split('\n')[3].split(/[: ]/).reverse()[2]; },
    });
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

  get logger() {
    const std = console;
    const native = () => undefined;
    const logger = {};
    Object.entries(std).forEach(([key, value]) => {
      if (typeof value !== 'function') return;
      logger[key] = (...args) => value(__fname, __line, ...args);
      std[key] = native;
    });
    return logger;
  }

  promise() {
    const prom = {};
    prom.pending = new Promise((...args) => {
      [prom.resolve, prom.reject] = args;
    });
    return prom;
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
