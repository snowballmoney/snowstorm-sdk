import {SnowstormError, SnowstormSDK} from '../src';

async function example() {
    // Initialize the SDK
    const sdk = new SnowstormSDK({
        baseUrl: 'https://api.modular.name/public/api',
        timeout: 5000,
    });

    try {
        // Using specific network
        const caip2Id = 'move-mvmt:testnet';

        // Or using wildcard for all networks in a namespace
        const wildcardCaip2Id = 'move-mvmt:*';

        // Get identity name for an address
        const identityName = await sdk.getIdentityName(
            '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            caip2Id
        );
        console.log('Identity Name:', identityName);

        // Get address for an identity name
        const identityAddress = await sdk.getIdentityAddress('alice.snow', caip2Id);
        console.log('Identity Address:', identityAddress);

        // Get metadata for an identity
        const metadata = await sdk.getIdentityMetadata('alice.snow');
        console.log('Identity Metadata:', metadata);

        // Batch resolve multiple addresses
        const batchNames = await sdk.getIdentityNames({
            addresses: [
                '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
                '0x123...',
            ],
            caip2Id: wildcardCaip2Id, // optional
        });
        console.log('Batch Names:', batchNames);

        // Batch resolve multiple names
        const batchAddresses = await sdk.getIdentityAddresses({
            names: ['alice.snow', 'bob.snow'],
            caip2Id,
        });
        console.log('Batch Addresses:', batchAddresses);
    } catch (error) {
        if (error instanceof SnowstormError) {
            console.error('Snowstorm API Error:', {
                message: error.message,
                status: error.status,
                code: error.code,
            });
        } else {
            console.error('Error:', error);
        }
    }
}

example();