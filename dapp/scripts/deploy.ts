import hre from 'hardhat';
import '@nomiclabs/hardhat-ethers';

async function main() {
    const Bill = await hre.ethers.getContractFactory('BillModel');
    const bill = await Bill.deploy();
    await bill.deployed();
    console.log('Bill deployed to:', bill.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
