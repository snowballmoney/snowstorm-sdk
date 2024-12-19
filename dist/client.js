"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnowstormSDK = void 0;
const types_1 = require("./types");
const axios_1 = __importDefault(require("axios"));
class SnowstormSDK {
    constructor(config = {}) {
        this.client = axios_1.default.create({
            baseURL: config.baseUrl || SnowstormSDK.DEFAULT_BASE_URL,
            timeout: config.timeout || SnowstormSDK.DEFAULT_TIMEOUT,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // Add error handling interceptor
        this.client.interceptors.response.use((response) => response, (error) => {
            if (error.response) {
                throw new types_1.SnowstormError(error.response.statusText || 'An error occurred', error.response.status, error.code);
            }
            throw error;
        });
    }
    /**
     * Get identity name by address
     * @param address - Wallet address
     * @param caip2Id - Chain Agnostic Identifier (CAIP2)
     * @returns Promise<IdentityName>
     */
    async getIdentityName(address, caip2Id) {
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
    async getIdentityAddress(name, caip2Id) {
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
    async getIdentityMetadata(name) {
        const response = await this.client.get(`/public-identity/metadata/${name}`);
        return response.data;
    }
    /**
     * Batch resolve names by addresses
     * @param params - GetIdentityNamesByAddressesRequest
     * @returns Promise<BatchIdentityNames>
     */
    async getIdentityNames(params) {
        const response = await this.client.post('/public-identity/names', params);
        return response.data;
    }
    /**
     * Batch resolve addresses by names
     * @param params - GetIdentityAddressesByNamesRequest
     * @returns Promise<BatchIdentityAddresses>
     */
    async getIdentityAddresses(params) {
        const response = await this.client.post('/public-identity/addresses', params);
        return response.data;
    }
}
exports.SnowstormSDK = SnowstormSDK;
SnowstormSDK.DEFAULT_BASE_URL = 'https://api.modular.name/public/api';
SnowstormSDK.DEFAULT_TIMEOUT = 10000;
//# sourceMappingURL=client.js.map