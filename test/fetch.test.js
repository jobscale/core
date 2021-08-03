require('..');

describe('test fetch', () => {
  it('toMatch prompt', async () => {
    const url = 'https://inet-ip.info/ip';
    return fetch(url)
    .then(res => res.text())
    .then(ip => {
      logger.info({ ip });
      const regexp = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/;
      expect(ip).toMatch(regexp);
    });
  });
});
