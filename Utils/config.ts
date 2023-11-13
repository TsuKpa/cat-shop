import { createConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { createPublicClient, createWalletClient, custom, http } from 'viem';

export const config = createConfig({
    autoConnect: true,
    publicClient: createPublicClient({
        chain: sepolia,
        transport: http(),
    }),
});

export const walletClient = createWalletClient({
    chain: sepolia,
    transport: custom((window as any).ethereum),
});
