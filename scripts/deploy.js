async function main() {

    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const weiAmount = (await deployer.getBalance()).toString();
    console.log("Deployer account balance:", await ethers.utils.formatEther(weiAmount));

    const TokenContract = await ethers.getContractFactory("MakeLoveNotWar");
    const token = await TokenContract.deploy();
    
    console.log("Token address:", token.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })