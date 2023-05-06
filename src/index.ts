import { ActID, ClientOptions, ClientType } from "./typer/Client";
import { OyohimApi } from "./api";
import { DynamicSecret, Salter } from "./secret";

class Oyohim {
    public deviceHash: string
    public cookie: string
    private act_id: string
    private salter: Salter
    private clientType: ClientType
    protected region: Oyohim.Region

    /**
     * 创建 Oyohim 客户端
     * @param api API 请求对象
     * @param clientOptions 客户端设置项
     */
    constructor(api: OyohimApi, clientOptions: ClientOptions) {
        this.region = clientOptions.region || 'cn'
        this.clientType = clientOptions.type
        this.salter = DynamicSecret.Salt[this.region][clientOptions.version]
        this.act_id = ActID[this.region]
    }

    client(deviceHash: string, cookie?: string){

    }
}

namespace Oyohim { }

export { Oyohim, ClientType as OyohimClientType }
