const ethers = require('ethers')
const tokenabi = require('./abi/token.json')
const fs = require('fs')

const provider = new ethers.providers.JsonRpcProvider(
  'https://polygon-rpc.com/',
)

const scfContract = new ethers.Contract(
  '0x7075f7B8D36998c4429Fc43d20ce41f2a3C7EF9a',
  tokenabi,
  provider,
)

async function token() {
  const tokensupply_a = await scfContract.totalSupply()

  const tokensupply_b = ethers.utils.formatEther(tokensupply_a.toString())

  const tokensupply = parseInt(tokensupply_b)

  console.log('token Supply : ' + tokensupply)

  const data = JSON.stringify({
    totalSupply: tokensupply,
  })

  fs.writeFile('./dist/token.json', data, (err) => {
    if (err) {
      throw err
    }
    console.log('JSON data is saved.')
  })
}

token()
