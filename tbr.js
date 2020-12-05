const button = document.querySelector('.submitTBR');
const input = document.querySelector('.inputText');
const author1 = document.querySelector('.author');
const list = document.querySelector('.list');

button.addEventListener('click',addBook);
document.addEventListener('DOMContentLoaded',runLocal);

function addBook(event){
    event.preventDefault();
    window.scrollBy(0,window.innerHeight+100);

    const bookDiv = document.createElement('div');
    const book = document.createElement('li');
    const deleteB = document.createElement('button');
    const checkB = document.createElement('button');
    const link = document.createElement('button');

    deleteB.classList.add('TBRButton');
    checkB.classList.add('TBRCheck');
    bookDiv.classList.add('TBRDiv');
    link.classList.add('Link');

    if(input.value === '' || author1.value === ''){
        alert('The field must not be empty.');
        return;
    }

    const bookName = input.value +' by '+author1.value; 
    book.innerText = bookName;
    saveBook(bookName);
    bookDiv.appendChild(book);

    //?Good reads API requests
    let url = "https://www.goodreads.com/book/title.json";
    let param ="?author="+author1.value+"&key=uzyY7MDzUPxwxlgR05W3ZQ&title="+input.value;
    param=param.replace(" ","+")
    url=url+param

    //! Add a proper API Page 
    //! Right now just linking the GoodReads page


    //?Other code
    deleteB.innerHTML='<i class="fa fa-times" aria-hidden="true"></i>';
    checkB.innerHTML='<i class="fa fa-check" aria-hidden="true"></i>';
    link.innerHTML='<i class="fa fa-link" aria-hidden="true"></i>';

    bookDiv.appendChild(checkB);
    bookDiv.appendChild(deleteB);
    bookDiv.appendChild(link);
    list.appendChild(bookDiv);

    deleteB.addEventListener('click',remove);   
    checkB.addEventListener('click',check);
    
    input.value='';
    author1.value='';
    link.addEventListener('click',function(){
        localStorage.setItem('url',url);
        window.open('page1.html','_blank');
    });
}

function remove(event){
    const bookB = event.target;
    const bookD = bookB.parentElement;
    let books,checkList;
    if(localStorage.getItem('books') === null){
        books=[];
        checkList=[];
    }
    else{
        books=JSON.parse(localStorage.getItem('books'));
        checkList=JSON.parse(localStorage.getItem('checkList'));
    }

    for(i in books){
        if(books[i]==bookD.innerText){
            books.splice(i,1);
            checkList.splice(i,1);
            break;
        }
        
    }
    localStorage.setItem('books',JSON.stringify(books));
    localStorage.setItem('checkList',JSON.stringify(checkList));
    bookD.remove();
}

function check(event){
    const bookB = event.target;
    const text=bookB.parentElement.children[0];
    text.classList.toggle('check');
    let books,checkList;
    if(localStorage.getItem('books') === null){
        books=[];
        checkList=[];
    }
    else{
        books=JSON.parse(localStorage.getItem('books'));
        checkList=JSON.parse(localStorage.getItem('checkList'));
    }
    for(let i=0;i<books.length;i++){
        if(books[i] == text.innerText){
            console.log(books[i]);
            if(checkList[i]){
                checkList[i] = false;
            }
            else{
                checkList[i] = true;
            }
        }
    }
    localStorage.setItem('checkList',JSON.stringify(checkList));
}

function saveBook(book){
    let books,checkList;
    if(localStorage.getItem('books') === null){
        books=[];
        checkList=[];
    }
    else{
        books=JSON.parse(localStorage.getItem('books'));
        checkList=JSON.parse(localStorage.getItem('checkList'));
    }
    books.push(book);
    checkList.push(false);
    localStorage.setItem('books',JSON.stringify(books));
    localStorage.setItem('checkList',JSON.stringify(checkList));
}
function runLocal(){
    let books,checkList;
    if(localStorage.getItem('books') === null){
        books=[];
        checkList=[];
    }
    else{
        books=JSON.parse(localStorage.getItem('books'));
        checkList=JSON.parse(localStorage.getItem('checkList'));
    }
    console.log(books.length);
    console.log(checkList.length);
    for (let i=0;i<books.length;i++){
        divLocal(books[i],checkList[i]);
    }
}
function divLocal(element,num){
    const bookDiv = document.createElement('div');
    const book = document.createElement('li');
    const deleteB = document.createElement('button');
    const checkB = document.createElement('button');
    const link = document.createElement('button');

    deleteB.classList.add('TBRButton');
    checkB.classList.add('TBRCheck');
    bookDiv.classList.add('TBRDiv');
    link.classList.add('Link');
 
    book.innerText = element;
    bookDiv.appendChild(book);

    deleteB.innerHTML='<i class="fa fa-times" aria-hidden="true"></i>';
    checkB.innerHTML='<i class="fa fa-check" aria-hidden="true"></i>';
    link.innerHTML='<i class="fa fa-link" aria-hidden="true"></i>';

    bookDiv.appendChild(checkB);
    bookDiv.appendChild(deleteB);
    bookDiv.appendChild(link);
    list.appendChild(bookDiv);

    if(num){
        book.classList.toggle('check');       
    }

    let url = "https://www.goodreads.com/book/title.json";
    let param ="?author="+author1.value+"&key=uzyY7MDzUPxwxlgR05W3ZQ&title="+input.value;
    param=param.replace(" ","+")
    url=url+param

    deleteB.addEventListener('click',remove);   
    checkB.addEventListener('click',check);
    
    link.addEventListener('click',function(){
        window.open(url,'_blank');
        });
}