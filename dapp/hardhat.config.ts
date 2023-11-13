import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox-viem';
import '@nomiclabs/hardhat-ethers';
const config: HardhatUserConfig = {
    solidity: '0.8.19',
    networks: {
        sepolia: {
            url: `https://sepolia.infura.io/v3/06c88313292545c982fd9dffaa9c5023`,
            accounts: ['e7fe04c2ff41d53fea5e596134ff71923890b816aa508aea32a8422b9919901a'],
        },
    },
};

export default config;
