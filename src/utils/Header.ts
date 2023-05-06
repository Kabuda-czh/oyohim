import { randomUUID } from "node:crypto"
import { ActID, ClientType } from "../typer/Client"
import { Region } from "../typer/Region"

export function createHeader(type: ClientType, region: Region, DS: string, cookie?: string) {
    let Referer
    if (region === 'cn') {
        Referer = `https://webstatic.mihoyo.com/bbs/event/signin-ys/index.html?bbs_auth_required=true&act_id=${ActID}&utm_source=bbs&utm_medium=mys&utm_campaign=icon`
    } else {
        Referer = `https://webstatic-sea.hoyolab.com`
    }
    const _header = {
        'x-rpc-app_version': this.conf.appver,
        'x-rpc-client_type': type.toString(),
        'User-Agent': '',
        cookie,
        DS,
        Referer
    }

    if (type !== ClientType.WEBVIEW) {
        Object.assign(_header, {
            'x-rpc-device_id': randomUUID().replace(/-/g, ''),
            'x-rpc-platform': 'android',
            'x-rpc-device_model': this.device.Model,
            'x-rpc-device_name': this.device.Display,
            'x-rpc-channel': 'miyousheluodi',
            'x-rpc-sys_version': this.device.Version.Release,
            'X-Requested-With': this.region === 'cn' ? 'com.mihoyo.hyperion' : 'com.mihoyo.hoyolab',
        })
    }

    return _header
}
