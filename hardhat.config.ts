// import { HardhatUserConfig, task } from "hardhat/config";
// import "@nomicfoundation/hardhat-toolbox";

// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//     console.log((await account.getBalance()).toString());
//   }
// });


// const config: HardhatUserConfig = {
//   paths: { tests: "tests" },
//   networks: {hardhat: {hardfork: "merge"}},
//   solidity: {
//       version: "0.8.18",
//       settings: {
//         optimizer: {
//           enabled: false,
//           runs: 0,
//         },
//       },
//     }
// };

// export default config;

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'hardhat-gas-reporter';
import 'solidity-coverage';
require('dotenv').config();
 
const ownerPK = process.env.NEXT_PUBLIC_EVM_PRIVATE_KEY;

const config: HardhatUserConfig = {
  // solidity: "0.8.0",
  paths: { tests: "tests" },
  solidity: {
    version: '0.8.9',
    settings: {
      evmVersion: process.env.EVM_VERSION || 'london',
      optimizer: {
        enabled: true,
        runs: 1000,
        details: {
          peephole: true,
          inliner: true,
          jumpdestRemover: true,
          orderLiterals: true,
          deduplicate: true,
          cse: true,
          constantOptimizer: true,
          yul: true,
          yulDetails: {
            stackAllocation: true,
          },
        },
      },

    },
  },
  networks: {
    binanceTest: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545`,
      accounts: [
        `${ownerPK}`,
        /* `0x${participant1}`,
        `0x${participant2}`,
        `0x${participant3}`,
        `0x${participant4}`,
        `0x${participant5}`, */
      ],
      gas: 'auto',
      gasPrice: 'auto',
    },
    polygonTest: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/Ksd4J1QVWaOJAJJNbr_nzTcJBJU-6uP3`,
      accounts: [
        `${ownerPK}`,
        /* `0x${participant1}`,
        `0x${participant2}`,
        `0x${participant3}`,
        `0x${participant4}`,
        `0x${participant5}`, */
      ],
      gas: 'auto',
      gasPrice: 'auto',
    },
    avalancheTest: {
      url: `https://api.avax-test.network/ext/bc/C/rpc`,
      accounts: [
        `${ownerPK}`,
        /* `0x${participant1}`,
        `0x${participant2}`,
        `0x${participant3}`,
        `0x${participant4}`,
        `0x${participant5}`, */
      ],
      gas: 'auto',
      gasPrice: 'auto',
    },
  },
  typechain: {
    target: "ethers-v5"
  }
};

export default config;

