# A Quick Demo for MPC-TLS SDK

This demo shows how to create a MPC-TLS data attestation (proof) and further be verified on-chain within a mini dApp.

## About MPC-TLS 
MPC-TLS is a cryptographic protocol that runs between an Interent data source server, a client and a Attestor(or notary) through the [TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security) protocol. Eventually, MPC-TLS protocol outputs verified data (so-called "attestation" or "web proof") by the client, where the data is validated and signed by the verifier for its authenticity regarding to its data source. In PADO's MPC-TLS technique, the data is represented in a privacy-preserving manner, e.g., the data could be a form of "I has more than 100 followers in x.com" when the client retrives his number of followers from X.com without actually explosuring the exact number.

Check the [documents](https://docs.padolabs.org/mpc-tls/tech-intro) for more technical details about MPC-TLS.

## The Steps

```
npm create vite@latest dapp1
```

```
Cd dapp1

Npm install
```