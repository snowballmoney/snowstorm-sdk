export type CAIP2ID = string; // e.g. "move-mvmt:testnet" or "move-mvmt:*"

export interface SnowstormConfig {
    baseUrl?: string;
    timeout?: number;
}

export interface TxtRecord {
    key: string;
    value: string;
}

export interface SubIdentity {
    name: string;
    address: string;
}

export interface IdentityAddress {
    owner: string;
    resolverAddress: string;
    caip2Id?: CAIP2ID;
    subIdentities?: SubIdentity[];
}

export interface IdentityName {
    name: string;
    owner: string;
}

export interface IdentityMetadata {
    metadata: TxtRecord[];
}

export interface BatchIdentityNames {
    data: Record<string, IdentityName>;
}

export interface BatchIdentityAddresses {
    data: Array<{
        owner: string;
        resolverAddress: string;
    }>;
}

export interface GetIdentityNamesByAddressesRequest {
    addresses: string[];
    caip2Id?: CAIP2ID;
}

export interface GetIdentityAddressesByNamesRequest {
    names: string[];
    caip2Id: CAIP2ID;
}

export class SnowstormError extends Error {
    constructor(
        message: string,
        public status?: number,
        public code?: string,
    ) {
        super(message);
        this.name = 'SnowstormError';
    }
}