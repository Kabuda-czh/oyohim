import { Oyohim } from ".."

declare module '../index' {
    namespace Oyohim {
        export enum RegionType {
            CN = 'cn_gf01',
            CNB = 'cn_qd01',
            CHT = 'os_cht',
            EU = 'os_euro',
            AS = 'os_asia',
            US = 'os_usa'
        }
        export type Region = 'cn' | 'os'
    }
}

export type GetRegion<
    U extends `${number}` | Oyohim.RegionType
> =
    U extends `${number}`
    ? GetRegionType<U> extends Oyohim.RegionType.CN | Oyohim.RegionType.CNB ? 'cn' : 'os'
    : U extends Oyohim.RegionType.CN | Oyohim.RegionType.CNB ? 'cn' : 'os'

export type GetRegionType<
    U extends `${number}`
> =
    U extends `${infer C}${infer O}`
    ? C extends '1' | '2'
    ? Oyohim.RegionType.CN
    : C extends '5'
    ? Oyohim.RegionType.CNB
    : C extends '6'
    ? Oyohim.RegionType.US
    : C extends '7'
    ? Oyohim.RegionType.EU
    : C extends '8'
    ? Oyohim.RegionType.AS
    : C extends '9'
    ? Oyohim.RegionType.CHT
    : never
    : never

export const RegionTypeMap = {
    1: Oyohim.RegionType.CN,
    2: Oyohim.RegionType.CN,
    5: Oyohim.RegionType.CNB,
    6: Oyohim.RegionType.US,
    7: Oyohim.RegionType.EU,
    8: Oyohim.RegionType.AS,
    9: Oyohim.RegionType.CHT
} as const
