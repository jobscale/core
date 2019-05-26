(() => {
  const native = () => {};
  global.logger = {};
  /* eslint-disable no-restricted-syntax */
  for (const key in console) { /* eslint-enable no-restricted-syntax */
    if ({}.hasOwnProperty.call(console, key)) {
      /* eslint-disable no-console */
      logger[key] = console[key];
      console[key] = native; /* eslint-enable no-console */
    }
  }
  global.promiseGen = () => {
    const promise = {};
    promise.instance = new Promise((...argv) => {
      [promise.resolve, promise.reject] = argv;
    });
    return promise;
  };
  global.fetch = (url, options) => {
    const instanceOptions = Object.assign({}, options);
    if (!instanceOptions.agent && process.env.http_proxy) {
      logger.log(process.env.http_proxy);
      const protocol = url.split(':')[0];
      /* eslint-disable global-require, import/no-dynamic-require */
      const Agent = require(`${protocol}-proxy-agent`);
      instanceOptions.agent = new Agent(process.env[`${protocol}_proxy`]);
    }
    return require('node-fetch')(url, instanceOptions);
    /* eslint-enable global-require, import/no-dynamic-require */
  };
})();
module.exports = {
  logger: global.logger,
  promiseGen: global.promiseGen,
  fetch: global.fetch,
};
