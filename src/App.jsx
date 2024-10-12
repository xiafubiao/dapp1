import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { ethers } from 'ethers'
import MPCTLSJSSDK from "@padolabs/mpctls-js-sdk"


function App() {

  const [address, setAddress] = useState();
  const [chainName, setChainName] = useState();
  const [attestation, setAttestation] = useState();

  // add MPC-TLS here

  const attst = async (connectedAddress) => {
    const sdkInstance = new MPCTLSJSSDK();
    try {
      const initAttestaionResult = await sdkInstance.initAttestation(
        "localhost"
      );
      console.log(connectedAddress+"");
      const startAttestaionResult = await sdkInstance.startAttestation({
        chainID: 56,
        walletAddress: "0xc814b5AACFB7F3400e90FFa4fC6BF5169E221f61",
        attestationTypeID: "9",
        assetsBalance: "99",
      });
      console.log("init: "+ initAttestaionResult); //Output: true

      console.log("start: "+ startAttestaionResult);

      
    } catch (e) {
      alert(`attestation failed,code: ${e.code} ,message: ${e.message}`);
    }

  }


  //connect Arconnect
  const connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);

    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    console.log(window.ethereum.selectedAddress);

    await setAddress(address);
    console.log(address);

  };

  /*
  const openWebSource = async () => {
    window.open('https://www.binance.com');
    attst(address);
  }*/

  return (
    <div>
      <div className="card1">
        <button onClick={connectWallet}>
          Connect Wallet
        </button>
        <br />
        { <a>{address}</a>}
        <br />
      </div>

      <hr />

      <div className="card2">
        <button  onClick={attst}>
          Attest my web data through MPC-TLS
          <br />
        { <a>{attestation}</a>}
        <br />
        </button>
      </div>


      <hr />

      <div className="card3">
        hello, this is a test to show the MPC-TLS SDK!
      </div>
    </div>
  )
}

export default App
