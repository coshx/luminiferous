# About

Blockchain technologies allow for smart contracts - it's time for
credit reporting to get smart too.

# Running

```
# install dependencies
$ sudo npm install -g etheremjs-testrpc
$ sudo npm install -g truffle

# Install the MetaMask Chrome Extension
# visit:
https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn
# Create an account on MetaMask by clicking on the extension (after
selecting localhost 8483)
# Save the MetaMask passphrase to a file (e.g. ~/Downloads/MetaMask.txt)

# in a separate terminal, launch the test ethereum client
$ testrpc -m `cat ~/Downloads/MetaMask.txt`

# If necessary, import the account to MetaMask by copying the Private
Key output from testrpc and choosing Import Account in MetaMask

# compile our smart contracts
truffle compile

# run any migrations
truffle migrate

# launch the test server
npm start run
```
