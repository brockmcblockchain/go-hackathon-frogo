"use strict";function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(e,t){var n=[],a=!0,s=!1,o=void 0;try{for(var i,l=e[Symbol.iterator]();!(a=(i=l.next()).done)&&(n.push(i.value),!t||n.length!==t);a=!0);}catch(r){s=!0,o=r}finally{try{a||null==l["return"]||l["return"]()}finally{if(s)throw o}}return n}function _arrayWithHoles(e){if(Array.isArray(e))return e}window.onload=function(){function e(e,t){document.getElementById("NewChildWalletAddress").value="",document.getElementById("NewChildNickname").value="",document.getElementById("NewChild").classList.remove("active"),document.getElementsByClassName("AddNewChild")[0].classList.remove("open");var n=web3.fromAscii(t);E.addChild.sendTransaction(n,e,{from:web3.eth.accounts[0],gas:web3.getGas,to:B},function(e,t){e?console.log(e):(console.log("Receiver has been set: "+t),setTimeout(function(){console.log("hash recepit found"),location.reload()},7500))})}function t(e){document.getElementById("NewTask").classList.toggle("active"),document.getElementById("TaskChildAddress").value=""+e}function n(e,t,n,a,s){console.log("sending..",e,t,n,a,s),E.addTask.sendTransaction(t,e,n,a,s,{from:web3.eth.accounts[0],gas:web3.getGas,to:B},function(e,t){e?console.log(e):(document.getElementById("TaskDescription").value="",document.getElementById("TaskEndDate").value="",document.getElementById("TaskBounty").value="",document.getElementById("TaskUseDecay").value="",document.getElementById("NewTask").classList.remove("active"),console.log("Receiver has been set: "+t),setTimeout(function(){location.reload()},7500))})}function a(e){return new Promise(function(t,n){console.log("sending..",e),E.doChangeTaskToReview.sendTransaction(e,{from:web3.eth.accounts[0],gas:web3.getGas,to:B},function(e,a){e?n(error):t(a)})})}function s(e){return new Promise(function(t,n){console.log("sending..",e),E.doCompleteTask.sendTransaction(e,{from:web3.eth.accounts[0],gas:web3.getGas,to:B},function(e,a){e?n(error):t(a)})})}function o(e){return new Promise(function(t,n){console.log("sending..",e),E.doRejectTaskToReview.sendTransaction(e,{from:web3.eth.accounts[0],gas:web3.getGas,to:B},function(e,a){e?(console.log(e),n(error)):(console.log("Receiver has been set: "+a),t(a))})})}function i(e,t,n,a){for(var s=0;s<e.length;s++){var o=e[s];o.onclick=function(e){"toggle"===t&&o.classList.toggle("open"),"remove"===t&&o.classList.remove(n),"add"===t&&o.classList.add(n),a()}}}function l(e){console.log("layout: ",e),b(),document.getElementById(""+e).classList.add("active"),"Parent"==e&&r()}function r(){var e=3;P&&(document.getElementById("BuyGo").classList.add("hidden"),e--),I&&(document.getElementById("AddFirstChild").classList.add("hidden"),e--),L&&(document.getElementById("AddFirstTask").classList.add("hidden"),e--),e>0&&document.getElementById("QuickStartGuide").classList.add("active")}function c(){return"undefined"!=typeof web3&&new Promise(function(e,t){web3.eth.getAccounts(function(n,a){n?t(n):(a=a.length>1?a[0]:a,e(a))})})}function d(e){return new Promise(function(t,n){web3.eth.getBalance(e,function(e,a){e?n(e):t(a)})})}function u(){return new Promise(function(e,t){var n=web3.eth.accounts[0];T.getParentsChildren.call(n,function(n,a){n?t(n):e(a)})})}function m(){var e=web3.eth.accounts[0];return new Promise(function(t,n){T.checkIfChild.call(e,function(e,a){e?n(e):t(a)})})}function y(){var e=web3.eth.accounts[0];return e="0x58A31d59965C7E06f7359DC034022dF66a290402",new Promise(function(t,n){T.getActiveTasksByChildAddress.call(e,function(e,a){e?n(e):t(a)})})}function p(e){var t=web3.eth.accounts[0];return new Promise(function(e,n){T.getReviewTasksByParentAddress.call(t,function(t,a){t?n(t):e(a)})})}function f(){var e=web3.eth.accounts[0];return new Promise(function(t,n){T.getActiveTasksByParentAddress.call(e,function(e,a){e?n(e):t(a)})})}function v(){var e=web3.eth.accounts[0];return new Promise(function(t,n){T.hasParentMadeTask.call(e,function(e,a){e?n(e):t(a)})})}function g(e){for(var t=e[0],n=e[1],a=0;a<n.length;a++)"0x0000000000000000000000000000000000000000000000000000000000000000"!==n[O]&&h(t[a],n[a])}function h(e,n){var a=document.getElementsByClassName("child-template");if(a.length){var s=a[0].cloneNode(!0);s.getElementsByClassName("child-name")[0].innerHTML=web3.toAscii(e).replace(/['"]+/g,""),s.getElementsByClassName("action-container")[0].setAttribute("data-child",n),s.classList.add("active"),s.onclick=function(e){var n=e.target.attributes[1].nodeValue;t(n)},document.getElementById("ChildrenContainer").appendChild(s)}}function b(){document.getElementById("NoWallet").classList.remove("active")}try{var w=(new Web3(web3.currentProvider||new Web3.providers.HttpProvider("https://testnet-rpc.gochain.io:443")),new Web3(new Web3.providers.HttpProvider("https://testnet-rpc.gochain.io:443"))),k=JSON.parse('[{"constant":false,"inputs":[{"name":"_creator","type":"address"}],"name":"getActiveTasksByParentAddress","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint128[]"},{"name":"","type":"uint128[]"},{"name":"","type":"uint128[]"},{"name":"","type":"address[]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_parent","type":"address"}],"name":"checkIfChild","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_taskId","type":"uint128"}],"name":"doCompleteTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_child","type":"address"}],"name":"addChild","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_creator","type":"address"}],"name":"hasParentMadeTask","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"getAllTasks","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint128[]"},{"name":"","type":"uint128[]"},{"name":"","type":"uint128[]"},{"name":"","type":"address[]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"Children","outputs":[{"name":"name","type":"bytes32"},{"name":"parentAddress","type":"address"},{"name":"childAddress","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_taskId","type":"uint128"}],"name":"doChangeTaskToReview","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_creator","type":"address"}],"name":"getReviewTasksByParentAddress","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint128[]"},{"name":"","type":"uint128[]"},{"name":"","type":"uint128[]"},{"name":"","type":"address[]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_taskId","type":"uint128"}],"name":"doRejectTaskToReview","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_value","type":"bytes32"},{"name":"_assignee","type":"address"},{"name":"_startDate","type":"uint128"},{"name":"_endDate","type":"uint128"},{"name":"_bounty","type":"uint128"}],"name":"addTask","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_parent","type":"address"}],"name":"getParentsChildren","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"address[]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"Tasks","outputs":[{"name":"value","type":"bytes32"},{"name":"creator","type":"address"},{"name":"assignee","type":"address"},{"name":"bounty","type":"uint128"},{"name":"startDate","type":"uint128"},{"name":"endDate","type":"uint128"},{"name":"useDecay","type":"bool"},{"name":"active","type":"bool"},{"name":"review","type":"bool"},{"name":"paid","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_assignee","type":"address"}],"name":"getActiveTasksByChildAddress","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint128[]"},{"name":"","type":"uint128[]"},{"name":"","type":"uint128[]"},{"name":"","type":"address[]"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]'),N=web3.eth.contract(k),C=w.eth.contract(k),B="0xf6dff18aD009bf814d98E3cF9c6189F9353AeEf2",E=N.at(B),T=C.at(B),A="Child",I=0,L=0;m().then(function(e){0==e&&(A="Parent",I=0,u().then(function(e){for(var t=e[1],n=e[0],a=0;a<n.length;a++)"0x0000000000000000000000000000000000000000"==t[a]&&(t.splice(a,1),n.splice(a,1));e=[n,t],n.length>0&&(g(e),I=1),v().then(function(e){L=e,l(A)})}))}),0==I?(p().then(function(e){var t=_slicedToArray(e,6),n=t[0],a=t[1],i=t[2],l=(t[3],t[4]);t[5];if(a.length>0){for(O=0;O<a.length;O++)if("0x0000000000000000000000000000000000000000000000000000000000000000"!==a[O]){var r=document.getElementsByClassName("reviewable-task");if(r.length){var c=r[0].cloneNode(!0),d=new Date(l[O]);c.getElementsByClassName("icon-container")[0].innerHTML="<span>"+i[O]+" GO</span>";var u=web3.toAscii(a[O])+'<div class="dueDate">Must Complete By: '+d+"</div>";c.getElementsByClassName("content")[0].innerHTML=u,c.getElementsByClassName("mark-task-as-completed")[0].dataset.taskid=n[O],c.getElementsByClassName("reject-task")[0].dataset.taskid=n[O],c.getElementsByClassName("reject-task")[0].onclick=function(e){e.preventDefault();var t=e.target.attributes[2].nodeValue;o(t).then(function(e){S.parentNode.parentNode.parentNode.removeChild(S.parentNode.parentNode)})},c.getElementsByClassName("mark-task-as-completed")[0].onclick=function(e){e.preventDefault();var t=e.target.attributes[2].nodeValue;s(t).then(function(e){S.parentNode.parentNode.parentNode.removeChild(S.parentNode.parentNode)})},c.classList.add("active"),document.getElementById("ReviewAbleTaskContainer").appendChild(c)}}}else console.log("no tasks for review.")}),f().then(function(e){var t=_slicedToArray(e,6),n=(t[0],t[1]),a=t[2];t[3],t[4],t[5];if(n.length>0){for(O=0;O<n.length;O++)if("0x0000000000000000000000000000000000000000000000000000000000000000"!==n[O]){var s=document.getElementsByClassName("parent-active-tasks")[0],o=s.cloneNode(!0);o.getElementsByClassName("task-bounty-value")[0].innerHTML=a[O]+" GO",o.getElementsByClassName("task-description-value")[0].innerHTML=web3.toAscii(n[O]),o.classList.add("active"),document.getElementById("ParentActiveTasksContainer").appendChild(o)}}else console.log("no tasks for review.")})):y().then(function(e){var t=_slicedToArray(e,6),n=t[0],s=t[1],o=t[2],i=(t[3],t[4]),l=t[5];if(s.length>0){for(O=0;O<s.length;O++)if("0x0000000000000000000000000000000000000000000000000000000000000000"!==s[O]){var r=document.getElementsByClassName("active-tasks");if(r.length){var c=r[0].cloneNode(!0),d=new Date(i[O]);c.getElementsByClassName("icon-container")[0].innerHTML="<span>"+o[O]+" GO</span>";var u=web3.toAscii(s[O])+'<div class="dueDate">Must Complete By: '+d+"</div>";c.getElementsByClassName("content")[0].innerHTML=u,c.getElementsByClassName("mark-task-for-review")[0].dataset.taskid=n[O],c.getElementsByClassName("mark-task-for-review")[0].dataset.childaddress=l[O],c.onclick=function(e){e.preventDefault();var t=e.target.attributes[3].nodeValue;a(t).then(function(e){console.log("marked for review..",e),S.parentNode.parentNode.parentNode.removeChild(S.parentNode.parentNode)})},c.classList.add("active"),document.getElementById("ChildTaskContainer").appendChild(c)}}}else console.log("no tasks for review.")})}catch(M){console.log("error loading web3.",M)}var D=0,P=0;"undefined"==typeof window.web3?console.error("Please use a web3 browser"):(b(),c().then(function(e){"undefined"==typeof e?console.log("no wallet."):(D=e[0],d(D).then(function(e){var t='<i class="fas fa-usd-circle"></i> '+web3.fromWei(e,"ether").toFixed(2)+" GO";w.fromWei(e,"ether").toFixed(2)>0&&(P=1),document.getElementById("GoBalance").innerHTML=t}))}));var _=document.getElementsByClassName("test-metamask");i(_,"","",function(){metaMaskAuth()});var R=document.getElementsByClassName("cancelChild");i(R,"remove","open",function(){document.getElementsByClassName("AddNewChild")[0].classList.remove("open"),document.getElementById("NewChild").classList.remove("active")});var G=document.getElementsByClassName("AddNewChild");i(G,"toggle","open",function(){document.getElementById("NewChild").classList.toggle("active")});var H=document.getElementsByClassName("addNewChildSubmit")[0];H.onclick=function(t){t.preventDefault();var n=document.getElementById("NewChildWalletAddress").value,a='"'+document.getElementById("NewChildNickname").value+'"';e(n,a)};var W=document.getElementById("AddNewTaskSubmit");W.onclick=function(e){console.log("you clicked submit new task");var t=document.getElementById("TaskChildAddress").value,a=web3.fromAscii(document.getElementById("TaskDescription").value),s=document.getElementById("TaskEndDate").value;s=new Date(s).getTime();var o=(new Date).getTime(),i=document.getElementById("TaskBounty").value,l=document.getElementById("TaskUseDecay").value===!0;n(t,a,o,s,i,l)};var x=document.getElementsByClassName("cancelTask");i(x,"remove","open",function(){document.getElementById("NewTask").classList.remove("active")});var F=document.getElementsByClassName("AddNewTask");F.length&&(F[0].onclick=function(e){var t=document.getElementsByClassName("cloneable");if(t.length){var n=t[0].cloneNode(!0);document.getElementById("TaskBlocks").appendChild(n)}});for(var j=document.getElementsByClassName("mark-task-as-completed"),O=0;O<j.length;O++){var S=j[O];S.onclick=function(e){e.preventDefault();var t=S.dataset.taskid;s(t).then(function(e){S.parentNode.parentNode.parentNode.removeChild(S.parentNode.parentNode)})}}for(var V=document.getElementsByClassName("mark-task-for-review"),O=0;O<V.length;O++){var S=V[O];S.onclick=function(e){e.preventDefault();var t=S.dataset.taskid;a(t).then(function(e){S.parentNode.parentNode.parentNode.removeChild(S.parentNode.parentNode)})}}for(var U=document.getElementsByClassName("reject-task"),O=0;O<U.length;O++){var S=U[O];S.onclick=function(e){e.preventDefault();var t=S.dataset.taskid,n=S.dataset.childaddress;o(t,n).then(function(e){S.parentNode.parentNode.parentNode.removeChild(S.parentNode.parentNode)})}}};