# @jobscale/core

## Installation

```
npm i @jobscale/core
```

## Examples

### logger

```javascript
require('@jobscale/core');

logger.info({ timestamp: Date.now() });
```

### fetch

```javascript
require('@jobscale/core');

fetch('https://inet-ip.info/ip')
.then(res => res.text())
.then(ip => logger.info({ ip }));
```

### spawn

```javascript
require('@jobscale/core');

const ping = ip => {
  const params = ['-c', '2', '-i', '1', ip];
  return spawn('ping', params);
};

ping('127.0.0.1')
.then(result => logger.info({ result }));
```

## ESLint settings

.eslintrc.js
```javascript
{
  globals: {
    logger: 'readonly',
    spawn: 'readonly',
    fetch: 'readonly',
  },
}
```

## Jest test
```
docker run --rm -p 127.0.0.1:3128:3128 -d ghcr.io/jobscale/squid
npm test
```
