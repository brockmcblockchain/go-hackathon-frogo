"use strict";window.onload=function(){function t(t,e){console.log("sending..",t,e),h.AddChild.sendTransaction(t,e,{from:web3.eth.accounts[0],gas:web3.getGas,to:v},function(t,e){t?console.log(t):console.log("Receiver has been set: "+e)})}function e(t,e,a,n,s,i){console.log("sending..",t,e,a,n,s,i),h.AddTask.sendTransaction(t,e,a,n,s,i,{from:web3.eth.accounts[0],gas:web3.getGas,to:v},function(t,e){t?console.log(t):console.log("Receiver has been set: "+e)})}function a(t,e){return new Promise(function(a,n){console.log("sending..",t,e),h.CompleteTask.sendTransaction(t,e,{from:web3.eth.accounts[0],gas:web3.getGas,to:v},function(t,e){t?n(error):a(e)})})}function n(t,e){return new Promise(function(a,n){console.log("sending..",t,e),h.RejectReviewedTask.sendTransaction(t,e,{from:web3.eth.accounts[0],gas:web3.getGas,to:v},function(t,e){t?(console.log(t),n(error)):(console.log("Receiver has been set: "+e),a(e))})})}function s(t,e,a,n){for(var s=0;s<t.length;s++){var i=t[s];i.onclick=function(t){t.preventDefault(),"toggle"===e&&i.classList.toggle("open"),"remove"===e&&i.classList.remove(a),"add"===e&&i.classList.add(a),n()}}}function i(t){document.getElementById(""+t).classList.add("active"),"Parent"==t&&u()}function u(){var t=3;B&&(document.getElementById("BuyGo").classList.add("hidden"),t--),C&&(document.getElementById("AddFirstChild").classList.add("hidden"),t--),T&&(document.getElementById("AddFirstTask").classList.add("hidden"),t--),t&&document.getElementById("QuickStartGuide").classList.add("active")}function o(){return"undefined"!=typeof web3&&new Promise(function(t,e){web3.eth.getAccounts(function(a,n){a?e(a):(n=n.length>1?n[0]:n,t(n))})})}function l(t){return new Promise(function(e,a){web3.eth.getBalance(t,function(t,n){t?a(t):e(n)})})}function p(t){return new Promise(function(e,a){k.getChildByAddress.call(t,function(t,n){t?a(t):e(n)})})}function y(){return new Promise(function(t,e){k.checkIfChild.call(function(a,n){a?e(a):t(n)})})}function c(t){var e="undefined"!=typeof t&&t>0?t:1;return new Promise(function(t,a){k.getActiveTaskIDs.call(e,function(e,n){e?a(e):t(n)})})}function d(){return new Promise(function(t,e){k.getAllChildren.call(function(a,n){a?e(a):t(n)})})}function m(){return _?new Promise(function(t,e){k.TaskTotalCount.call(_,function(a,n){a?e(a):t(n)})}):void o().then(function(t){_=t[0],this.checkForTaskCreated})}try{var r=(new Web3(web3.currentProvider||new Web3.providers.HttpProvider("https://testnet-rpc.gochain.io:443")),new Web3(new Web3.providers.HttpProvider("https://testnet-rpc.gochain.io:443"))),f=JSON.parse('[{"constant":true,"inputs":[],"name":"creator","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_childaddr","type":"address"}],"name":"getChildByAddress","outputs":[{"name":"id","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"_child","type":"address"}],"name":"getChildTaskStart","outputs":[{"name":"t","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"bal","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"disconnectFromParent","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_page","type":"uint256"}],"name":"getReviewableTaskIDs","outputs":[{"name":"s","type":"uint256[20]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTotalChildren","outputs":[{"name":"t","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"TaskTotalCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"_childid","type":"uint256"}],"name":"CancelTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"}],"name":"getTaskStart","outputs":[{"name":"t","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"Balance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"_childaddr","type":"address"}],"name":"RejectReviewedTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"requestWalletChange","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_page","type":"uint256"}],"name":"getActiveTaskIDs","outputs":[{"name":"s","type":"uint256[20]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"_child","type":"address"}],"name":"getChildTaskDescription","outputs":[{"name":"s","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"_child","type":"address"}],"name":"getChildTaskInfo","outputs":[{"name":"_decayrate","type":"uint256"},{"name":"_desc","type":"string"},{"name":"_start","type":"uint256"},{"name":"_end","type":"uint256"},{"name":"_review","type":"bool"},{"name":"_active","type":"bool"},{"name":"_decay","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_childid","type":"uint256"}],"name":"getChildById","outputs":[{"name":"c","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"}],"name":"getTaskIsActive","outputs":[{"name":"a","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"}],"name":"getTaskEndTime","outputs":[{"name":"x","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_page","type":"uint256"}],"name":"getCompletedTaskIDs","outputs":[{"name":"s","type":"uint256[20]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"}],"name":"getTaskIsReview","outputs":[{"name":"r","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"Withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"TotalChildren","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"_childid","type":"uint256"}],"name":"CompleteTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_newname","type":"string"}],"name":"setChildName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_childid","type":"uint256"}],"name":"removeChildByID","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"Tasks","outputs":[{"name":"TaskID","type":"uint256"},{"name":"TaskStart","type":"uint256"},{"name":"TaskEnd","type":"uint256"},{"name":"TaskDesc","type":"string"},{"name":"TaskBounty","type":"uint256"},{"name":"TaskDecayRate","type":"uint256"},{"name":"TaskDecay","type":"bool"},{"name":"active","type":"bool"},{"name":"review","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_child","type":"address"}],"name":"removeChildByAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_child","type":"address"},{"name":"_page","type":"uint256"}],"name":"getActiveChildTaskIDs","outputs":[{"name":"s","type":"uint256[20]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"_child","type":"address"}],"name":"getChildTaskIsReview","outputs":[{"name":"r","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"_child","type":"address"}],"name":"getChildTaskIsDecay","outputs":[{"name":"s","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"}],"name":"getTaskDecayRate","outputs":[{"name":"d","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"Nickname","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"Parent","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"child","type":"address"},{"name":"_nickname","type":"string"}],"name":"AddChild","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"}],"name":"getTaskIsDecay","outputs":[{"name":"s","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"child","type":"address"}],"name":"getChildTaskEndTime","outputs":[{"name":"x","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_user","type":"address"}],"name":"getBalanceOf","outputs":[{"name":"bal","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"ChildAddressByIndex","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_childId","type":"uint256"}],"name":"getParentsNicknameForChildByID","outputs":[{"name":"s","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_child","type":"address"}],"name":"getParent","outputs":[{"name":"p","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_ChildId","type":"uint256"},{"name":"child","type":"address"}],"name":"ChangeKidsAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getNickname","outputs":[{"name":"s","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"denyWalletChange","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"ParentChildNickname","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAllChildren","outputs":[{"name":"s","type":"address[20]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"ChildToIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"_child","type":"address"}],"name":"getChildTaskDecayRate","outputs":[{"name":"d","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_child","type":"address"}],"name":"isChildAccount","outputs":[{"name":"isKid","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_child","type":"address"}],"name":"getParentsNicknameForChildByAddress","outputs":[{"name":"s","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"}],"name":"getTaskInfo","outputs":[{"name":"","type":"uint256"},{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"},{"name":"","type":"bool"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"}],"name":"getTaskDescription","outputs":[{"name":"s","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"Children","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"Deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"_child","type":"address"}],"name":"getChildTaskIsActive","outputs":[{"name":"a","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"checkIfChild","outputs":[{"name":"t","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_taskid","type":"uint256"},{"name":"_parentid","type":"address"}],"name":"MarkTaskForReview","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_childAddress","type":"address"},{"name":"_taskdescription","type":"string"},{"name":"_tasklength","type":"uint256"},{"name":"_taskbounty","type":"uint256"},{"name":"_degrade","type":"bool"},{"name":"_decayrate","type":"uint256"}],"name":"AddTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}]'),b=web3.eth.contract(f),g=r.eth.contract(f),v="0x1EEF95C215Ec588F8f9Ad654DCEfA1dd31EaE301",h=b.at(v),k=g.at(v),w="Child",C=0,T=0;y().then(function(t){console.log("is child ?",t),0==t&&(w="Parent",C=0,d().then(function(t){console.log("children??",t);var e=t.filter(function(t){return"0x"!==t});e.length>0&&(C=1),m().then(function(t){var e=t.toNumber();e>0&&(T=1),i(w)})}))}),c().then(function(t){console.log("here are your active tasks",t)})}catch(M){console.log("error loading web3.",M)}var _=0,B=0;"undefined"==typeof window.web3?console.error("Please use a web3 browser"):o().then(function(t){"undefined"==typeof t?console.log("no wallet."):(_=t[0],l(_).then(function(t){var e='<i class="fas fa-usd-circle"></i> '+web3.fromWei(t,"ether").toFixed(2)+" GO";r.fromWei(t,"ether").toFixed(2)>0&&(B=1),document.getElementById("GoBalance").innerHTML=e}))});var I=document.getElementsByClassName("test-metamask");s(I,"","",function(){metaMaskAuth()});var N=document.getElementsByClassName("cancelChild");s(N,"remove","open",function(){document.getElementsByClassName("AddNewChild")[0].classList.remove("open"),document.getElementById("NewChild").classList.remove("active")});var E=document.getElementsByClassName("AddNewChild");s(E,"toggle","open",function(){document.getElementById("NewChild").classList.toggle("active")});var A=document.getElementsByClassName("addNewChildSubmit")[0];A.onclick=function(e){e.preventDefault();var a=document.getElementById("NewChildWalletAddress").value,n='"'+document.getElementById("NewChildNickname").value+'"';t(a,n)};var D=document.getElementsByClassName("addTaskForChild");s(D,"toggle","open",function(){document.getElementById("NewTask").classList.toggle("active")});var P=document.getElementById("AddNewTaskSubmit");P.onclick=function(t){t.preventDefault(),console.log("you clicked submit new task");var a=document.getElementById("TaskChildAddress").value,n='"'+document.getElementById("TaskDescription").value+'"',s=document.getElementById("TaskEndDate").value;s=new Date(s).getTime();var i=document.getElementById("TaskBounty").value,u=document.getElementById("TaskUseDecay").value===!0,o=10;e(a,n,s,i,u,o)};var L=document.getElementsByClassName("cancelTask");s(L,"remove","open",function(){document.getElementById("NewTask").classList.remove("active")});var R=document.getElementsByClassName("AddNewTask");R.length&&(R[0].onclick=function(t){t.preventDefault(),console.log("cloneable!");var e=document.getElementsByClassName("cloneable");if(e.length){var a=e[0].cloneNode(!0);document.getElementById("TaskBlocks").appendChild(a)}});for(var F=document.getElementsByClassName("mark-task-as-completed"),W=0;W<F.length;W++){var x=F[W];x.onclick=function(t){t.preventDefault();var e=x.dataset.taskid,n=x.dataset.childaddress;p(n).then(function(t){var n=x.dataset.childid;a(e,n).then(function(t){x.parentNode.parentNode.parentNode.removeChild(x.parentNode.parentNode)})})}}for(var G=document.getElementsByClassName("reject-task"),W=0;W<G.length;W++){var x=G[W];x.onclick=function(t){t.preventDefault();var e=x.dataset.taskid,a=x.dataset.childaddress;n(e,a).then(function(t){x.parentNode.parentNode.parentNode.removeChild(x.parentNode.parentNode)})}}};