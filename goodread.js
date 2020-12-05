console.log("Working");
const url = localStorage.getItem('url');
//const para = document.createElement('p');
fetch(url)
    .then(res => res.json())
    .then(data => console.log(data))
    .then(error => console.log(error))

/*
para.innerText = data;
const body = document.querySelector('body');
body.appendChild(para);*/