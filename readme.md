# Oyohim

[![npm](https://img.shields.io/npm/v/oyohim?style=flat-square)](https://www.npmjs.com/package/oyohim)

A Oyohim api client

## Installation

```shell
yarn add oyohim

# or use npm

npm i oyohim
```

## Quick Start

```typescript
import { Oyohim, Locale, Client } from 'oyohim';

const client = new Oyohim({
    language: Locale.zhCN,
    type: Client.ANDOROID,
    version: '2.45.1'
});

client.login('ltuid', 'ltoken');

const abyss = await client.abyss('uid');
```

## Extend API

To extend an API, the API type needs to be defined in `declare module`, which will make TypeScript work correctly.

Simple example:

```typescript
import { OyohimApi, ApiQuester } from 'oyohim';

declare module 'oyohim' {
    interface Api {
        foo: (uid: string) => string
    }
}

inteface FooDataType {
    bar: string
    baz: number
}

OyohimApi.define('foo', {
    base: OyohimApi.Base.takumi,
    method: OyohimApi.Quester.GET, 
    region: OyohimApi.Region.CN, 
    path: '/foo/event'
});

//We can use `OyohimApi.mixins()` to process the api responses.
OyohimApi.mixins<string>('foo', (api: ApiQuester<FooDataType>) => {
    //your code...
    return 'data'
});
```
## License

The repository under the [AGPL-3.0](./LICENSE) license
