class Core {
  constructor() {
    global.logger = this.logger;
    global.promiseGen = this.promiseGen;
    global.fetch = this.fetch;
  }

  get logger() {
    const std = console;
    const native = () => undefined;
    const logger = {};
    Object.entries(std).forEach(([key, value]) => {
      logger[key] = value;
      std[key] = native;
    });
    return logger;
  }

  promise() {
    const prom = {};
    prom.pending = new Promise((...args) => [prom.resolve, prom.reject] = args);
    return prom;
  }

  fetch(url, options) {
    const loader = require;
    const instanceOptions = { ...options };
    const [protocol] = url.split(':');
    const proxy = process.env[`${protocol}_proxy`];
    if (!instanceOptions.agent && proxy) {
      logger.info({ proxy });
      const Agent = loader(`${protocol}-proxy-agent`);
      instanceOptions.agent = new Agent(proxy);
    }
    return loader('node-fetch')(url, instanceOptions);
  }
}

module.exports = new Core();
