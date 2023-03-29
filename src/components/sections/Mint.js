import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { abi } from "../../abi/abi";
import { contractAddress } from "../../config";
import {deFiConfig} from "../../config";
import MagicCat from "../../assets/magiccat.png";
import Background from "../../assets/background.jpg";
import { DeFiWeb3Connector } from "deficonnect";
import { BigNumber } from "ethers";
import Web3 from "web3";

import './mint.css';

const { ethereum } = window;

const Mint = () => {
  const mintprice = 1;
  const [mintedcount, setmintedcount] = useState(0);
  const [whitelisters, setlist] = useState([]); // import { Web3ReactProvider } from '@web3-react/core'
  const [nftcount, setcount] = useState(0);
  const [account, setaccount] = useState();
  const [whitelisterstr, setwhitelisterstr] = useState();
  const [price, setprice] = useState(380);
  const [error, seterror] = useState("");
  const [defi, setdefi] = useState();

  const defaultWallet = {
    walletProviderName: "",
    address: "",
    browserWeb3Provider: null,
    serverWeb3Provider: null,
    wcConnector: null,
    wcProvider: null,
    connected: false,
    chainId: 0,
  };

  useEffect(async () => {
    //  ======= Comment for testing connect Defi Wallet ======== //

    // const connector = new DeFiWeb3Connector({
    //   supportedChainIds: [25],
    // //   rpc: { 338: "https://evm-cronos.crypto.org/" }, //Cronos Testnet
    //   rpcUrl: "https://evm-cronos.crypto.org/", // Cronos Mainnet
    //   pollingInterval: 15000,
    // });
    // console.log( ethers.utils.parseEther(`${(380 * nftcount).toString()}`));
    // await connector.activate();
    // const provider = await connector.getProvider();
    // const web3Provider = new ethers.providers.Web3Provider(provider)
    // let signer = web3Provider.getSigner()
    // let nftContract = new ethers.Contract(contractAddress, abi, signer);
    // let balance;
    // await nftContract.getid().then((result) => {
    //   balance = BigNumber(result._hex).toString();
    // });
    // setmintedcount(parseInt(balance));

    // await nftContract.getwhitelistersalestatu().then(async (result) => {
    //   if (result) {
    //     let pp;
    //     setwhitelisterstr("whitelister sale period");
    //     await nftContract.getWhitelisterPrice().then((result) => {
    //       pp = BigNumber(result._hex).shiftedBy(-18).toString();
    //     });
    //     setprice(parseInt(pp));
    //   } else {
    //     let pp;
    //     await nftContract.getPrice().then((result) => {
    //       pp = BigNumber(result._hex).shiftedBy(-18).toString();
    //     });
    //     setprice(parseInt(pp));
    //     console.log(pp);
    //   }
    // });

    /////////////////////////////////////////////////////////////////////////////
  }, []);

  useEffect(() => {
    checkwhitelister();
  }, [account]);

  async function checkwhitelister() {
    for (let i = 0; i < whitelisters.length; i++) {
      if (whitelisters[i].toLowerCase() === account) {
        // console.log(account)
        // console.log(whitelisters[i])
        setwhitelisterstr("YOU ARE WHITELISTER");
      }
    }
  }
  async function connect() {
    console.log(ethereum);
    if (!ethereum) {
      // window.location.href = 'https://metamask.io/download.   '
    } else {
      // if (window.ethereum.networkVersion != 97) {
      //   await window.ethereum.request({
      //     method: "wallet_switchEthereumChain",
      //     params: [{ chainId: "0x19" }], // chainId must be in hexadecimal numbers
      //   });
      // }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setaccount(accounts[0]);
    }
  }
  const reloadApp = () => {
    window.location.reload();
  } 
  const connectDefi = async () => {
    try {
      const connector = new DeFiWeb3Connector({
        supportedChainIds: [deFiConfig.rpcNetwork_mainnet.chainId],
        rpc: {
          [deFiConfig.rpcNetwork_mainnet.chainId]: deFiConfig.rpcNetwork_mainnet.rpcUrl,
        },
        pollingInterval: 15000,
      });
      await connector.activate();

      const provider = await connector.getProvider();
      const web3Provider = new ethers.providers.Web3Provider(provider);
      if(
        !(parseInt(provider.chainId) === deFiConfig.rpcNetwork_mainnet.chainId)
      ) {
        alert(
          "Switch your Wallet to blockchain network " +
            deFiConfig.rpcNetwork_mainnet.chainName
        );
        return defaultWallet;
      }

      // Subscribe to events that reload the app
      connector.on("session_update", reloadApp);
      connector.on("Web3ReactDeactivate", reloadApp);
      connector.on("Web3ReactUpdate", reloadApp);
      
      return {
        ...defaultWallet,
        walletProviderName: "defiwallet",
        address: (await web3Provider.listAccounts())[0],
        browserWeb3Provider: web3Provider,
        serverWeb3Provider: new ethers.providers.JsonRpcProvider(
          deFiConfig.rpcNetwork_mainnet.rpcUrl
        ),
        wcProvider: provider,
        wcConnector: connector,
        connected: true,
        chainId: provider.chainId,
      };
    } catch(e) {
      alert(e);
      return defaultWallet;
    }

    // const connector = new DeFiWeb3Connector({
    //   supportedChainIds: [25],
    // //   rpc: { 338: "https://evm-cronos.crypto.org/" }, //Cronos Testnet
    //   rpcUrl: "https://evm-cronos.crypto.org/", // Cronos Mainnet
    //   pollingInterval: 15000,
    // });
    // console.log("asdf");
    // await connector.activate();
  };
  async function mint() {
    // if (defi) {
      // const accounts = await ethereum.request({
      //   method: "eth_requestAccounts",
      // });
      // console.log("metamask")
      // let provider =new ethers.providers.Web3Provider(ethereum);
      // let signer = provider.getSigner();
      // let nftContract = new ethers.Contract("0x288e81A8BFe19Faa58F72d08FDa3D24D963A38b3", abi, signer);
      // console.log(nftcount);
      // await nftContract
      //   .mints(nftcount, {
      //     value: ethers.utils.parseEther(`${379 * nftcount}`),
      //   })
      //   .catch((err) => {
      //     seterror(err);
      //     // seterror(err.error.message.split(':')[1].toUpperCase());
      //   });
      // setmintedcount(mintedcount + nftcount);
    // } else {
      //   console.log("aa")
        const connector = new DeFiWeb3Connector({
            supportedChainIds: [25],
          //   rpc: { 338: "https://evm-cronos.crypto.org/" }, //Cronos Testnet
            rpcUrl:{25:"https://evm.cronos.org/"}, // Cronos Mainnet
            pollingInterval: 15000,
          });
          console.log( ethers.utils.parseEther(`${(380 * nftcount).toString()}`));
          await connector.activate();
      // const provider = await connector.getProvider();
      // const web3 = new Web3(provider);
      // const web3Provider = new ethers.providers.Web3Provider(provider)
      // // console.log(web3Provider);
      let provider =await connector.getProvider();
      const web3Provider = new ethers.providers.Web3Provider(provider)
      let signer = web3Provider.getSigner();
      let nftContract = new ethers.Contract("0x288e81A8BFe19Faa58F72d08FDa3D24D963A38b3", abi, signer);
      console.log(nftcount);
      await nftContract
        .mints(1, {
          value: ethers.utils.parseEther(`${379 * 1}`),
        })

      
      // let signer = web3Provider.getSigner();
      // await signer.signMessage("asdfsa")
      // let nftContract = new ethers.Contract(contractAddress, abi, signer);
      // let contract = new web3.eth.Contract(abi,contractAddress)
      // await contract.methods.mints("1").then(console.log).catch(console.log)
      // console.log(await nftContract.connect(signer));
      // console.log(signer)
      // {value: ethers.utils.parseEther(`${(380 * nftcount).toString()}`)}
      // await nftContract.getPrice().then((result) => {
      //   let pp = BigNumber(result._hex).shiftedBy(-18).toString();
      //   console.log(pp)
      // }).catch(err=>console.log(err));
      //   .mints("1", {value: "380000000000000000000" })
      //   .catch((err) => {
      //     console.log(err)
        //   // seterror(err.error.message.split(':')[1].toUpperCase());
        // });
      // await nftContract["mints"]("1",{value: ethers.utils.parseEther(`${(379 * nftcount).toString()}`) });
    // }
  }
  return (
    <div id="mint">

      <div className="position-relative background-image">
        <div
          className="container" style={{paddingTop: 100, paddingBottom: 100}}>
          {/* <div> */}
          {/* <div className="background">
            <img src={Background} alt="Background" />
            </div> */}
          <div className="row">

          <div className="col-md-6 d-flex align-items-center justify-content-center text-center nft-text">
              <div>
                <h4>Tut Uncommon - The King of NFTs</h4>
                <p>
                  Instantly recognizable the world over,<br></br> the iconic
                  symbol of ancient Egypt can be yours with this NFT.
                </p>
                <p className="text-center">
                  {" "}
                  5,555 unique cats living on the Cronos blockchain will allow
                  you to rule the metaverse!<br></br> Tut Uncommon pays tribute
                  to Tutankhamun,<br></br> ancient Egypt’s most famous pharaoh.
                </p>
              </div>
            </div>
        
            <div className="col-md-6">
              <div className="connectbutton w-80">
                <button
                  className="glow-on-hover"
                  style={{ color: "#FFD700" }}
                  onClick={connect}
                >
                  CONNECT METAMASK
                </button>
              </div>
              <br />
              <div className="connectbutton">
                <button
                  className="glow-on-hover"
                  style={{ color: "#FFD700" }}
                  onClick={connectDefi}
                >
                  CONNECT CryptoDefi
                </button>
              </div>
              <div>
                <div className="mint_available text-center">
                  {mintedcount}/5555 MINTED
                </div>
                <div className="whitelister">{whitelisterstr}</div>
                <div className="d-flex justify-content-space">
                    <button
                      className="glow-on-hover smallbtn"
                      onClick={() => {
                        if (nftcount > 1) setcount(nftcount - 1);
                      }}
                    >
                      -
                    </button>
                  <span className="col count text-center">{nftcount}</span>
                    <button
                      className="glow-on-hover smallbtn"
                      onClick={() => {
                        setcount(nftcount + 1);
                      }}
                    >
                      +
                    </button>
                </div>

                <button className="glow-on-hover mintbutton" onClick={mint}>
                  mint
                </button>
                <div
                  className="mintprice text-center"
                  style={{ backgroundColor: "black" }}
                >
                  {" "}
                  MINT PRICE : 379 CRO &nbsp; Whitelist Price: 329 CRO
                </div>
              </div>
            </div>
            {/* <div className="col-lg-4 col-md-6">
                            <img src={MagicCat} alt="Magic Cat" style={{ height: '80%' }} />
                        </div> */}
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};
export default Mint;
