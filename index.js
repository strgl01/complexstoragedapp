import Web3 from 'web3';
//instead of abi,and address we imort full json file from build folder
import complexstorage from '../build/contracts/complexstorage.json';
//var to hold web3 instance
let web3;
//var for contract instance
let complexStorage;
//fn to web3 instance
const initweb3 = () => {
    return new Promise((resolve,reject)=>{
        //case1 new metamask
        if(typeof window.ethereum !== 'undefined' ){
        window.ethereum.enable()
        .then(()=>{
            resolve(new Web3(window.ethereum));
        }).catch(e => {
            reject(e);
        });
        return;
    }
    //case2 old metamask present
    if(typeof window.web3 !== 'undefined'){
        return resolve(
            new Web3(window.web3.currentProvider)
        );
    }
    //case 3: just ganache no metamask
    resolve(new Web3('http://localhost:8545'));
});
}
//fn to contract instance
const initcontract = () => {
    const deploymentKey = Object.keys(complexstorage.networks)[0];
    return new web3.eth.Contract(
      complexstorage.abi, 
      complexstorage
        .networks[deploymentKey]
        .address
    );

};
//fn to app instance
const initapp = () => {
    const $addData = document.getElementById('addData');
    const $data = document.getElementById('data');
    let accounts = [];
  
    web3.eth.getAccounts()
    .then(_accounts => {
      accounts = _accounts;
      return complexstorage.methods
        .getAll()
        .call();
    })
    .then(result => {
      $data.innerHTML = result.join(', ');
    });
  
    $addData.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = e.target.elements[0].value;
      advancedStorage.methods
        .set(data)
        .send({from: accounts[0]})
        .then(result => {
          return complexstorage.methods
            .getAll()
            .call();
        })
        .then(result => {
          $data.innerHTML = result.join(', ');
        });
    });

};

document.addEventListener('DOMContentLoaded', () => {
    initWeb3()
      .then(_web3 => {
        web3 = _web3;
        advancedStorage = initContract();
        initApp(); 
      })
      .catch(e => console.log(e.message));
  });
