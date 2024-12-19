import {
    BatchIdentityAddresses,
    BatchIdentityNames,
    CAIP2ID,
    GetIdentityAddressesByNamesRequest,
    GetIdentityNamesByAddressesRequest,
    IdentityAddress,
    IdentityMetadata,
    IdentityName,
    SnowstormConfig, SnowstormError
} from "./types";

import axios, { AxiosError, AxiosInstance } from "axios";

export class SnowstormSDK {
    private client: AxiosInstance;
    private static DEFAULT_BASE_URL = 'https://api.modular.name/public/api';
    private static DEFAULT_TIMEOUT = 10000;

    constructor(config: SnowstormConfig = {}) {
        this.client = axios.create({
            baseURL: config.baseUrl || SnowstormSDK.DEFAULT_BASE_URL,
            timeout: config.timeout || SnowstormSDK.DEFAULT_TIMEOUT,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Add error handling interceptor
        this.client.interceptors.response.use(
            (response) => response,
            (error: AxiosError) => {
                if (error.response) {
                    throw new SnowstormError(
                        error.response.statusText || 'An error occurred',
                        error.response.status,
                        error.code,
                    );
                }
                throw error;
            },
        );
    }

    /**
     * Get identity name by address
     * @param address - Wallet address
     * @param caip2Id - Chain Agnostic Identifier (CAIP2)
     * @returns Promise<IdentityName>
     */
    async getIdentityName(address: string, caip2Id: CAIP2ID): Promise<IdentityName> {
        const response = await this.client.get('/public-identity/name', {
            params: { address, caip2Id },
        });
        return response.data;
    }

    /**
     * Get identity address by name
     * @param name - Identity name
     * @param caip2Id - Chain Agnostic Identifier (CAIP2)
     * @returns Promise<IdentityAddress>
     */
    async getIdentityAddress(name: string, caip2Id: CAIP2ID): Promise<IdentityAddress> {
        const response = await this.client.get('/public-identity/address', {
            params: { name, caip2Id },
        });
        return response.data;
    }

    /**
     * Get identity metadata by name
     * @param name - Identity name
     * @returns Promise<IdentityMetadata>
     */
    async getIdentityMetadata(name: string): Promise<IdentityMetadata> {
        const response = await this.client.get(`/public-identity/metadata/${name}`);
        return response.data;
    }

    /**
     * Batch resolve names by addresses
     * @param params - GetIdentityNamesByAddressesRequest
     * @returns Promise<BatchIdentityNames>
     */
    async getIdentityNames(params: GetIdentityNamesByAddressesRequest): Promise<BatchIdentityNames> {
        const response = await this.client.post('/public-identity/names', params);
        return response.data;
    }

    /**
     * Batch resolve addresses by names
     * @param params - GetIdentityAddressesByNamesRequest
     * @returns Promise<BatchIdentityAddresses>
     */
    async getIdentityAddresses(params: GetIdentityAddressesByNamesRequest): Promise<BatchIdentityAddresses> {
        const response = await this.client.post('/public-identity/addresses', params);
        return response.data;
    }
}