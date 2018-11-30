'use strict';

window.onload = function () {
  try {
    var myWeb3 = new Web3(web3.currentProvider || new Web3.providers.HttpProvider("https://testnet-rpc.gochain.io:443"));
    var web3read = new Web3(new Web3.providers.HttpProvider("https://testnet-rpc.gochain.io:443"));

    var abi = JSON.parse('[{"constant":false,"inputs":[{"name":"child","type":"address"},{"name":"_nickname","type":"bytes32"}],"name":"AddChild","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_childAddress","type":"address"},{"name":"_taskdescription","type":"bytes32"},{"name":"_tasklength","type":"uint256"},{"name":"_taskbounty","type":"uint256"},{"name":"_degrade","type":"bool"},{"name":"_decayrate","type":"uint256"}],"name":"AddTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"_childid","type":"uint256"}],"name":"CancelTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_ChildId","type":"uint256"},{"name":"child","type":"address"}],"name":"ChangeKidsAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"_childid","type":"uint256"}],"name":"CompleteTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"denyWalletChange","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"Deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"disconnectFromParent","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"_parentid","type":"address"}],"name":"MarkTaskForReview","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"_childaddr","type":"address"}],"name":"RejectReviewedTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_child","type":"address"}],"name":"removeChildByAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_childid","type":"uint256"}],"name":"removeChildByID","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"requestWalletChange","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_newname","type":"bytes32"}],"name":"setChildName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"Withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"Balance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"checkIfChild","outputs":[{"name":"t","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"ChildAddressByIndex","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"Children","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"ChildToIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"creator","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_child","type":"address"},{"name":"_page","type":"uint256"}],"name":"getActiveChildTaskIDs","outputs":[{"name":"s","type":"uint256[20]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_page","type":"uint256"}],"name":"getActiveTaskIDs","outputs":[{"name":"s","type":"uint256[20]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAllChildren","outputs":[{"name":"s","type":"address[20]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"bal","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_user","type":"address"}],"name":"getBalanceOf","outputs":[{"name":"bal","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_childaddr","type":"address"}],"name":"getChildByAddress","outputs":[{"name":"id","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_childid","type":"uint256"}],"name":"getChildById","outputs":[{"name":"c","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"_child","type":"address"}],"name":"getChildTaskDecayRate","outputs":[{"name":"d","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"_child","type":"address"}],"name":"getChildTaskDescription","outputs":[{"name":"s","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"child","type":"address"}],"name":"getChildTaskEndTime","outputs":[{"name":"x","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"_child","type":"address"}],"name":"getChildTaskInfo","outputs":[{"name":"_decayrate","type":"uint256"},{"name":"_desc","type":"bytes32"},{"name":"_start","type":"uint256"},{"name":"_end","type":"uint256"},{"name":"_review","type":"bool"},{"name":"_active","type":"bool"},{"name":"_decay","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"_child","type":"address"}],"name":"getChildTaskIsActive","outputs":[{"name":"a","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"_child","type":"address"}],"name":"getChildTaskIsDecay","outputs":[{"name":"s","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"_child","type":"address"}],"name":"getChildTaskIsReview","outputs":[{"name":"r","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"_child","type":"address"}],"name":"getChildTaskStart","outputs":[{"name":"t","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_page","type":"uint256"}],"name":"getCompletedTaskIDs","outputs":[{"name":"s","type":"uint256[20]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getNickname","outputs":[{"name":"s","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_child","type":"address"}],"name":"getParent","outputs":[{"name":"p","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_child","type":"address"}],"name":"getParentsNicknameForChildByAddress","outputs":[{"name":"s","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_childId","type":"uint256"}],"name":"getParentsNicknameForChildByID","outputs":[{"name":"s","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_page","type":"uint256"}],"name":"getReviewableTaskIDs","outputs":[{"name":"s","type":"uint256[20]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"}],"name":"getTaskDecayRate","outputs":[{"name":"d","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"}],"name":"getTaskDescription","outputs":[{"name":"s","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"}],"name":"getTaskEndTime","outputs":[{"name":"x","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"}],"name":"getTaskInfo","outputs":[{"name":"","type":"uint256"},{"name":"","type":"bytes32"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"},{"name":"","type":"bool"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"}],"name":"getTaskIsActive","outputs":[{"name":"a","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"}],"name":"getTaskIsDecay","outputs":[{"name":"s","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"}],"name":"getTaskIsReview","outputs":[{"name":"r","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"}],"name":"getTaskStart","outputs":[{"name":"t","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTotalChildren","outputs":[{"name":"t","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_child","type":"address"}],"name":"isChildAccount","outputs":[{"name":"isKid","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"Nickname","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"Parent","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"ParentChildNickname","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"Tasks","outputs":[{"name":"TaskID","type":"uint256"},{"name":"TaskStart","type":"uint256"},{"name":"TaskEnd","type":"uint256"},{"name":"TaskDesc","type":"bytes32"},{"name":"TaskBounty","type":"uint256"},{"name":"TaskDecayRate","type":"uint256"},{"name":"TaskDecay","type":"bool"},{"name":"active","type":"bool"},{"name":"review","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"TaskTotalCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"TotalChildren","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]');

    var VotingContract       = web3.eth.contract(abi);
    var VotingContractRead   = web3read.eth.contract(abi);
    var contractAddress = '0xdeB51513e38eC049fb8E3774f321dD8d17855997';
    var contractInstance     = VotingContract.at(contractAddress);
    var contractInstanceRead = VotingContractRead.at(contractAddress)

    var dashboard = 'Child';
    var hasChildren = 0;
    var hasAddedTasks = 0;
    checkIfChild().then(function(isChild){
      console.log('is child ?', isChild);
      if(isChild == false){
        dashboard = 'Parent';
        hasChildren = 0;
        checkForChildren().then(function(childrenCount){
          var result = childrenCount.filter(obj => {
            console.log(obj);
            return obj !== "0x";
          });
          console.log(result);
          if(result.length > 0){
            hasChildren = 1;
          }
        });
        displayLayout(dashboard);
      }
    });

    getActiveTasks().then(function(data){
      console.log('here are your active tasks', data);
    });

  } catch (err) {
    console.log("error loading web3.", err);
  }


  var account = 0;
  var hasBalance = 0;
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
          if(web3read.fromWei(balance, "ether").toFixed(2) > 0){
            hasBalance = 1;
          }
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

  function displayLayout(layout){
    document.getElementById('' + layout + '').classList.add('active');
    if(layout == 'Parent'){
      displayQuickstart();
    }
  }

  function displayQuickstart(){
    var showStartGuide = 3;
    if(hasBalance){
      document.getElementById('BuyGo').classList.add('hidden');
      showStartGuide--;
    }
    if (hasChildren) {
      document.getElementById('AddFirstChild').classList.add('hidden');
      showStartGuide--;
    }
    if (hasAddedTasks) {
      document.getElementById('AddFirstTask').classList.add('hidden');
      showStartGuide--;
    }
    if(showStartGuide){
      document.getElementById('QuickStartGuide').classList.add('active');
    }
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

  function getChildren(){
    return new Promise(function (resolve, reject) {
      contractInstance.getAllChildren.call(function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  function checkIfChild(){
    return new Promise(function (resolve, reject) {
      contractInstance.checkIfChild.call(function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  function getActiveTasks(page){
    var p = (typeof page !== 'undefined' && page > 0) ? page : 1;
    return new Promise(function (resolve, reject) {
      contractInstance.getActiveTaskIDs.call(p, function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  function checkForChildren(){
    return new Promise(function (resolve, reject) {
      contractInstance.getAllChildren.call(function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
};