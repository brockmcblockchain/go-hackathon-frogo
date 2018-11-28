'use strict';

window.onload = function () {

  // Handle Login Buttons
  var loginBtns = document.getElementsByClassName("test-metamask");
  for (var i = 0; i < loginBtns.length; i++) {
    var loginBtn = loginBtns[i];
    loginBtn.onclick = function (e) {
      e.preventDefault();
      metaMaskAuth();
    }
  };


  // Allow the creation of multiple tasks.
  var addNewTask = document.getElementsByClassName("AddNewTask");
  if(addNewTask.length){
    addNewTask[0].onclick = function(e){
      e.preventDefault();
      var taskTemplate = document.getElementsByClassName("cloneable");
      if(taskTemplate.length){
        var cln = taskTemplate[0].cloneNode(true);
        var cloneBox = document.getElementsByClassName("blocks")
        if(cloneBox.length){
          cloneBox[0].appendChild(cln);
        }
      }
    }
  }


  function metaMaskAuth(){
    console.log('meta mask!');
    var account = 0;
    if (typeof window.web3 === 'undefined') {
      console.error("Please use a web3 browser");
    } else {
      var myWeb3 = getMetaMaskInstance();
      if(myWeb3){
        getAccount().then(function(result){
          console.log('mm-account', result);
          account = result;
          getBalance(account).then(function(balance){
            console.log('balance!', balance);
          });
        });
      }
    }
  };

  function getMetaMaskInstance(){
    var myWeb3 = new Web3(web3.currentProvider);
    myWeb3.eth.defaultAccount = web3.eth.defaultAccount;
    return myWeb3;
  }

  function getAccount(){
    if (typeof web3 !== 'undefined') {
      return new Promise(function (resolve, reject) {
        web3.eth.getAccounts(function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result[0]);
        }
        });
      });
    }
    return false;
  };

  function getBalance(address) {
    console.log('get balance');
    return new Promise(function (resolve, reject) {
      web3.eth.getBalance(address, function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };

};