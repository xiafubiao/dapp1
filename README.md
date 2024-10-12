# A Quick Demo for MPC-TLS SDK

This demo shows how to create a MPC-TLS data attestation (proof) and further be verified on-chain within a mini dApp. For more details about MPC-TLS SDK, you may refer to this [repo](https://github.com/pado-labs/mpctls-js-sdk) and the [document](https://docs.padolabs.org/mpc-tls/mpc-tls-sdk/overview).

## About MPC-TLS 
MPC-TLS is a cryptographic protocol that runs between an Interent data source server, a client and an attestor (notary) through the [TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security) protocol. Eventually, MPC-TLS protocol outputs verified data (so-called "attestation" or "web proof") by the client, where the data is validated and signed by the verifier for its authenticity regarding to its data source. In PADO's MPC-TLS technique, the data is represented in a privacy-preserving manner, e.g., the data could be a form of "I has more than 100 followers in x.com" when the client retrives his number of followers from X.com without actually explosuring the exact number.

Check the [documents](https://docs.padolabs.org/mpc-tls/tech-intro) for more technical details about MPC-TLS.

## The Tutorial

**Preparation**

We shall install **node.js** before creating the project. 

You can either use Homebrew 
```c++
brew install node
```
or install with **node package manager**
```c++
# installs nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

# download and install Node.js (you may need to restart the terminal)
nvm install 20

# verifies the right Node.js version is in the environment
node -v # should print `v20.18.0`

# verifies the right npm version is in the environment
npm -v # should print `10.8.2`
```
**The Steps**

We use vite and React as the frameworks to create a dapp project. 
```c++
npm create vite@latest dapp1
```
You can choose **JavaScript** and **React** as framework options in the question list. In your project folder, install the realted modules.

```c++
cd dapp1

npm install
```

Now edit the `App.jsx` file, and create a button on your web page to generate an attestation.

```c++
function App() {
...
    return(
    <div className="card">
        <button  onClick={attst}>
          Attest my web data through MPC-TLS
        </button>
      </div>
    )
}
...
```

Now you can define the actions that the function `attst()` shall take, i.e., create an attestation through MPC-TLS SDK. Basically, you can define `attst()` within the `App()` function like this. Remember to call the `initAttestation()` function before generating attestations.

```c++
const attst = async () => {
    const sdkInstance = new MPCTLSJSSDK();
    
    try {
      const initAttestaionResult = await sdkInstance.initAttestation(
        "localhost" // this param shall be your "AppSymbol" like a domain name,
                    // which is registered with PADO's Attestors.
      );
     
      const startAttestaionResult = await sdkInstance.startAttestation({
        chainID: 56, // BNB Chain
        walletAddress: "0x",  // the wallet address of the subject
        attestationTypeID: "9", // type ID "9" means it's an Binance asset proof
        assetsBalance: "50", // a constant value to be compared with your asset balance: balance > 50
      });      
    } catch (e) {
      alert(`attestation failed,code: ${e.code} ,message: ${e.message}`);
    }
    
    
  }
```
Now execute the code to deploy your dapp at localhost, and click the button on the web page to see what will happens. Note you shall log into the Binance website prior to execute the MPC-TLS protocol at the pop-up window.

In our `src` folder, I create a simple demo that allows you to connect with your Metamask wallet, and then create a Binance asset attestation with that wallet address, and show the attestation result on the web page. 

Once you install the packages with `npm install` command, simply run:

```c++
npm run dev
```
