'use strict';

window.onload = function () {
  var account = 0;
  if (typeof window.web3 === 'undefined') {
    console.error("Please use a web3 browser");
  } else {
    getAccount().then(function (result) {
      if (typeof result === 'undefined') {
        console.log('no wallet.');
      } else {
        account = result[0];
        getBalance(account).then(function (balance) {
          var trueBalance = '<i class="fas fa-usd-circle"></i> ' + web3.fromWei(balance, "ether").toFixed(2) + ' GO';
          document.getElementById("GoBalance").innerHTML = trueBalance;
        });
      }
    });
  }

  // Handle Login Buttons
  var loginBtns = document.getElementsByClassName('test-metamask');
  onClickDoCallback(loginBtns, '', '', function(){
    metaMaskAuth();
  });

  // Cancel the addition of a child.
  var cancelChild = document.getElementsByClassName('cancelChild');
  onClickDoCallback(cancelChild, 'remove', 'open', function () {
    document.getElementsByClassName('AddNewChild')[0].classList.remove('open');
    document.getElementById('NewChild').classList.remove('active');
  });

  // Toggle Child Form
  var AddNewChild = document.getElementsByClassName('AddNewChild');
  onClickDoCallback(AddNewChild, 'toggle', 'open', function () {
    document.getElementById('NewChild').classList.toggle('active');
  });

  // Add New Task for Child
  var addTaskForChild = document.getElementsByClassName('addTaskForChild');
  onClickDoCallback(addTaskForChild, 'toggle', 'open', function () {
    document.getElementById('NewTask').classList.toggle('active');
  });

  var cancelTask = document.getElementsByClassName('cancelTask');
  onClickDoCallback(cancelTask, 'remove', 'open', function () {
    document.getElementById('NewTask').classList.remove('active');
  });

  // Allow the creation of multiple tasks.
  var addNewTask = document.getElementsByClassName("AddNewTask");
  if(addNewTask.length){
    addNewTask[0].onclick = function(e){
      e.preventDefault();
      console.log('cloneable!');
      var taskTemplate = document.getElementsByClassName("cloneable");
      if(taskTemplate.length){
        var cln = taskTemplate[0].cloneNode(true);
        document.getElementById("TaskBlocks").appendChild(cln);
      }
    }
  }

  function onClickDoCallback(elm, methodType, className, callback){
    for (var i = 0; i < elm.length; i++) {
      var indElm = elm[i];
      indElm.onclick = function (e) {
        e.preventDefault();
        if (methodType === 'toggle'){
          indElm.classList.toggle('open');
        }
        if (methodType === 'remove'){
          indElm.classList.remove(className);
        }
        if (methodType === 'add'){
          indElm.classList.add(className);
        }
        callback();
      }
    };

  }

  function metaMaskAuth(){
    console.log('meta mask!');

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
          result = (result.length > 1) ? result[0] : result;
          resolve(result);
        }
        });
      });
    }
    return false;
  };

  function getBalance(address) {
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