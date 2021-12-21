require('..');

describe('test fetch', () => {
  const action = () => {
    const url = 'https://inet-ip.info/ip';
    const regexp = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/;
    return fetch(url)
    .then(res => res.text())
    .then(ip => ({ ip, regexp }));
  };

  describe('strate fetch', () => {
    it('toMatch prompt', async () => {
      await action()
      .then(({ ip, regexp }) => {
        logger.info({ ip });
        expect(ip).toMatch(regexp);
      });
    });
  });

  describe('proxy fetch', () => {
    const storeEnv = process.env;
    beforeEach(() => {
      jest.resetModules();
      process.env = { ...storeEnv, https_proxy: 'http://jsx.jp:3128' };
    });
    afterEach(() => {
      process.env = storeEnv;
    });
    it('toMatch prompt', async () => {
      await action()
      .then(({ ip, regexp }) => {
        logger.info({ ip });
        expect(ip).toMatch(regexp);
      });
    });
  });
});