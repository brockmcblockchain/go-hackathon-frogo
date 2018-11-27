'use strict';

window.onload = function () {

  // Handle Login Buttons
  var loginBtns = document.getElementsByClassName("login-btn");
  for (var i = 0; i < loginBtns.length; i++) {
    var loginBtn = loginBtns[i];
    loginBtn.onclick = function (e) {
      //e.preventDefault();
      //metaMaskAuth();
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
    if (typeof window.web3 === 'undefined') {
      console.error("Please use a web3 browser");
    } else {
      var myWeb3 = new Web3(window.web3.currentProvider);
      myWeb3.eth.defaultAccount = window.web3.eth.defaultAccount;

      return myWeb3;
    }
  };
};