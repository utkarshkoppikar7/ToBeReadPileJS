console.log("Working");
const url = localStorage.getItem('url');
const para = document.createElement('p');
let response = fetch(url);
para.innerText = response.text();
const body = document.querySelector('body');
body.appendChild(para);