'use strict';
// 0x2C79DD08680A6ce9572C767409C7f71A1Fc6D244
window.onload = function () {
  try {
    var myWeb3 = new Web3(web3.currentProvider || new Web3.providers.HttpProvider("https://testnet-rpc.gochain.io:443"));
    var web3read = new Web3(new Web3.providers.HttpProvider("https://testnet-rpc.gochain.io:443"));

    var abi = JSON.parse('[{"constant":true,"inputs":[{"name":"_parent","type":"address"}],"name":"checkIfChild","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_taskId","type":"uint128"}],"name":"doCompleteTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_child","type":"address"}],"name":"addChild","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_creator","type":"address"}],"name":"hasParentMadeTask","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAllTasks","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint128[]"},{"name":"","type":"uint128[]"},{"name":"","type":"uint128[]"},{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"Children","outputs":[{"name":"name","type":"bytes32"},{"name":"parentAddress","type":"address"},{"name":"childAddress","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_taskId","type":"uint128"}],"name":"doChangeTaskToReview","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_creator","type":"address"}],"name":"getReviewTasksByParentAddress","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint128[]"},{"name":"","type":"uint128[]"},{"name":"","type":"uint128[]"},{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_taskId","type":"uint128"}],"name":"doRejectTaskToReview","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"bytes32"},{"name":"_assignee","type":"address"},{"name":"_startDate","type":"uint128"},{"name":"_endDate","type":"uint128"},{"name":"_bounty","type":"uint128"}],"name":"addTask","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_parent","type":"address"}],"name":"getParentsChildren","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"Tasks","outputs":[{"name":"value","type":"bytes32"},{"name":"creator","type":"address"},{"name":"assignee","type":"address"},{"name":"bounty","type":"uint128"},{"name":"startDate","type":"uint128"},{"name":"endDate","type":"uint128"},{"name":"useDecay","type":"bool"},{"name":"active","type":"bool"},{"name":"review","type":"bool"},{"name":"paid","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_assignee","type":"address"}],"name":"getActiveTasksByChildAddress","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint128[]"},{"name":"","type":"uint128[]"},{"name":"","type":"uint128[]"},{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"}]');

    var VotingContract       = web3.eth.contract(abi);
    var VotingContractRead   = web3read.eth.contract(abi);
    var contractAddress      = '0x5c476D44534c7e39C2aFD9bc5ac4cF0861ED8fC9';

    var contractInstance     = VotingContract.at(contractAddress);
    var contractInstanceRead = VotingContractRead.at(contractAddress)

    var dashboard            = 'Child';
    var hasChildren          = 0;
    var hasAddedTasks        = 0;

    
    checkIfChild().then(function(isChild){
      if(isChild == false){
        dashboard = 'Parent';
        hasChildren = 0;
        getChildren().then(function(children){
          var childrenAddresses = children[1];
          var childrenNames     = children[0];
          for(var kids = 0; kids < childrenNames.length; kids++){
            if(childrenAddresses[kids] == '0x0000000000000000000000000000000000000000'){
              childrenAddresses.splice(kids, 1);
              childrenNames.splice(kids, 1);
            }
          }
          children = [childrenNames, childrenAddresses];
          if(childrenNames.length > 0){
            populateChildrenList(children);
            hasChildren = 1;
          }
          checkForTaskCreated().then(function(tasks){
            hasAddedTasks = tasks;
            displayLayout(dashboard);
          });
        });
      }
    });
    
    // Reviewable Task Display
    if(hasChildren == false){
      getReviewTasks().then(function(data){
        var [taskIds, descriptions, bounties, startDates, endDates, assignees] = data;
        if(descriptions.length > 0){
          // make tasks
          for(i = 0; i < descriptions.length; i++){
            if(descriptions[i] !== '0x0000000000000000000000000000000000000000000000000000000000000000'){
              var taskTemplate = document.getElementsByClassName("reviewable-task");
              if(taskTemplate.length){
                var cln = taskTemplate[0].cloneNode(true);
                // Populate Data
                var ts = new Date(endDates[i]);
                // toLocaleDateString
                cln.getElementsByClassName('icon-container')[0].innerHTML = '<span>' + bounties[i] + ' GO</span>';
                var content = web3.toAscii(descriptions[i]) + '<div class="dueDate">Must Complete By: ' + ts + '</div>';
                cln.getElementsByClassName('content')[0].innerHTML = content;

                cln.getElementsByClassName('mark-task-as-completed')[0].dataset.taskid = taskIds[i];
                cln.getElementsByClassName('reject-task')[0].dataset.taskid = taskIds[i];

                // HANDLE -- Reject Button
                cln.getElementsByClassName('reject-task')[0].onclick = function(e){
                  e.preventDefault();
                  var _taskid = e.target.attributes[2].nodeValue;
                  RejectTaskSubmit(_taskid).then(function(result){
                    indElm.parentNode.parentNode.parentNode.removeChild(indElm.parentNode.parentNode);
                  });
                }

                // HANDLE -- Completed Button
                cln.getElementsByClassName('mark-task-as-completed')[0].onclick = function(e){
                  e.preventDefault();
                  var _taskid = e.target.attributes[2].nodeValue;
                  CompleteTaskSubmit(_taskid).then(function(result){
                    indElm.parentNode.parentNode.parentNode.removeChild(indElm.parentNode.parentNode);
                  });
                }

                // Add new task to the task container.
                cln.classList.add('active');
                document.getElementById("ReviewAbleTaskContainer").appendChild(cln); 
              }
            }
          }
        } else {
          console.log('no tasks for review.');
        }
      });
    } else {
      // Child Display List
      getActiveTasks().then(function(data){
        var [taskIds, descriptions, bounties, startDates, endDates, assignees] = data;
        if(descriptions.length > 0){
          // make tasks
          for(i = 0; i < descriptions.length; i++){
            if(descriptions[i] !== '0x0000000000000000000000000000000000000000000000000000000000000000'){
              var taskTemplate = document.getElementsByClassName("active-tasks");
              if(taskTemplate.length){
                var cln = taskTemplate[0].cloneNode(true);
                // Populate Data
                var ts = new Date(endDates[i]);
                // toLocaleDateString
                cln.getElementsByClassName('icon-container')[0].innerHTML = '<span>' + bounties[i] + ' GO</span>';
                var content = web3.toAscii(descriptions[i]) + '<div class="dueDate">Must Complete By: ' + ts + '</div>';
                cln.getElementsByClassName('content')[0].innerHTML = content;
                
                cln.getElementsByClassName('mark-task-for-review')[0].dataset.taskid = taskIds[i];
                cln.getElementsByClassName('mark-task-for-review')[0].dataset.childaddress = assignees[i];

                cln.onclick = function(e){
                  e.preventDefault();
                  var _taskid = e.target.attributes[3].nodeValue;
                  
                  ReviewTaskSubmit(_taskid).then(function(result){
                    console.log('marked for review..', result);
                    indElm.parentNode.parentNode.parentNode.removeChild(indElm.parentNode.parentNode);
                  });
                  
                }

                // Add new task to the task container.
                cln.classList.add('active');
                document.getElementById("ChildTaskContainer").appendChild(cln);
              } 
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
    showNoAccount();
    console.error("Please use a web3 browser");
  } else {
    hideNoAccount();
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
    // CLEAR CHILD FORM
    document.getElementById('NewChildWalletAddress').value = '';
    document.getElementById('NewChildNickname').value = '';
    document.getElementById('NewChild').classList.remove('active');
    
    contractInstance.addChild.sendTransaction(web3.fromAscii(_nickname), _add, {from: web3.eth.accounts[0], gas: web3.getGas, to: contractAddress}, function(err, result) {
      if(!err) {
        console.log("Receiver has been set: " + result);
        setTimeout(function(){
          addNewChildToList(_nickname, _add);
        }, 6000);
        
      }else{
        console.log(err);
      }
    });
  }

  function addTaskForChildFunctionality(childAddress){
    document.getElementById('NewTask').classList.toggle('active');
    document.getElementById('TaskChildAddress').value = '' + childAddress + '';
  }

  // ACTION: ADD NEW TASK
  function SubmitNewTask(_childAddress, _taskdescription, _startDate, _endDate, _taskbounty){
    console.log('sending..', _childAddress, _taskdescription, _startDate, _endDate, _taskbounty);
    // addTask(bytes32 _value, address _assignee, uint128 _startDate, uint128 _endDate, uint128 _bounty)
    contractInstance.addTask.sendTransaction(_taskdescription, _childAddress, _startDate, _endDate, _taskbounty, {from: web3.eth.accounts[0], gas: web3.getGas, to: contractAddress}, function(err, result) {
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
    var _taskdescription  = web3.fromAscii(document.getElementById('TaskDescription').value);
    var _endDate          = document.getElementById('TaskEndDate').value;
    _endDate              = new Date(_endDate).getTime();
    var _startDate        = new Date().getTime();
    var _taskbounty       = document.getElementById('TaskBounty').value;
    var _degrade          = (document.getElementById('TaskUseDecay').value === true) ? true : false;

    SubmitNewTask(_childAddress, _taskdescription, _startDate, _endDate, _taskbounty, _degrade);
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
      CompleteTaskSubmit(_taskid).then(function(result){
        // TODO view changes.
        indElm.parentNode.parentNode.parentNode.removeChild(indElm.parentNode.parentNode);
      });
    }
  }

  // CHILD TASK FUNCTIONALITY
  var MarkForReview = document.getElementsByClassName('mark-task-for-review');
  for (var i = 0; i < MarkForReview.length; i++) {
    var indElm = MarkForReview[i];
    indElm.onclick = function (e) {
      e.preventDefault();
      var _taskid = indElm.dataset.taskid;
      ReviewTaskSubmit(_taskid).then(function(result){
        indElm.parentNode.parentNode.parentNode.removeChild(indElm.parentNode.parentNode);
      });
    
    }
  }
   
  function ReviewTaskSubmit(_taskid) {
    return new Promise(function (resolve, reject) {
      console.log('sending..', _taskid);
      contractInstance.doChangeTaskToReview.sendTransaction(_taskid, {from: web3.eth.accounts[0], gas: web3.getGas, to: contractAddress}, function(err, result) {
        if(!err) {
          resolve(result);
        } else{
          reject(error);
        }
      });
    });
  }

  function CompleteTaskSubmit(_taskid){
    return new Promise(function (resolve, reject) {
      console.log('sending..', _taskid);
      contractInstance.doCompleteTask.sendTransaction(_taskid, {from: web3.eth.accounts[0], gas: web3.getGas, to: contractAddress}, function(err, result) {
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
   

  function RejectTaskSubmit(_taskid){
    return new Promise(function (resolve, reject) {
      console.log('sending..', _taskid);
      contractInstance.doRejectTaskToReview.sendTransaction(_taskid, {from: web3.eth.accounts[0], gas: web3.getGas, to: contractAddress}, function(err, result) {
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
    if(showStartGuide > 0){
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

  function getActiveTasks(){
    var _child = web3.eth.accounts[0];
    var _child = '0x2C79DD08680A6ce9572C767409C7f71A1Fc6D244';
    return new Promise(function (resolve, reject) {
      contractInstanceRead.getActiveTasksByChildAddress.call(_child, function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  function getReviewTasks(page){
    var _parent = web3.eth.accounts[0];
    return new Promise(function (resolve, reject) {
      contractInstanceRead.getReviewTasksByParentAddress.call(_parent, function (error, result) {
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

  // TODO: Fix this -- it's pulling even blank stuff.
  function checkForTaskCreated(){
    var _parent = web3.eth.accounts[0];
    return new Promise(function (resolve, reject) {
      contractInstanceRead.hasParentMadeTask.call(_parent, function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  function populateChildrenList(childrenArrays){
    var names = childrenArrays[0];
    var addresses = childrenArrays[1];
    for(var c = 0; c < addresses.length; c++){
      console.log('a kid..', addresses[i], names[i]);
      if(addresses[i] !== '0x0000000000000000000000000000000000000000000000000000000000000000'){
        addNewChildToList(names[c], addresses[c]);    
      }
    }
  }

  function addNewChildToList(_name, _address){
    var taskTemplate = document.getElementsByClassName("child-template");
    if(taskTemplate.length){
      var cln = taskTemplate[0].cloneNode(true);
      // Populate Data
      cln.getElementsByClassName('child-name')[0].innerHTML = web3.toAscii(_name).replace(/['"]+/g, '');
      cln.getElementsByClassName('action-container')[0].setAttribute("data-child", _address);
      // Add new task to the task container.
      cln.classList.add('active');
      cln.onclick = function(e){
        e.preventDefault();
        var childAddress = e.target.attributes[1].nodeValue;
        addTaskForChildFunctionality(childAddress);
      }
      document.getElementById("ChildrenContainer").appendChild(cln); 
    }
  }

  function showNoAccount(){
    document.getElementById('NoWallet').classList.add('active');
  }
  function hideNoAccount(){
    document.getElementById('NoWallet').classList.remove('active');
  }
};