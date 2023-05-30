import { utils, constants, BigNumber, getDefaultProvider, Contract } from 'ethers';
import { ethers } from "hardhat";
//import { ethers } from "ethers";

import fs from "fs/promises";
import { CrossChainDAO, CrossChainDAO__factory, DAOSatellite__factory, GovernanceToken, GovernanceToken__factory } from '../typechain-types';
import { parseEther } from "ethers/lib/utils";
import { isTestnet, wallet } from "../config/constants";

const { defaultAbiCoder } = utils;

const { deployUpgradable } = require("@axelar-network/axelar-gmp-sdk-solidity");
const { utils: {
    deployContract
} } = require("@axelar-network/axelar-local-dev");

let chains = isTestnet ? require("../config/testnet.json") : require("../config/local.json");

let targetSecondsPerBlockObj = require("../config/targetSecondsPerBlock.json");

//let moonBeamSatelliteAddr 

const spokeChainNames = ["Fantom", "Avalanche"];
const daoSatellite = require("../artifacts/contracts/DAOSatellite.sol/DAOSatellite.json");
const ExampleProxy = require("../artifacts/contracts/ExampleProxy.sol/ExampleProxy.json");

let chainsInfo: any = [];

let hubChain = "Polygon";

let governanceTokenAddr = "0x7694249fee47Ea83ad709a2e3A25316c4435Fa54";
let DAOAddress = "0x4c6E030CFD6B8f280C72E28347CD3E9177e8BF7E";
let satelliteAddr = "0xa23f9EA386C03DA4114d80DA80fb64DF544D28dF";

const gasLimit = 30000000;




//let spokeChain = "Moonbeam";


async function deploy(_hubChain: string, _hubChainAddr: string, chain: any, wallet: any, governanceToken: string, targetSecondsPerBlock: number) {
    console.log(`Deploying Satellite for ${chain.name}.`);
    const provider = getDefaultProvider(chain.rpc);
    const connectedWallet = wallet.connect(provider);
    const contract = await deployUpgradable(
        chain.constAddressDeployer,
        connectedWallet,
        daoSatellite,
        ExampleProxy,
        [_hubChain, _hubChainAddr, chain.gateway, chain.gasReceiver, governanceToken, targetSecondsPerBlock],
        [],
        //defaultAbiCoder.encode(['string'], [chain.name]),
        defaultAbiCoder.encode(['string'], [chain.name]),
        'satellite'
    );
    chain.contract = contract;
    console.log(`Deployed Satellite for ${chain.name} at ${chain.contract.address}.`);
}

let targetSecond: any;
async function main() {
    const promises = [];

    for (let i = 0; i < spokeChainNames.length; i++) {

        let chainName = spokeChainNames[i];

        let chainInfo = chains.find((chain: any) => {
            if (chain.name === chainName) {
                chainsInfo.push(chain);
                return chain;
            }
        });

        for (const property in targetSecondsPerBlockObj) {
            if (chainName === property) {
                targetSecond = targetSecondsPerBlockObj[property]
            }
        }

        console.log(`Deploying [${chainName}]`);

        await deploy(hubChain, DAOAddress, chainInfo, wallet, governanceTokenAddr, targetSecond);

    }

    //await interact(spokeChain, wallet, satelliteAddr)

}

async function interact(_spokeChain: string, wallet: any, satelliteAddr: string) {
    const chain = chains.find((chain: any) => chain.name === _spokeChain);
    const provider = getDefaultProvider(chain.rpc);
    const connectedWallet = wallet.connect(provider);

    const daoSatelliteFactory = new DAOSatellite__factory(connectedWallet);
    const daoSatelliteInstance = daoSatelliteFactory.attach(satelliteAddr);

    const result = await daoSatelliteInstance.targetSecondsPerBlock();
    console.log(`The targetsecondsPerblock for spokechain ${_spokeChain} is ${result}`)
    //const result2 = await governanceTokenInstance.spokeChainNames(0);
    //console.log(result);

}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});