require('..');

describe('test promise', () => {
  const timer = (...args) => {
    const prom = promise();
    setTimeout(prom.resolve, ...args);
    return prom.pending;
  };

  it('toMatch prompt', async () => {
    const prompt = 'wait for 1000 ms';
    return timer(1000, prompt)
    .then(res => {
      logger.info(prompt);
      expect(res).toMatch(prompt);
    });
  });
});
