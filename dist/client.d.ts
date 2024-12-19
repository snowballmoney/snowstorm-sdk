import { BatchIdentityAddresses, BatchIdentityNames, CAIP2ID, GetIdentityAddressesByNamesRequest, GetIdentityNamesByAddressesRequest, IdentityAddress, IdentityMetadata, IdentityName, SnowstormConfig } from "./types";
export declare class SnowstormSDK {
    private client;
    private static DEFAULT_BASE_URL;
    private static DEFAULT_TIMEOUT;
    constructor(config?: SnowstormConfig);
    /**
     * Get identity name by address
     * @param address - Wallet address
     * @param caip2Id - Chain Agnostic Identifier (CAIP2)
     * @returns Promise<IdentityName>
     */
    getIdentityName(address: string, caip2Id: CAIP2ID): Promise<IdentityName>;
    /**
     * Get identity address by name
     * @param name - Identity name
     * @param caip2Id - Chain Agnostic Identifier (CAIP2)
     * @returns Promise<IdentityAddress>
     */
    getIdentityAddress(name: string, caip2Id: CAIP2ID): Promise<IdentityAddress>;
    /**
     * Get identity metadata by name
     * @param name - Identity name
     * @returns Promise<IdentityMetadata>
     */
    getIdentityMetadata(name: string): Promise<IdentityMetadata>;
    /**
     * Batch resolve names by addresses
     * @param params - GetIdentityNamesByAddressesRequest
     * @returns Promise<BatchIdentityNames>
     */
    getIdentityNames(params: GetIdentityNamesByAddressesRequest): Promise<BatchIdentityNames>;
    /**
     * Batch resolve addresses by names
     * @param params - GetIdentityAddressesByNamesRequest
     * @returns Promise<BatchIdentityAddresses>
     */
    getIdentityAddresses(params: GetIdentityAddressesByNamesRequest): Promise<BatchIdentityAddresses>;
}
//# sourceMappingURL=client.d.ts.map