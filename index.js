const std = console;
const loader = require;
const native = () => undefined;
class Core {
  constructor() {
    global.logger = this.logger;
    global.promiseGen = this.promiseGen;
    global.fetch = this.fetch;
  }
  get logger() {
    const logger = {};
    Object.entries(std).forEach(([key, value]) => {
      logger[key] = value;
      std[key] = native;
    });
    return logger;
  }
  promiseGen() {
    const promise = {};
    promise.pending = new Promise((...argv) => {
      [promise.resolve, promise.reject] = argv;
    });
    promise.instance = promise.pending;
    return promise;
  }
  fetch(url, options) {
    const instanceOptions = {};
    Object.assign(instanceOptions, options);
    const protocol = url.split(':')[0];
    const proxy = process.env[`${protocol}_proxy`];
    if (!instanceOptions.agent && proxy) {
      logger.info({ proxy });
      const Agent = loader(`${protocol}-proxy-agent`);
      instanceOptions.agent = new Agent(proxy);
    }
    return loader('node-fetch')(url, instanceOptions);
  }
}
const core = new Core();
module.exports = {
  logger: core.logger,
  promiseGen: core.promiseGen,
  fetch: core.fetch,
};
