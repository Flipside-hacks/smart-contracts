import { utils, constants, BigNumber, getDefaultProvider } from 'ethers';
import { ethers } from "ethers";

import fs from "fs/promises";
import { CrossChainDAO, CrossChainDAO__factory, DAOSatellite__factory, GovernanceToken, GovernanceToken__factory, SimpleIncrementer__factory } from '../typechain-types';
import { parseEther } from "ethers/lib/utils";
import { isTestnet, wallet } from "../config/constants";

const { defaultAbiCoder } = utils;



let chains = isTestnet ? require("../config/testnet.json") : require("../config/local.json");

let governanceTokenAddr = "0x22eA0B5104cfa244960cF1957E60Adc2B3aC9047";
let DAOAddress = "0xE876087C736d1108BBe256bB255dbeF3c13525b8";
let satelliteAddr = "0x412df091D549Ff8C3E7d538DBa2e0B5d0eA895eb";



//const spokeChainNames = ["Moonbeam", "Avalanche", "Ethereum", "Fantom", "Polygon"];

const spokeChainNames = ["Fantom", "Avalanche"];
const spokeChainIds: any = [];

let hubChain = 'Polygon'

// const chain = chains.find((chain: any) => chain.name === hubChain);
// const provider = getDefaultProvider(chain.rpc);
// const connectedWallet = wallet.connect(provider);

function convertToUnits(_tx: any) {
    let arr: any = [];
    for (let i = 0; i < _tx.length; i++) {
        let result = Number(_tx[i]);
        arr.push(result);
    }
    return arr;
}


export async function main() {
    await readSatelliteData(spokeChainNames[1], wallet);

}


async function readSatelliteData(chainName: string, wallet: any) {
    const chain = chains.find((chain: any) => chain.name === chainName);
    const provider = getDefaultProvider(chain.rpc);
    const connectedWallet = wallet.connect(provider);

    const satelliteFactory = new DAOSatellite__factory(connectedWallet);
    const satelliteInstance = satelliteFactory.attach(satelliteAddr);

    //let spokeChainZero: any;

    try {
        let tx = await satelliteInstance.getAllProposalIds();
        console.log(convertToUnits(tx));

    } catch (error) {
        console.log(`[source] DAOSatellite.getAllProposalIds() ERROR!`);
        console.log(`[source]`, error);

    }

    // try {
    //     const chainToQuery = spokeChainZero ?? 0;
    //     let addr = await crossChainDAOInstance.getTrustedRemoteAddress(chainToQuery);
    //     console.log(`[source] CrossChainDAO.getTrustedRemoteAddress(${chainToQuery}):`, addr);


    // } catch (error) {

    // }


}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

