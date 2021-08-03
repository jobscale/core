require('..');

describe('test logger', () => {
  it('toBeUndefined prompt', () => {
    expect(logger.info({ timestamp: new Date().toLocaleString() })).toBeUndefined();
  });
});
