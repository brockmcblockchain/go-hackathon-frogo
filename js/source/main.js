'use strict';
// 0x2C79DD08680A6ce9572C767409C7f71A1Fc6D244
window.onload = function () {
  try {
    var myWeb3 = new Web3(web3.currentProvider || new Web3.providers.HttpProvider("https://testnet-rpc.gochain.io:443"));
    var web3read = new Web3(new Web3.providers.HttpProvider("https://testnet-rpc.gochain.io:443"));

    var abi = JSON.parse('[{"constant":true,"inputs":[{"name":"_parent","type":"address"}],"name":"checkIfChild","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_child","type":"address"}],"name":"addChild","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAllTasks","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"address[]"},{"name":"","type":"uint128[]"},{"name":"","type":"bool[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"Children","outputs":[{"name":"name","type":"bytes32"},{"name":"parentAddress","type":"address"},{"name":"childAddress","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_taskId","type":"uint128"}],"name":"doChangeTaskToReview","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"bytes32"},{"name":"_assignee","type":"address"},{"name":"_bounty","type":"uint128"}],"name":"addTodoItem","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_creator","type":"address"}],"name":"getReviewTasksByParentAddress","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"uint128[]"},{"name":"","type":"bool[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_taskId","type":"uint128"}],"name":"doRejectTaskToReview","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_parent","type":"address"}],"name":"getParentsChildren","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"Tasks","outputs":[{"name":"value","type":"bytes32"},{"name":"creator","type":"address"},{"name":"assignee","type":"address"},{"name":"bounty","type":"uint128"},{"name":"active","type":"bool"},{"name":"review","type":"bool"},{"name":"paid","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_assignee","type":"address"}],"name":"getActiveTasksByChildAddress","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"uint128[]"},{"name":"","type":"bool[]"}],"payable":false,"stateMutability":"view","type":"function"}]');
    //var abi = JSON.parse('[{"constant":true,"inputs":[],"name":"creator","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_childaddr","type":"address"}],"name":"getChildByAddress","outputs":[{"name":"id","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"_child","type":"address"}],"name":"getChildTaskStart","outputs":[{"name":"t","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"bal","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"disconnectFromParent","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_page","type":"uint256"}],"name":"getReviewableTaskIDs","outputs":[{"name":"s","type":"uint256[20]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTotalChildren","outputs":[{"name":"t","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"TaskTotalCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"_childid","type":"uint256"}],"name":"CancelTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"}],"name":"getTaskStart","outputs":[{"name":"t","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"Balance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"_childaddr","type":"address"}],"name":"RejectReviewedTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"requestWalletChange","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_page","type":"uint256"}],"name":"getActiveTaskIDs","outputs":[{"name":"s","type":"uint256[20]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"_child","type":"address"}],"name":"getChildTaskDescription","outputs":[{"name":"s","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"_child","type":"address"}],"name":"getChildTaskInfo","outputs":[{"name":"_decayrate","type":"uint256"},{"name":"_desc","type":"string"},{"name":"_start","type":"uint256"},{"name":"_end","type":"uint256"},{"name":"_review","type":"bool"},{"name":"_active","type":"bool"},{"name":"_decay","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_childid","type":"uint256"}],"name":"getChildById","outputs":[{"name":"c","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"}],"name":"getTaskIsActive","outputs":[{"name":"a","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"}],"name":"getTaskEndTime","outputs":[{"name":"x","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_page","type":"uint256"}],"name":"getCompletedTaskIDs","outputs":[{"name":"s","type":"uint256[20]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"}],"name":"getTaskIsReview","outputs":[{"name":"r","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"Withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"TotalChildren","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"_childid","type":"uint256"}],"name":"CompleteTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_newname","type":"string"}],"name":"setChildName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_childid","type":"uint256"}],"name":"removeChildByID","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"Tasks","outputs":[{"name":"TaskID","type":"uint256"},{"name":"TaskStart","type":"uint256"},{"name":"TaskEnd","type":"uint256"},{"name":"TaskDesc","type":"string"},{"name":"TaskBounty","type":"uint256"},{"name":"TaskDecayRate","type":"uint256"},{"name":"TaskDecay","type":"bool"},{"name":"active","type":"bool"},{"name":"review","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_child","type":"address"}],"name":"removeChildByAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_child","type":"address"},{"name":"_page","type":"uint256"}],"name":"getActiveChildTaskIDs","outputs":[{"name":"s","type":"uint256[20]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"_child","type":"address"}],"name":"getChildTaskIsReview","outputs":[{"name":"r","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"_child","type":"address"}],"name":"getChildTaskIsDecay","outputs":[{"name":"s","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"}],"name":"getTaskDecayRate","outputs":[{"name":"d","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"Nickname","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"Parent","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"child","type":"address"},{"name":"_nickname","type":"string"}],"name":"AddChild","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"}],"name":"getTaskIsDecay","outputs":[{"name":"s","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"child","type":"address"}],"name":"getChildTaskEndTime","outputs":[{"name":"x","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_user","type":"address"}],"name":"getBalanceOf","outputs":[{"name":"bal","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"ChildAddressByIndex","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_childId","type":"uint256"}],"name":"getParentsNicknameForChildByID","outputs":[{"name":"s","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_child","type":"address"}],"name":"getParent","outputs":[{"name":"p","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_ChildId","type":"uint256"},{"name":"child","type":"address"}],"name":"ChangeKidsAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getNickname","outputs":[{"name":"s","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"denyWalletChange","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"ParentChildNickname","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAllChildren","outputs":[{"name":"s","type":"address[20]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"ChildToIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"_child","type":"address"}],"name":"getChildTaskDecayRate","outputs":[{"name":"d","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_child","type":"address"}],"name":"isChildAccount","outputs":[{"name":"isKid","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_child","type":"address"}],"name":"getParentsNicknameForChildByAddress","outputs":[{"name":"s","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"}],"name":"getTaskInfo","outputs":[{"name":"","type":"uint256"},{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"},{"name":"","type":"bool"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"}],"name":"getTaskDescription","outputs":[{"name":"s","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"Children","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"Deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"_child","type":"address"}],"name":"getChildTaskIsActive","outputs":[{"name":"a","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"checkIfChild","outputs":[{"name":"t","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"_parentid","type":"address"}],"name":"MarkTaskForReview","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_childAddress","type":"address"},{"name":"_taskdescription","type":"string"},{"name":"_tasklength","type":"uint256"},{"name":"_taskbounty","type":"uint256"},{"name":"_degrade","type":"bool"},{"name":"_decayrate","type":"uint256"}],"name":"AddTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}]');

    var VotingContract       = web3.eth.contract(abi);
    var VotingContractRead   = web3read.eth.contract(abi);
    var contractAddress      = '0x2E56cae2c5e4d960A783576c6627c31af77a8eb8';
    //var contractAddress      = '0x1EEF95C215Ec588F8f9Ad654DCEfA1dd31EaE301';
    var contractInstance     = VotingContract.at(contractAddress);
    var contractInstanceRead = VotingContractRead.at(contractAddress)

    var dashboard            = 'Child';
    var hasChildren          = 0;
    var hasAddedTasks        = 0;

    
    checkIfChild().then(function(isChild){
      console.log('is child ?', isChild);
      if(isChild == false){
        dashboard = 'Parent';
        hasChildren = 0;
        getChildren().then(function(children){
          var childrenAddresses = children[1];
          var childrenNames     = children[0];
          console.log('children??', children, childrenNames.length);
          
          if(childrenNames.length > 0){
            console.log('test');
            populateChildrenList(children);
          }
          
          /*
          var result = children.filter(obj => {
            return obj !== "0x";
          });
          */
          if(childrenAddresses.length > 0){
            hasChildren = 1;
          }
          checkForTaskCreated().then(function(tasks){
            // TODO: FILTER THESE
            var taskCount = tasks.length;
            if(taskCount > 0) {
              hasAddedTasks = 1;
            }
            displayLayout(dashboard);
          });
        });
      }
    });
    

    
    // Reviewable Task Display
    if(hasChildren == false){
      console.log('you are a parent');
      getReviewTasks().then(function(data){
        if(data.length > 0){
          // make tasks
          console.log('these are your reviewable tasks', data);
          for(i = 0; i < data.length; i++){
            var taskTemplate = document.getElementsByClassName("reviewable-task");
            if(taskTemplate.length){
              var cln = taskTemplate[0].cloneNode(true);
              // Populate Data
              // Add new task to the task container.
              cln.classList.add('active');
              document.getElementById("ReviewAbleTaskContainer").appendChild(cln); 
            }
          }
        } else {
          console.log('no tasks for review.');
        }
      });
    } else {
      console.log('you are a childs.');
      // Child Display List
      getActiveTasks().then(function(data){
        if(data.length > 0){
          // make tasks
          console.log('these are your active tasks', data);
          for(i = 0; i < data.length; i++){
            var taskTemplate = document.getElementsByClassName("reviewable-task");
            if(taskTemplate.length){
              var cln = taskTemplate[0].cloneNode(true);
              // Populate Data
              // Add new task to the task container.
              cln.classList.add('active');
              document.getElementById("ReviewAbleTaskContainer").appendChild(cln); 
            }
          }
        } else {
          console.log('no tasks for review.');
        }
      });
    }
    

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

  // ACTION:  ADD NEW CHILD
  var AddNewChildSubmit = document.getElementsByClassName('addNewChildSubmit')[0];
  AddNewChildSubmit.onclick = function (e) {
    e.preventDefault();
    var _add = document.getElementById('NewChildWalletAddress').value;
    var _nickname = '"' + document.getElementById('NewChildNickname').value + '"';
    addNewChild(_add, _nickname);
  }
  function addNewChild(_add, _nickname){
    console.log('sending..', _nickname, ' converted: ', web3.fromAscii(_nickname), _add);
    contractInstance.addChild.sendTransaction(web3.fromAscii(_nickname), _add, {from: web3.eth.accounts[0], gas: web3.getGas, to: contractAddress}, function(err, result) {
      if(!err) {
        // TODO: Change View
        // CLEAR CHILD FORM
        // ADD NEW CHILD RECORD TO List
        console.log("Receiver has been set: " + result);
      }else{
        console.log(err);
      }
    });
  }

  // Add New Task for Child
  var addTaskForChild = document.getElementsByClassName('addTaskForChild');
  onClickDoCallback(addTaskForChild, 'toggle', 'open', function () {
    document.getElementById('NewTask').classList.toggle('active');
  });
  // ACTION: ADD NEW TASK
  function SubmitNewTask(_childAddress, _taskdescription, _tasklength, _taskbounty, _degrade, _decayrate){
    console.log('sending..', _childAddress, _taskdescription, _tasklength, _taskbounty, _degrade, _decayrate);
    contractInstance.AddTask.sendTransaction(_childAddress, _taskdescription, _tasklength, _taskbounty, _degrade, _decayrate, {from: web3.eth.accounts[0], gas: web3.getGas, to: contractAddress}, function(err, result) {
      if(!err) {
        // TODO: Change View
        console.log("Receiver has been set: " + result);
      }else{
        console.log(err);
      }
    });
  }

  var AddNewTaskSubmit = document.getElementById('AddNewTaskSubmit');
  AddNewTaskSubmit.onclick = function (e) {
    e.preventDefault();
    console.log('you clicked submit new task');
    var _childAddress     = document.getElementById('TaskChildAddress').value;
    var _taskdescription  = '"' + document.getElementById('TaskDescription').value + '"';
    var _tasklength       = document.getElementById('TaskEndDate').value;
    _tasklength           = new Date(_tasklength).getTime();
    var _taskbounty       = document.getElementById('TaskBounty').value;
    var _degrade          = (document.getElementById('TaskUseDecay').value === true) ? true : false;
    var _decayrate        = 10;

    SubmitNewTask(_childAddress, _taskdescription, _tasklength, _taskbounty, _degrade, _decayrate);
  }


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

  /******************************
   *  PARENT ACCEPT/DENY FUNCTIONALITY
   ******************************/
  var MarkCompleted = document.getElementsByClassName('mark-task-as-completed');
  for (var i = 0; i < MarkCompleted.length; i++) {
    var indElm = MarkCompleted[i];
    indElm.onclick = function (e) {
      e.preventDefault();
      var _taskid = indElm.dataset.taskid;
      var _childAddress = indElm.dataset.childaddress;
      getChildId(_childAddress).then(function(_childAddress){
        var _childid = indElm.dataset.childid;
        CompleteTaskSubmit(_taskid, _childid).then(function(result){
          // TODO view changes.
          indElm.parentNode.parentNode.parentNode.removeChild(indElm.parentNode.parentNode);
        });
      });
    }
  }
   

  function CompleteTaskSubmit(_taskid, _childid){
    return new Promise(function (resolve, reject) {
      console.log('sending..', _taskid, _childid);
      contractInstance.CompleteTask.sendTransaction(_taskid, _childid, {from: web3.eth.accounts[0], gas: web3.getGas, to: contractAddress}, function(err, result) {
        if(!err) {
          resolve(result);
        } else{
          reject(error);
        }
      });
    });
  }

  var RejectTask = document.getElementsByClassName('reject-task');
  for (var i = 0; i < RejectTask.length; i++) {
    var indElm = RejectTask[i];
    indElm.onclick = function (e) {
      e.preventDefault();
      var _taskid = indElm.dataset.taskid;
      var _childAddress = indElm.dataset.childaddress;
      RejectTaskSubmit(_taskid, _childAddress).then(function(result){
        indElm.parentNode.parentNode.parentNode.removeChild(indElm.parentNode.parentNode);
      });
    }
  }
   

  function RejectTaskSubmit(_taskid, _childAddress){
    return new Promise(function (resolve, reject) {
      console.log('sending..', _taskid, _childAddress);
      contractInstance.RejectReviewedTask.sendTransaction(_taskid, _childAddress, {from: web3.eth.accounts[0], gas: web3.getGas, to: contractAddress}, function(err, result) {
        if(!err) {
          console.log("Receiver has been set: " + result);
          resolve(result);
        } else{
          console.log(err);
          reject(error);
        }
      });
    });
  }



  /*******************************
   *  UTILITY FUCTION FOR ONCLICKS
   *******************************/
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

  /******************************
   *  DISPLAY AND LAYOUT CHANGE FUCTIONS
   ******************************/
  function displayLayout(layout){
    console.log('layout: ', layout);
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


  /*************************
   *  WEB3/SOLIDITY HELPER FUNCTIONS
   *************************/
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
      var _parent = web3.eth.accounts[0];
      console.log(_parent);
      contractInstanceRead.getParentsChildren.call(_parent, function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  function getChildId(_childAddress){
    return new Promise(function (resolve, reject) {
      contractInstanceRead.getChildByAddress.call(_childAddress, function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  function checkIfChild(){
    var _parent = web3.eth.accounts[0];
    console.log(_parent);
    return new Promise(function (resolve, reject) {
      contractInstanceRead.checkIfChild.call(_parent, function (error, result) {
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
      contractInstanceRead.getActiveTaskIDs.call(p, function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  function getReviewTasks(page){
    console.log('checking for reviewables');
    var p = (typeof page !== 'undefined' && page > 0) ? page : 1;
    return new Promise(function (resolve, reject) {
      contractInstanceRead.getReviewableTaskIDs.call(p, function (error, result) {
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
      contractInstanceRead.getAllChildren.call(function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  function checkForTaskCreated(){
    if(account){
      return new Promise(function (resolve, reject) {
        contractInstanceRead.getReviewTasksByParentAddress.call(account, function (error, result) {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
    } else {
      getAccount().then(function(result){
        account = result[0];
        this.checkForTaskCreated;
      });
    }
  }

  function populateChildrenList(childrenArrays){
    console.log('call a clone!');
    var names = childrenArrays[0];
    var addresses = childrenArrays[1];
    for(var c = 0; c < addresses.length; c++){
      var taskTemplate = document.getElementsByClassName("child-template");
      if(taskTemplate.length){
        var cln = taskTemplate[0].cloneNode(true);
        // Populate Data
        cln.getElementsByClassName('child-name')[0].innerHTML = web3.toAscii(names[c]).replace(/['"]+/g, '');
        cln.getElementsByClassName('action-container')[0].setAttribute("data-child", addresses[c]);
        // Add new task to the task container.
        cln.classList.add('active');
        document.getElementById("ChildrenContainer").appendChild(cln); 
      }    
    }
  }

};