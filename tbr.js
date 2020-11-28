const button = document.querySelector('.submitTBR');
const input = document.querySelector('.inputText');
const author = document.querySelector('.author');
const list = document.querySelector('.list');
let local=[];

button.addEventListener('click',addBook);
document.addEventListener('DOMContentLoaded',runLocal);

function addBook(event){
    event.preventDefault();

    const bookDiv = document.createElement('div');
    const book = document.createElement('li');
    const deleteB = document.createElement('button');
    const checkB = document.createElement('button');

    deleteB.classList.add('TBRButton');
    checkB.classList.add('TBRCheck');
    bookDiv.classList.add('TBRDiv');

    if(input.value === '' || author.value === ''){
        alert('The field must not be empty.');
        return;
    }

    const bookName = input.value +' by '+author.value; 
    book.innerText = bookName;
    saveBook(bookName);
    bookDiv.appendChild(book);

    deleteB.innerHTML='<i class="fa fa-times" aria-hidden="true"></i>';
    checkB.innerHTML='<i class="fa fa-check" aria-hidden="true"></i>';
    bookDiv.appendChild(checkB);
    bookDiv.appendChild(deleteB);
    list.appendChild(bookDiv);

    deleteB.addEventListener('click',remove);   
    checkB.addEventListener('click',check);
    input.value='';
    author.value='';
}

function remove(event){
    const bookB = event.target;
    const bookD = bookB.parentElement;
    console.log(bookD.innerText);
    let books;
    if(localStorage.getItem('books') === null){
        books=[];
    }
    else{
        books=JSON.parse(localStorage.getItem('books'));
    }

    for(i in books){
        if(books[i]==bookD.innerText){
            console.log(books[i]);
            books.splice(i,1);
            break;
        }
    }
    localStorage.setItem('books',JSON.stringify(books));
    bookD.remove();
}

function check(event){
    const bookB = event.target;
    const text=bookB.parentElement.children[0];
    text.classList.toggle('check');
}

function saveBook(book){
    let books;
    if(localStorage.getItem('books') === null){
        books=[];
    }
    else{
        books=JSON.parse(localStorage.getItem('books'));
    }
    books.push(book);
    localStorage.setItem('books',JSON.stringify(books));
}
function runLocal(){
    let books;
    if(localStorage.getItem('books') === null){
        books=[];
    }
    else{
        books=JSON.parse(localStorage.getItem('books'));
    }

    for (element in books){
        divLocal(books[element]);
    }
}
function divLocal(element){
    const bookDiv = document.createElement('div');
    const book = document.createElement('li');
    const deleteB = document.createElement('button');
    const checkB = document.createElement('button');

    deleteB.classList.add('TBRButton');
    checkB.classList.add('TBRCheck');
    bookDiv.classList.add('TBRDiv');
 
    book.innerText = element;
    bookDiv.appendChild(book);

    deleteB.innerHTML='<i class="fa fa-times" aria-hidden="true"></i>';
    checkB.innerHTML='<i class="fa fa-check" aria-hidden="true"></i>';
    bookDiv.appendChild(checkB);
    bookDiv.appendChild(deleteB);
    list.appendChild(bookDiv);

    deleteB.addEventListener('click',remove);   
    checkB.addEventListener('click',check);
 
}