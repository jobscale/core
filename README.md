# @jobscale/core

## install

```
npm i @jobscale/core
```

## examples

### logger

```
require('@jobscale/core');

logger.info({ timestamp: Date.now() });
```

### promise

```
require('@jobscale/core');

const timer = (...args) => {
  const prom = promise();
  setTimeout(prom.resolve, ...args);
  return prom.pending;
};

timer(1000, 'wait 1000 ms')
.then(logger.info);
```

### fetch

```
require('@jobscale/core');

fetch('https://inet-ip.info/ip')
.then(res => res.text())
.then(ip => logger.info({ ip }));
```

## ESLint settings

```
{
  globals: {
    logger: 'readonly',
    promise: 'readonly',
    fetch: 'readonly',
  },
}
```
