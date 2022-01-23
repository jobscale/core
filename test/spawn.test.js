const { Logger } = require('..');

const logger = new Logger({ logLevel: 'trace' });

describe('test spawn stdout', () => {
  it('spawn ping', async () => {
    await spawn('ping', ['-c', '2', '-i', '1', '127.0.0.1'])
    .then(out => {
      logger.info(out);
      expect(logger.info({ timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
  });

  it('spawn ping res.write', async () => {
    const res = { write: blob => logger.info(blob.toString()) };
    await spawn('ping', ['-c', '2', '-i', '1', '-W', '1', '128.255.255.255'], { res })
    .then(() => {
      expect(logger.info({ timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
  });

  it('spawn ping stderr', async () => {
    await spawn('ping', ['-c', '2', '-i', '1', '-W', '1', '127.255.255.255'])
    .then(out => {
      logger.info(out);
      expect(logger.info({ timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
  });
});
