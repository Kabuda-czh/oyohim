# Oyohim

[![npm](https://img.shields.io/npm/v/oyohim?style=flat-square)](https://www.npmjs.com/package/oyohim)

A Oyohim api client

## Install

```shell
yarn add oyohim

# or use npm

npm i oyohim
```

## Usage

In oyohim, you need to inject the api for yourself and use the `declare module` to extend the type. 

Simple example:

```typescript
import { OyohimApi } from 'oyohim';

declare module 'oyohim' {
    interface Api {
        foo: (params: {uid: string}) => string
    }
}

OyohimApi.define('foo', OyohimApi.Region.CN, 'GET', OyohimApi.Base.takumi, '/foo/event');
```

Next, you just need to add the Oyohim class to request your api:

```typescript
import { Oyohim, OyohimApi, OyohimClientType } from 'oyohim'; //Update import from 'oyohim'

const apiClient = new Oyohim(OyohimApi, {type: OyohimClientType.ANDOROID, version: '2.45.1'});
const res = apiClient.client('deviceHash#114514', 'cookies').foo({'100114514'});
```
## License

The repository under the [AGPL-3.0](./LICENSE) license
