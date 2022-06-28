const { Logger } = require('..');

const logger = new Logger({ logLevel: 'trace' });

describe('test spawn stdout', () => {
  it('spawn ping', async () => {
    const args = ['-c', '2', '-i', '1', '127.0.0.1'];
    logger.info(`ping ${args.join(' ')}`);
    await spawn('ping', args)
    .then(out => {
      logger.info({ out });
      expect(logger.info({ timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
  });

  it('spawn ping res.write', async () => {
    const res = { write: blob => logger.info(blob.toString()) };
    const args = ['-c', '2', '-i', '1', '-W', '1', '128.255.255.255'];
    logger.info(`ping ${args.join(' ')}`);
    await spawn('ping', args, { res })
    .then(out => {
      logger.info({ out });
      expect(logger.info({ timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
  });

  it('spawn ping stderr', async () => {
    const args = ['-c', '2', '-i', '1', '-W', '1', '-b', '127.255.255.255'];
    logger.info(`ping ${args.join(' ')}`);
    await spawn('ping', args)
    .then(out => {
      logger.info({ out });
      expect(logger.info({ timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
  });
});
