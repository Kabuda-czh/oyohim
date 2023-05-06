import { createHash, randomUUID } from "node:crypto";
import { Random } from "./utils/Random"
import { Region } from "./typer/Region";
import { DeviceInfo, DeviceInformation } from "./utils/Device";
import { ClientType, HoyoConfig } from "./typer/Client";


type DSVersion = 'v1' | 'v2'
type DSConstruction<V extends DSVersion> = V extends 'v1'
    ? (salt?: string) => string
    : (body?: Record<string, any>, params?: Record<string, any>) => string

class Oyohim {
    private act_id: string
    private conf: HoyoConfig
    private device: DeviceInformation

    /**
     * 创建 Oyohim 客户端
     * @param region 设置 Oyohim 请求地区
     * @param client 设置请求设备
     * @param deviceHash 请求虚拟设备信息哈希值，不同用户请求应当是不同的。
     */
    constructor(private region: Region, private client: ClientType, deviceHash: string) {
        this.conf = Oyohim.Config[region]
        this.device = new DeviceInfo(deviceHash).createDevice()
        this.act_id = this.conf.actID
    }

    private hash(value: Record<string, any>, salt: string = this.conf.salt): string {
        //默认加入salt
        let temp: string[] = ['salt=' + salt];
        //将object拆分为键值对array
        Object.keys(value).forEach(key => {
            temp.push(`${key}=${value[key]}`)
        })
        //序列化并md5哈希
        return createHash('md5').update(temp.join('&')).digest('hex')
    }

    protected DSv1(salt?: string): string {
        let t: string = Math.round(new Date().getTime() / 1000).toString()
        let r: string = Random.sample('abcdefghijklmnopqrstuvwxyz0123456789'.split(''), 6).join('')
        let c: string = this.hash({ t, r }, salt)
        return `${t},${r},${c}`
    }

    protected DSv2(body?: Record<string, any>, params?: Record<string, any>): string {
        let t: string = Math.round(new Date().getTime() / 1000).toString()
        let r: string = Random.randint(100001, 200000).toString()
        let b: string = body ? JSON.stringify(body) : ''
        let q: string = params ? encodeURI(JSON.stringify(params)) : ''
        let c: string = this.hash({ t, r, b, q })
        return `${t},${r},${c}`
    }

    protected DSv3() { }

    /**
     * 构造相应版本 DS 函数
     * @param version DS 版本
     */
    public createDS<V extends DSVersion>(version: V): DSConstruction<V> {
        return this[`DS${version as string}`] as DSConstruction<V>
    }

    /**
     * 创建适用于 `DS v1` 版本 header
     * @param cookie 请求 cookie，可以为 `''` ，不过可能会出现权限问题。
     */
    public header(cookie: string): Record<string, string | number | boolean>
    /**
     * 创建适用于 `DS v2` 版本 header
     * @param cookie 请求 cookie，可以为 `''` ，不过可能会出现权限问题。
     * @param query `GET` 请求可能会携带的 Query 内容
     * @param body  `POST` 请求可能会携带的 Body
     */
    public header(cookie: string, query?: Record<string, any>, body?: Record<string, any>): Record<string, string | number | boolean>
    public header(cookie: string, query?: Record<string, any>, body?: Record<string, any>): Record<string, string | number | boolean> {
        const _header = {
            'x-rpc-app_version': this.conf.appver,
            'x-rpc-client_type': this.conf.clientType.toString(),
            'cookie': cookie,
            'User-Agent': [Random.randUA(this.device.Display), `${this.conf.header}/${this.conf.appver}`].join(' '),
            'Referer': this.region === 'cn' ? `https://webstatic.mihoyo.com/bbs/event/signin-ys/index.html?bbs_auth_required=true&act_id=${this.act_id}&utm_source=bbs&utm_medium=mys&utm_campaign=icon` : `https://webstatic-sea.hoyolab.com`,
        }

        if (query) {
            Object.assign(_header, {
                DS: this.createDS('v2')
            })
        } else {
            Object.assign(_header, {
                'x-rpc-device_id': randomUUID().replace(/-/g, ''),
                'x-rpc-platform': 'android',
                'x-rpc-device_model': this.device.Model,
                'x-rpc-device_name': this.device.Display,
                'x-rpc-channel': 'miyousheluodi',
                'x-rpc-sys_version': this.device.Version.Release,
                'X-Requested-With': this.region === 'cn' ? 'com.mihoyo.hyperion' : 'com.mihoyo.hoyolab',
                DS: this.createDS('v1')
            })
        }

        return _header
    }
}

namespace Oyohim {
    /**
     * 基本配置项
     * - Updated: 2022-12-16
     */
    export const Config: Record<Region, HoyoConfig> = {
        cn: {
            actID: 'e202009291139501',
            clientType: ClientType.ANDROID,
            appver: '2.38.1',
            header: 'miHoYoBBS',
            salt: 'PVeGWIZACpxXZ1ibMVJPi9inCY4Nd4y2'
        },
        os: {
            actID: 'e202102251931481',
            clientType: ClientType.WEBVIEW,
            appver: '2.9.0',
            header: 'miHoYoBBSOversea',
            salt: 'n0KjuIrKgLHh08LWSCYP0WXlVXaYvV64'
        }
    }
}

export { Oyohim }
