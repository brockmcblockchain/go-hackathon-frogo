"use strict";window.onload=function(){function e(){console.log("meta mask!");var e=0;if("undefined"==typeof window.web3)console.error("Please use a web3 browser");else{var c=n();c&&t().then(function(n){console.log("mm-account",n),e=n,o(e).then(function(e){console.log("balance!",e)})})}}function n(){var e=new Web3(web3.currentProvider);return e.eth.defaultAccount=web3.eth.defaultAccount,e}function t(){return"undefined"!=typeof web3&&new Promise(function(e,n){web3.eth.getAccounts(function(t,o){t?n(t):e(o[0])})})}function o(e){return console.log("get balance"),new Promise(function(n,t){web3.eth.getBalance(e,function(e,o){e?t(e):n(o)})})}for(var c=document.getElementsByClassName("test-metamask"),l=0;l<c.length;l++){var a=c[l];a.onclick=function(n){n.preventDefault(),e()}}var u=document.getElementsByClassName("AddNewTask");u.length&&(u[0].onclick=function(e){e.preventDefault();var n=document.getElementsByClassName("cloneable");if(n.length){var t=n[0].cloneNode(!0),o=document.getElementsByClassName("blocks");o.length&&o[0].appendChild(t)}})};