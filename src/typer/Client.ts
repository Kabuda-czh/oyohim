import { Region } from "./Region"

export enum ClientType {
    IOS = 1,
    ANDROID = 2,
    WEBVIEW = 5
}

export type ClientVersion = '2.45.1' | '2.45.1' | '2.36.1' | '2.35.2' | '2.34.1' | '2.28.1'

export type HoyoConfig = {
    actID: string
    clientType: number
    appver: string
    header: string
    salt: string
}