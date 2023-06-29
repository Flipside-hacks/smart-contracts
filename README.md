# Cross chain crowdfunding DAO

## Relevant contract addresses can be found here:

### For DAO contracts
Governance Token Addresses for Aurora, Fantom and Polygon
0xD7F2bbC67cBC880F8f7C99d9F24dE7bBe3243C4C

Hub Chain DAO address on Aurora 
0xeE72F500671d7F8439c0b3B3c6a472CdA4BCb560

Fantom and Polygon DAO satellite Addresses
0xc7FFF6CcC69249E89f3aeE092B1713ED2c65dE08


### For Campaign contracts
Campaign manager contract on Aurora
0xfaEAc401400A66262CBBe90A37eDAB8CE48B3Ab4

Campaign Satellite for Fantom and Polygon
0xc514d8Fd3052E3D2aE793c1e95d4EFdA8Bb05d83

We employ the hub and spoke model, The DAO contract and the campaign manager contract are on the hub chain which is Aurora, and the hub is where data resides mainly while the spoke chains which are Polygon and Fantom have copies of these data remotely on their chains, so for instance if a campaign or proposal is created on the main chain, the message which is a payload containing the details of the campaign or proposal is transmitted to the remote spoke chains, now the campaign satellite and DAO satellite contracts which are on the spoke chains, will facilitate receiving the messages from the DAO and campaign manager contracts, now when these satellite addresses receive these messages, they interact with these messages and send them back to the hub chain to facilitate the cross chain interoperability across chains.






