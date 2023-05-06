import { createHash } from "node:crypto"
import { Random } from "./utils/Random"
import { Semver } from "./typer/Semver"
import { Oyohim } from "."

type Salter = {
    api?: string
    bbs?: string
}

class DynamicSecret {
    constructor(private salt) { }

    private native() {
        let t: string = Math.round(new Date().getTime() / 1000).toString()
        let r: string = Random.sample('abcdefghijklmnopqrstuvwxyz0123456789'.split(''), 6).join('')
        let c: string = this.hash({ t, r }, this.salt)
        return `${t},${r},${c}`
    }

    private webview(body?: Record<string, any>, params?: Record<string, any>) {
        let t: string = Math.round(new Date().getTime() / 1000).toString()
        let r: string = Random.randint(100001, 200000).toString()
        let b: string = body ? JSON.stringify(body) : ''
        let q: string = params ? encodeURI(JSON.stringify(params)) : ''
        let c: string = this.hash({ t, r, b, q })
        return `${t},${r},${c}`
    }

    //TODO
    private usersign() { }

    protected hash(value: Record<string, any>, salt: string = this.salt): string {
        let temp: string[] = ['salt=' + salt];
        Object.keys(value).forEach(key => {
            temp.push(`${key}=${value[key]}`)
        })
        return createHash('md5').update(temp.join('&')).digest('hex')
    }

    createSign<T extends DynamicSecret.Type>(type: T): DynamicSecret.Constructor<T> {
        return this[type as string] as DynamicSecret.Constructor<T>
    }
}

namespace DynamicSecret {
    export type Type = 'native' | 'webview'
    export type Constructor<T extends Type> =
        T extends 'native'
        ? (salt?: string) => string
        : T extends 'webview'
        ? (body?: Record<string, any>, params?: Record<string, any>) => string
        : T
    export const Salt: Record<Oyohim.Region, Record<Semver, Salter>> = {
        cn: {
            '2.45.1': {
                bbs: 'Ea0hkTHxe9cJDwlw4hswBGHDfSlmM5t9'
            },
            '2.44.1': {
                api: 'xV8v4Qu54lUKrEYFZkJhB8cuOh9Asafs',
                bbs: 'dZAwGk4e9aC0MXXItkwnHamjA1x30IYw'
            },
            '2.36.1': {
                api: 'n0KjuIrKgLHh08LWSCYP0WXlVXaYvV64',
                bbs: 'YVEIkzDFNHLeKXLxzqCA9TzxCpWwbIbk'
            },
            '2.35.2': {
                api: 'N50pqm7FSy2AkFz2B3TqtuZMJ5TOl3Ep',
                bbs: 'ZSHlXeQUBis52qD1kEgKt5lUYed4b7Bb'
            },
            '2.34.1': {
                api: '9nQiU3AV0rJSIBWgdynfoGMGKaklfbM7',
                bbs: 'z8DRIUjNDT7IT5IZXvrUAxyupA1peND9'
            },
            '2.28.1': {
                api: 'ulInCDohgEs557j0VsPDYnQaaz6KJcv5',
                bbs: 'dWCcD2FsOUXEstC5f9xubswZxEeoBOTc'
            },
        },
        os: {
            '2.9.0': {
                bbs: 'n0KjuIrKgLHh08LWSCYP0WXlVXaYvV64'
            },
        }
    } as const
}

export { DynamicSecret, Salter }
