# Snowstorm SDK

[![npm version](https://img.shields.io/npm/v/@snowballmoney/mns-sdk.svg)](https://www.npmjs.com/package/@snowballmoney/mns-sdk)

A TypeScript SDK for interacting with the Snowstorm naming service API. Snowstorm is a modular naming service that allows resolution between blockchain addresses and human-readable names across different chains.

## Features

- Full TypeScript support with type definitions
- Cross-chain identity resolution
- Batch operations support
- Automatic error handling
- Caching support
- CAIP2 standard compliance

## Installation

```bash
npm install @snowstorm/sdk
# or
yarn add @snowstorm/sdk
```

## Quick Start

```typescript
import { SnowstormSDK } from '@snowstorm/sdk';

// Initialize the SDK
const sdk = new SnowstormSDK();

// Get an identity name for an address
const identity = await sdk.getIdentityName(
  '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  'move-mvmt:testnet'
);
```

## Usage

### Initialization

```typescript
import { SnowstormSDK } from '@snowstorm/sdk';

const sdk = new SnowstormSDK({
  baseUrl: 'https://api.modular.name/public/api', // optional
  timeout: 5000, // optional, defaults to 10000ms
});
```

### Single Resolution

```typescript
// Get identity name by address
const identityName = await sdk.getIdentityName(
  '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  'move-mvmt:testnet'
);

// Get address by identity name
const identityAddress = await sdk.getIdentityAddress(
  'alice.snow',
  'move-mvmt:testnet'
);

// Get identity metadata
const metadata = await sdk.getIdentityMetadata('alice.snow');
```

### Batch Operations

```typescript
// Batch resolve names for multiple addresses
const batchNames = await sdk.getIdentityNames({
  addresses: [
    '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    '0x123...',
  ],
  caip2Id: 'move-mvmt:testnet',
});

// Batch resolve addresses for multiple names
const batchAddresses = await sdk.getIdentityAddresses({
  names: ['alice.snow', 'bob.snow'],
  caip2Id: 'move-mvmt:testnet',
});
```

### Using Wildcard CAIP2 IDs

You can use wildcard CAIP2 IDs to query across all networks in a namespace:

```typescript
const allNetworks = await sdk.getIdentityNames({
  addresses: ['0x742d35...'],
  caip2Id: 'move-mvmt:*',
});
```

### Error Handling

The SDK provides a custom `SnowstormError` class for proper error handling:

```typescript
try {
  const identity = await sdk.getIdentityName(address, caip2Id);
} catch (error) {
  if (error instanceof SnowstormError) {
    console.error('API Error:', {
      message: error.message,
      status: error.status,
      code: error.code,
    });
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## API Reference

### Methods

#### `getIdentityName(address: string, caip2Id: CAIP2ID): Promise<IdentityName>`
Get the identity name associated with an address.

#### `getIdentityAddress(name: string, caip2Id: CAIP2ID): Promise<IdentityAddress>`
Get the address associated with an identity name.

#### `getIdentityMetadata(name: string): Promise<IdentityMetadata>`
Get metadata associated with an identity.

#### `getIdentityNames(params: GetIdentityNamesByAddressesRequest): Promise<BatchIdentityNames>`
Batch resolve names for multiple addresses.

#### `getIdentityAddresses(params: GetIdentityAddressesByNamesRequest): Promise<BatchIdentityAddresses>`
Batch resolve addresses for multiple names.

### Types

```typescript
type CAIP2ID = string; // e.g. "move-mvmt:testnet"

interface IdentityName {
  name: string;
  owner: string;
}

interface IdentityAddress {
  owner: string;
  resolverAddress: string;
  caip2Id?: CAIP2ID;
  subIdentities?: SubIdentity[];
}

interface IdentityMetadata {
  metadata: Array<{
    key: string;
    value: string;
  }>;
}
```

## CAIP2 ID Format

CAIP2 IDs follow the format: `namespace:reference`

Examples:
- `move-mvmt:testnet` - Movement testnet
- `move-mvmt:mainnet` - Movement mainnet
- `move-mvmt:*` - All Movement networks

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Generate documentation
npm run docs
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License - see the [LICENSE](LICENSE) file for details.