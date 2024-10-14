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
  const [x, setX] = useState();
  
  const [sdkInstance, setSDKInstance] = useState();
  // add MPC-TLS here

  const attst = async () => {
      // new SDK instance
    
    try {
      const initAttestaionResult = await sdkInstance.initAttestation(
        "localhost" // this param shall be your "AppSymbol" like a domain name,
                    //which is registered with PADO's Attestors.
      );
     
      const startAttestaionResult = await sdkInstance.startAttestation({
        chainID: 97,//BNB Chain Testnet
        walletAddress: address,
        attestationTypeID: '9', //binance asset proof
        attestationParameters: ['50'], 
      });
      setAttestation(startAttestaionResult);

      const verifyAttestationResult = sdkInstance.verifyAttestation(
        startAttestaionResult
      );
      console.log("attestation local verification:" + verifyAttestationResult); // Output: true
    
      console.log(attestation);
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

    console.log(address);

    setAddress(address);
    setSDKInstance(new MPCTLSJSSDK()); 

  };


  const submitToChain = async () => {
    try {
      const sendToChainResult = await sdkInstance.sendToChain(
        attestation,
        window.ethereum
      );
      console.log(sendToChainResult); // Output: https://bascan.io/attestation/0x
      console.log("SendToChain successfully!");
    } catch (e) {
      alert(`SendToChain failed,code: ${e.code} ,message: ${e.message}`);
    }

  }

  const handleClick = () => {
    setX(attestation);
    submitToChain();
  };



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
        </button>
      </div>


      <hr />

      <div>
    
      <textarea value={JSON.stringify(x, null, 2)} readOnly rows="8" cols="50"></textarea>
      <br /><br />
      
  
      <button onClick={handleClick}>Show the attestation result</button>
    </div>



  

</div>
  )
}

export default App
