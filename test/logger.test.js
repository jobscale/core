const { Logger } = require('..');

const logger = new Logger({ logLevel: 'trace' });

describe('test logger', () => {
  it('toBeUndefined prompt', () => {
    const { log } = console;
    log(new Error('do not work'));
    expect(logger.info({ timestamp: new Date().toLocaleString() })).toBeUndefined();
  });

  describe('multiple load', () => {
    beforeEach(() => {
      jest.resetModules();
      logger.info('beforeEach');
    });
    afterEach(() => {
      logger.info('afterEach');
    });
    it('toBeUndefined prompt', () => {
      const loader = require;
      loader('..');
      expect(logger.info({ timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
  });
});
