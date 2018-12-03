"use strict";function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(e,t){var n=[],a=!0,s=!1,o=void 0;try{for(var i,l=e[Symbol.iterator]();!(a=(i=l.next()).done)&&(n.push(i.value),!t||n.length!==t);a=!0);}catch(c){s=!0,o=c}finally{try{a||null==l["return"]||l["return"]()}finally{if(s)throw o}}return n}function _arrayWithHoles(e){if(Array.isArray(e))return e}window.onload=function(){function e(e,t){document.getElementById("NewChildWalletAddress").value="",document.getElementById("NewChildNickname").value="",document.getElementById("NewChild").classList.remove("active"),document.getElementsByClassName("AddNewChild")[0].classList.remove("open");var n=web3.fromAscii(t);I.addChild.sendTransaction(n,e,{from:web3.eth.accounts[0],gas:web3.getGas,to:A},function(e,t){e?console.log(e):(console.log("Receiver has been set: "+t),setTimeout(function(){console.log("hash recepit found"),location.reload()},7500))})}function t(e){document.getElementById("NewTask").classList.toggle("active"),document.getElementById("TaskChildAddress").value=""+e}function n(e,t,n,a,s){console.log("sending..",e,t,n,a,s),I.addTask.sendTransaction(t,e,n,a,s,{from:web3.eth.accounts[0],gas:web3.getGas,to:A},function(e,t){e?console.log(e):(document.getElementById("TaskDescription").value="",document.getElementById("TaskEndDate").value="",document.getElementById("TaskBounty").value="",document.getElementById("TaskUseDecay").value="",document.getElementById("NewTask").classList.remove("active"),console.log("Receiver has been set: "+t),setTimeout(function(){location.reload()},7500))})}function a(e){return new Promise(function(t,n){console.log("sending..",e),I.doChangeTaskToReview.sendTransaction(e,{from:web3.eth.accounts[0],gas:web3.getGas,to:A},function(e,a){e?n(error):t(a)})})}function s(e){return new Promise(function(t,n){console.log("sending..",e),I.doCompleteTask.sendTransaction(e,{from:web3.eth.accounts[0],gas:web3.getGas,to:A},function(e,a){e?n(error):t(a)})})}function o(e){return new Promise(function(t,n){console.log("sending..",e),I.doRejectTaskToReview.sendTransaction(e,{from:web3.eth.accounts[0],gas:web3.getGas,to:A},function(e,a){e?(console.log(e),n(error)):(console.log("Receiver has been set: "+a),t(a))})})}function i(e,t,n,a){for(var s=0;s<e.length;s++){var o=e[s];o.onclick=function(e){"toggle"===t&&o.classList.toggle("open"),"remove"===t&&o.classList.remove(n),"add"===t&&o.classList.add(n),a()}}}function l(e){console.log("layout: ",e),w(),document.getElementById(""+e).classList.add("active"),"Parent"==e&&c(),k()}function c(){var e=3;G&&(document.getElementById("BuyGo").classList.add("hidden"),e--),P&&(document.getElementById("AddFirstChild").classList.add("hidden"),e--),_&&(document.getElementById("AddFirstTask").classList.add("hidden"),e--),e>0&&document.getElementById("QuickStartGuide").classList.add("active")}function r(){return"undefined"!=typeof web3&&new Promise(function(e,t){web3.eth.getAccounts(function(n,a){n?t(n):(a=a.length>1?a[0]:a,e(a))})})}function d(e){return new Promise(function(t,n){web3.eth.getBalance(e,function(e,a){e?n(e):t(a)})})}function u(){return new Promise(function(e,t){var n=web3.eth.accounts[0];L.getParentsChildren.call(n,function(n,a){n?t(n):e(a)})})}function m(){var e=web3.eth.accounts[0];return new Promise(function(t,n){L.checkIfChild.call(e,function(e,a){e?n(e):t(a)})})}function y(){var e=web3.eth.accounts[0];return new Promise(function(t,n){L.getActiveTasksByChildAddress.call(e,function(e,a){e?n(e):t(a)})})}function p(e){var t=web3.eth.accounts[0];return new Promise(function(e,n){L.getReviewTasksByParentAddress.call(t,function(t,a){t?n(t):e(a)})})}function f(){var e=web3.eth.accounts[0];return new Promise(function(t,n){L.getActiveTasksByParentAddress.call(e,function(e,a){e?n(e):t(a)})})}function g(){var e=web3.eth.accounts[0];return new Promise(function(t,n){L.hasParentMadeTask.call(e,function(e,a){e?n(e):t(a)})})}function v(e){for(var t=e[0],n=e[1],a=0;a<n.length;a++)"0x0000000000000000000000000000000000000000000000000000000000000000"!==n[U]&&h(t[a],n[a])}function h(e,n){var a=document.getElementsByClassName("child-template");if(a.length){var s=a[0].cloneNode(!0);s.getElementsByClassName("child-name")[0].innerHTML=web3.toAscii(e).replace(/['"]+/g,""),s.getElementsByClassName("action-container")[0].setAttribute("data-child",n),s.classList.add("active"),s.onclick=function(e){var n=e.target.attributes[1].nodeValue;t(n)},document.getElementById("ChildrenContainer").appendChild(s)}}function b(){document.getElementById("NoWallet").classList.add("active")}function w(){document.getElementById("NoWallet").classList.remove("active")}function k(){document.getElementById("Loading").classList.remove("active")}function N(e){console.log("has children: ",e),e>0?(p().then(function(e){console.log("your review tasks",e);var t=_slicedToArray(e,6),n=t[0],a=t[1],i=t[2],l=(t[3],t[4]);t[5];if(a.length>0){for(U=0;U<a.length;U++)if("0x0000000000000000000000000000000000000000000000000000000000000000"!==a[U]){var c=document.getElementsByClassName("reviewable-task");if(c.length){var r=c[0].cloneNode(!0),d=new Date(l[U]);r.getElementsByClassName("icon-container")[0].innerHTML="<span>"+i[U]+" GO</span>";var u=web3.toAscii(a[U])+'<div class="dueDate">Must Complete By: '+d+"</div>";r.getElementsByClassName("content")[0].innerHTML=u,r.getElementsByClassName("mark-task-as-completed")[0].dataset.taskid=n[U],r.getElementsByClassName("reject-task")[0].dataset.taskid=n[U],r.getElementsByClassName("reject-task")[0].onclick=function(e){e.preventDefault();var t=e.target.attributes[2].nodeValue;o(t).then(function(e){J.parentNode.parentNode.parentNode.removeChild(J.parentNode.parentNode)})},r.getElementsByClassName("mark-task-as-completed")[0].onclick=function(e){e.preventDefault();var t=e.target.attributes[2].nodeValue;s(t).then(function(e){J.parentNode.parentNode.parentNode.removeChild(J.parentNode.parentNode)})},r.classList.add("active"),document.getElementById("ReviewAbleTaskContainer").appendChild(r)}}}else console.log("no tasks for review.")}),f().then(function(e){var t=_slicedToArray(e,6),n=(t[0],t[1]),a=t[2];t[3],t[4],t[5];if(n.length>0){for(U=0;U<n.length;U++)if("0x0000000000000000000000000000000000000000000000000000000000000000"!==n[U]){var s=document.getElementsByClassName("parent-active-tasks")[0],o=s.cloneNode(!0);o.getElementsByClassName("task-bounty-value")[0].innerHTML=a[U]+" GO",o.getElementsByClassName("task-description-value")[0].innerHTML=web3.toAscii(n[U]),o.classList.add("active"),document.getElementById("ParentActiveTasksContainer").appendChild(o)}}else console.log("no tasks for review.")})):y().then(function(e){var t=_slicedToArray(e,6),n=t[0],s=t[1],o=t[2],i=(t[3],t[4]),c=t[5];if(s.length>0){for(U=0;U<s.length;U++)if("0x0000000000000000000000000000000000000000000000000000000000000000"!==s[U]){var r=document.getElementsByClassName("active-tasks");if(r.length){var d=r[0].cloneNode(!0),u=new Date(i[U]);d.getElementsByClassName("icon-container")[0].innerHTML="<span>"+o[U]+" GO</span>";var m=web3.toAscii(s[U])+'<div class="dueDate">Must Complete By: '+u+"</div>";d.getElementsByClassName("content")[0].innerHTML=m,d.getElementsByClassName("mark-task-for-review")[0].dataset.taskid=n[U],d.getElementsByClassName("mark-task-for-review")[0].dataset.childaddress=c[U],d.onclick=function(e){e.preventDefault();var t=e.target.attributes[3].nodeValue;a(t).then(function(e){console.log("marked for review..",e),J.parentNode.parentNode.parentNode.removeChild(J.parentNode.parentNode)})},d.classList.add("active"),document.getElementById("ChildTaskContainer").appendChild(d)}}l(M)}else console.log("no tasks for review.")})}try{var C=(new Web3(web3.currentProvider||new Web3.providers.HttpProvider("https://testnet-rpc.gochain.io:443")),new Web3(new Web3.providers.HttpProvider("https://testnet-rpc.gochain.io:443"))),B=JSON.parse('[{"constant":false,"inputs":[{"name":"_creator","type":"address"}],"name":"getActiveTasksByParentAddress","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint128[]"},{"name":"","type":"uint128[]"},{"name":"","type":"uint128[]"},{"name":"","type":"address[]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_parent","type":"address"}],"name":"checkIfChild","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_taskId","type":"uint128"}],"name":"doCompleteTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_child","type":"address"}],"name":"addChild","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_creator","type":"address"}],"name":"hasParentMadeTask","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"getAllTasks","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint128[]"},{"name":"","type":"uint128[]"},{"name":"","type":"uint128[]"},{"name":"","type":"address[]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"Children","outputs":[{"name":"name","type":"bytes32"},{"name":"parentAddress","type":"address"},{"name":"childAddress","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_taskId","type":"uint128"}],"name":"doChangeTaskToReview","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_creator","type":"address"}],"name":"getReviewTasksByParentAddress","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint128[]"},{"name":"","type":"uint128[]"},{"name":"","type":"uint128[]"},{"name":"","type":"address[]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_taskId","type":"uint128"}],"name":"doRejectTaskToReview","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_value","type":"bytes32"},{"name":"_assignee","type":"address"},{"name":"_startDate","type":"uint128"},{"name":"_endDate","type":"uint128"},{"name":"_bounty","type":"uint128"}],"name":"addTask","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_parent","type":"address"}],"name":"getParentsChildren","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"address[]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"Tasks","outputs":[{"name":"value","type":"bytes32"},{"name":"creator","type":"address"},{"name":"assignee","type":"address"},{"name":"bounty","type":"uint128"},{"name":"startDate","type":"uint128"},{"name":"endDate","type":"uint128"},{"name":"useDecay","type":"bool"},{"name":"active","type":"bool"},{"name":"review","type":"bool"},{"name":"paid","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_assignee","type":"address"}],"name":"getActiveTasksByChildAddress","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint128[]"},{"name":"","type":"uint128[]"},{"name":"","type":"uint128[]"},{"name":"","type":"address[]"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]'),E=web3.eth.contract(B),T=C.eth.contract(B),A="0x0dba448fAa07cCc1A0079D4767C8073762c74E49",I=E.at(A),L=T.at(A),M="Child",P=0,_=0;web3.eth.getAccounts(function(e,t){null!=e?console.error("An error occurred: "+e):0==t.length?b():w()}),m().then(function(e){console.log("is Child?",e),e===!1?(M="Parent",u().then(function(e){for(var t=e[1],n=e[0],a=0;a<n.length;a++)"0x0000000000000000000000000000000000000000"==t[a]&&(t.splice(a,1),n.splice(a,1));e=[n,t],t=e[1],n=e[0],n.length>0?(v(e),P=1):P=0,g().then(function(e){_=e,N(P),l(M)})})):N(P)})}catch(D){console.log("error loading web3.",D)}var R=0,G=0;"undefined"==typeof window.web3?console.error("Please use a web3 browser"):(w(),r().then(function(e){"undefined"==typeof e?console.log("no wallet."):(R=e[0],d(R).then(function(e){var t='<i class="fas fa-usd-circle"></i> '+web3.fromWei(e,"ether").toFixed(2)+" GO";C.fromWei(e,"ether").toFixed(2)>0&&(G=1),document.getElementById("GoBalance").innerHTML=t}))}));var H=document.getElementsByClassName("test-metamask");i(H,"","",function(){metaMaskAuth()});var W=document.getElementsByClassName("cancelChild");i(W,"remove","open",function(){document.getElementsByClassName("AddNewChild")[0].classList.remove("open"),document.getElementById("NewChild").classList.remove("active")});var x=document.getElementsByClassName("AddNewChild");i(x,"toggle","open",function(){document.getElementById("NewChild").classList.toggle("active")});var j=document.getElementsByClassName("addNewChildSubmit")[0];j.onclick=function(t){t.preventDefault();var n=document.getElementById("NewChildWalletAddress").value,a='"'+document.getElementById("NewChildNickname").value+'"';e(n,a)};var O=document.getElementById("AddNewTaskSubmit");O.onclick=function(e){console.log("you clicked submit new task");var t=document.getElementById("TaskChildAddress").value,a=web3.fromAscii(document.getElementById("TaskDescription").value),s=document.getElementById("TaskEndDate").value;s=new Date(s).getTime();var o=(new Date).getTime(),i=document.getElementById("TaskBounty").value,l=document.getElementById("TaskUseDecay").value===!0;n(t,a,o,s,i,l)};var S=document.getElementsByClassName("cancelTask");i(S,"remove","open",function(){document.getElementById("NewTask").classList.remove("active")});var F=document.getElementsByClassName("AddNewTask");F.length&&(F[0].onclick=function(e){var t=document.getElementsByClassName("cloneable");if(t.length){var n=t[0].cloneNode(!0);document.getElementById("TaskBlocks").appendChild(n)}});for(var V=document.getElementsByClassName("mark-task-as-completed"),U=0;U<V.length;U++){var J=V[U];J.onclick=function(e){e.preventDefault();var t=J.dataset.taskid;s(t).then(function(e){J.parentNode.parentNode.parentNode.removeChild(J.parentNode.parentNode)})}}for(var Q=document.getElementsByClassName("mark-task-for-review"),U=0;U<Q.length;U++){var J=Q[U];J.onclick=function(e){e.preventDefault();var t=J.dataset.taskid;a(t).then(function(e){J.parentNode.parentNode.parentNode.removeChild(J.parentNode.parentNode)})}}for(var q=document.getElementsByClassName("reject-task"),U=0;U<q.length;U++){var J=q[U];J.onclick=function(e){e.preventDefault();var t=J.dataset.taskid,n=J.dataset.childaddress;o(t,n).then(function(e){J.parentNode.parentNode.parentNode.removeChild(J.parentNode.parentNode)})}}};