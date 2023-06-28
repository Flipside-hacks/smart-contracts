import { utils, constants, BigNumber, getDefaultProvider} from 'ethers';
import { ethers } from "ethers";

import fs from "fs/promises";
import { CrossChainDAO, GovernanceToken, GovernanceToken__factory, CrossChainDAO__factory, SimpleIncrementer__factory } from '../typechain-types';
import { parseEther } from "ethers/lib/utils";
import { isTestnet, wallet } from "../config/constants";

const {defaultAbiCoder} = utils;



let chains = isTestnet ? require("../config/testnet.json") : require("../config/local.json");


let governanceTokenAddr = "0x1e544Cdb9754eb341c6368FD8c2CE0Cfbd9157d1";
let DAOAddress = "0xf49e05781f66ECE655AC19b3044B496D56Bb9073";
let satelliteAddr = "0x9d73A927528c76a9be12Da79E035A33368C4c38f";


//const spokeChainNames = ["Moonbeam", "Avalanche", "Ethereum", "Fantom", "Polygon"];

const spokeChainNames = ["Fantom", "Avalanche"];
const spokeChainIds:any = [];


let hubChain = 'Polygon'


function convertToUnits(_tx: any) {
    let arr: any = [];
    for(let i = 0; i < _tx.length; i++) {
    let result = Number(_tx[i]);
    arr.push(result);
    }
    return arr;
}

export async function main() {
    await readDAOData(hubChain, wallet);
   
}



async function readDAOData(_hubChain: string, wallet: any) {

    const chain = chains.find((chain: any) => chain.name === _hubChain);
    const provider = getDefaultProvider(chain.rpc);
    const connectedWallet = wallet.connect(provider);

    const crossChainDAOFactory =  new CrossChainDAO__factory(connectedWallet);
    const crossChainDAOInstance = crossChainDAOFactory.attach(DAOAddress);

    let allProposalIds: any;

    // let tx = await crossChainDAOInstance.feesArray(0);
    //    console.log(tx)
    
    try {
        let tx = await crossChainDAOInstance.getAllProposalIds();
        console.log(convertToUnits(tx));
             
    
    } catch (error) {
        console.log(`[source] CrossChainDAO.getAllProposalIds() ERROR!`);
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

  