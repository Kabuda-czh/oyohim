import { Oyohim } from ".."
import { DynamicSecret } from "../secret"

export type ClientOptions<R extends Oyohim.Region = never> = {
    type: ClientType,
    region?: R
    version: ClientVersion<R>
}

export enum ClientType {
    IOS = 1,
    ANDROID = 2,
    WEBVIEW = 5
}

export type ClientVersion<T extends Oyohim.Region> = keyof typeof DynamicSecret.Salt[T]

export type HoyoConfig = {
    actID: string
    clientType: number
    appver: string
    header: string
    salt: string
}

export const ActID: Record<Oyohim.Region, string> = {
    cn: 'e202009291139501',
    os: 'e202102251931481'
}
