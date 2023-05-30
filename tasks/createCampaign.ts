import { utils, constants, BigNumber, getDefaultProvider } from 'ethers';
import { ethers } from "ethers";

import fs from "fs/promises";
import { CampaignManager__factory} from '../typechain-types';
import { parseEther } from "ethers/lib/utils";
import { isTestnet, wallet } from "../config/constants";

const { defaultAbiCoder } = utils;

const campaignSatelliteAddr: any = "0xD7eD610Cd566186C506076148F1Be52E09630dA9";

let chains = isTestnet ? require("../config/testnet.json") : require("../config/local.json");

let GovernanceTokenAddr = "0x63C69067938eB808187c8cCdd12D5Bcf0375b2Ac";
//const BinanceDAOAddr = "0x558388D8Ebcf227D6cF1C1b8345754259800CA3F"

const campaignManagerAddr = "0x5d99c3F30597759d26974b1A6b65510df300c3DD"

//const spokeChainNames = ["Moonbeam", "Avalanche", "Ethereum", "Fantom", "Polygon"];

const spokeChainNames = ["Fantom", "Avalanche"];
const spokeChainIds: any = []; ethers

let hubChain = 'Polygon';

// const chain = chains.find((chain: any) => chain.name === hubChain);
// const provider = getDefaultProvider(chain.rpc);
// const connectedWallet = wallet.connect(provider);

const TARGET1 = ethers.utils.parseEther("10");

const TARGET2 = ethers.utils.parseEther("15");

let campaignCID = "bafybeigcjyxzjvkvlqsnjj6d5bqgcv4o57aoi3q5um2ab5agtwvfx5imfe"

const TARGET3 = ethers.utils.parseEther("17");

let campaignCID2: any = "bafybeif5ohaftpyiybkx7xj54g2awulvs7hxhpyf2zgb4qdvugma4eaekm"


let campaignCID3 = "bafybeiejrstxsxocyzpm7ujknae3qbpny2wkrqtf4btwqns3t3xq6o4voq"


export async function main() {
  await createCampaign(campaignCID3, TARGET3, campaignSatelliteAddr);


}



async function createCampaign(campaignCid: string, _target: any , _campaignSatelliteAddr: string) {

    const chain = chains.find((chain: any) => chain.name === hubChain);
    const provider = getDefaultProvider(chain.rpc);
    const connectedWallet = wallet.connect(provider);

    const campaignManagerFactory = new CampaignManager__factory(connectedWallet);
    const campaignManagerInstance = campaignManagerFactory.attach(campaignManagerAddr);


    const result = await (await campaignManagerInstance.createCampaign(campaignCid, _target, _campaignSatelliteAddr, { value: "10000000000000000" })).wait();
    console.log(`You created a campaign with the tx of ${result.transactionHash}`)
    //const campaignCreatedEvents = result.events?.filter((event: any) => event.event === 'Campaign created');

//     if (campaignCreatedEvents && campaignCreatedEvents.length > 0) {
//     // @ts-ignore
//     const campaignId = campaignCreatedEvents[0].args.campaignId;
//     console.log("campaign created");

//     console.log("Proposal ID:", campaignId.toString());
//   } else {
//     console.log("No 'ProposalCreated' events found in the result.");
//   }


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

