require('..');

describe('test logger', () => {
  it('toBeUndefined prompt', () => {
    const { log } = console;
    log(new Error('do not work'));
    expect(logger.info({ timestamp: new Date().toLocaleString() })).toBeUndefined();
  });
});
