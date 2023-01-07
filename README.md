# Upgradable Crowdfunding Contract

Functional Requirements:
1. Funds take the form of a custom ERC20 token
2. Crowdfunded projects have a funding goal
3. When a funding goal is not met, customers can get a refund of their pledged funds
4. dApps using the contract can observe state changes in transaction logs
5. Optional bonus: the contract is upgradeable

To Run this project:
-  clone the repo locally 
  ` 
  git clone https://github.com/litmus-zhang/metacraft-challenge.git
  `
-  install all dependency for the project by running 
  `
  npm install
  `
- run a local blockchain to test the contract with the command below
 `
 npx hardhat node
 `
- run the contract locally with the command
  `
  npm run deploy:local
  `
- interact with the contract in the console using the command:
 `
 npm run console
 `
