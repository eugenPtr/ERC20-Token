const { ethers } = require('hardhat');
const { abi } = require('../artifacts/contracts/MakeLoveNotWar.sol/MakeLoveNotWar.json');
require('dotenv').config();

const AIRDROP_ADDRESSES = [
    "0x88a457cc32CF631fd85723d664239dd2BdA5dee5",
    "0x066B390D476C828F68843E13DF89Ef7Acc60C87a",
    "0x8d4Deac37ef473e812AC815A865016235c49669A"
]

const TOKEN_ADDRESS = "0x853f0d3153c1c22B3Daa2f5D1AAFd25DDb8932A2";

async function main() {
    const [deployer] = await ethers.getSigners();
    const tokenContract = new ethers.Contract(TOKEN_ADDRESS, abi, deployer);

    let tx = await tokenContract.approve(TOKEN_ADDRESS, 100);
    // Wait for tx to get mined
    await tx.wait();

    const numberOfDigits = 18;
    const amount = ethers.utils.parseEther("1", numberOfDigits);
    console.log("Airdropping LOVE ...");
    for (let i=0; i<AIRDROP_ADDRESSES.length; i++) {
        let tx = await tokenContract.transferFrom(deployer.address, AIRDROP_ADDRESSES[i], amount);
        console.log(tx.hash);
    }


}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })