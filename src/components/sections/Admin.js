// import './App.css';
import { abi } from './abi';
// import { Web3ReactProvider , useWeb3React} from '@web3-react/core'
// import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { ethers } from "ethers"; // npm install ethers
import { useState } from 'react';
import { DeFiWeb3Connector } from 'deficonnect';

const { ethereum } = window;
const contractaddress = "0x4AD9D713a372edDd5BfF3Bcb802Bc081F45dCB4A"

function Admin() {
  const [whitelisters,setwhitelisters]=useState()
  const [price,setprice]=useState()
  const [whitelisterprice,setwhitelisterprice]=useState()
  const [provider,setprovider]=useState()
  // const { active, activate, deactivate, chainId, account, } =  useWeb3React();
  async function connect() {
    const connector = new DeFiWeb3Connector({
      supportedChainIds: [338],
      rpc: {338: 'https://cronos-testnet-3.crypto.org:8545/'}, //Cronos Testnet
      //rpcUrl: "https://evm-cronos.crypto.org/", // Cronos Mainnet
      pollingInterval: 15000,
    })
    console.log('asdf');
    await connector.activate();
    setprovider(await connector.getProvider())
  }

  const withdraw =async ()=>{
    const web3Provider = new ethers.providers.Web3Provider(provider);
    const signer1 = web3Provider.getSigner();
    const Contract = new ethers.Contract(contractaddress, abi, signer1);
    await Contract.withdrawAll()
  }

  const addwhitelister =async ()=>{
    const web3Provider = new ethers.providers.Web3Provider(provider);
    const signer1 = web3Provider.getSigner();
    const Contract = new ethers.Contract(contractaddress, abi, signer1);
    await Contract.addWhitelister(whitelisters.split(','))
  }
  const setPrice =async ()=>{
    const web3Provider = new ethers.providers.Web3Provider(provider);
    const signer1 = web3Provider.getSigner();
    const Contract = new ethers.Contract(contractaddress, abi, signer1);
    await Contract.setPrice(price)
  }
  const setwhitePrice =async ()=>{
    const web3Provider = new ethers.providers.Web3Provider(provider);
    const signer1 = web3Provider.getSigner();
    const Contract = new ethers.Contract(contractaddress, abi, signer1);
    await Contract.setWhitelisterprice(whitelisterprice)
  }
  const freemint = async()=>{
    const web3Provider = new ethers.providers.Web3Provider(provider);
    const signer1 = web3Provider.getSigner();
    const Contract = new ethers.Contract(contractaddress, abi, signer1);
    await Contract.freemint("7")
  }
  const changesalestatu = async()=>{
    const web3Provider = new ethers.providers.Web3Provider(provider);
    const signer1 = web3Provider.getSigner();
    const Contract = new ethers.Contract(contractaddress, abi, signer1);
    await Contract.startPublicsale()
  }
  const changewhitestatu = async()=>{
    const web3Provider = new ethers.providers.Web3Provider(provider);
    const signer1 = web3Provider.getSigner();
    const Contract = new ethers.Contract(contractaddress, abi, signer1);
    await Contract.startWhitelistersale()
  }
  

  return (
      <div className="App" id="admin">
        <header className="App-header">
        <label className='fontSize' >Admin Panel</label>
          <div className="row">
      
            <button className="buttonStyle" onClick={connect}>Connect wallet</button>
            <br></br>
            <button className="buttonStyle"  onClick={withdraw}>WithDraw</button>
          </div>
          <label>Add whitelisters with comma</label>
          <textarea className='whitelister' type="text" value={whitelisters} onChange={(e)=>{setwhitelisters(e.target.value)}}></textarea>
          <button className="buttonStyle" onClick={addwhitelister}>Add whitelister</button>
          <label>Input price(cro)</label>
          <input value={price} onChange={e=>setprice(e.target.value)}></input>
          <button className="buttonStyle" onClick={setPrice}>SET Price</button>
          <label>Input whitelister price(cro)</label>
          <input value={whitelisterprice} onChange={e=>setwhitelisterprice(e.target.value)}></input>
          <button className="buttonStyle" onClick={setwhitePrice}>Set whitelister price</button>
          <button className="buttonStyle" onClick={freemint}>Freemint</button>

          <button className="buttonStyle" onClick={changesalestatu}>Change public sale statu</button>
          <button className="buttonStyle" onClick={changewhitestatu}>Change whitelister sale statu</button>

        </header>

      </div>
  );
}

export default Admin;
