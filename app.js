
// Preview Books

const book1 = new Book('Amrita', 'Banana Yoshimoto', 336, true);
const book2 = new Book('The Naked Ape', 'Desmond Morris', 256, true);
const book3 = new Book('Tao Te Ching', 'Lao Tzu', 107, false);

const myLibrary = [
    book1, book2, book3
];



// Book Object

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}



// Displaying books on mainboard

let mainBoard = document.getElementById('main')


function addBookCardsToDisplay(num) {

    let div = document.createElement('div');
    div.id = `book${num + 1}`
    div.className = 'book'

    const p1 = document.createElement('p');
    p1.className = 'title'
    p1.appendChild(document.createTextNode(`Title: ${myLibrary[num].title}`));

    const p2 = document.createElement('p');
    p2.className = 'author'
    p2.appendChild(document.createTextNode(`Author: ${myLibrary[num].author}`));

    const p3 = document.createElement('p');
    p3.className = 'pages'
    p3.appendChild(document.createTextNode(`Pages: ${myLibrary[num].pages}`));

    const isRead = document.createElement('p');
    isRead.className = 'read'
    if (myLibrary[num].read === true) {
        isRead.appendChild(document.createTextNode("Read"));
    } else {
        isRead.appendChild(document.createTextNode("Not read"));
    }

    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);
    div.appendChild(isRead);

    mainBoard.insertBefore(div, mainBoard.firstChild);

}


// Buttons

const dialogCloseBtn = document.getElementById("close");
const confirmBtn = document.getElementById("confirm");
const appendBtn = document.getElementById("append");



// Opening & Closing dialog

const dialog = document.getElementById("dialog");

appendBtn.addEventListener('click', () => {
    dialog.showModal();
});

dialogCloseBtn.addEventListener('click', () => {
    dialog.close();
});



// Add book to the library

const form = document.getElementById('form');

confirmBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let checkStatus = form.checkValidity();

    if (checkStatus) {
        addBookToLibrary();
        addBookCardsToDisplay(myLibrary.length - 1);
        dialog.close();
    } else {
        form.reportValidity();
    }
})

function addBookToLibrary() {

    const titleInput = document.getElementById('book-title').value;
    const authorInput = document.getElementById('book-author').value;
    const pagesInput = document.getElementById('book-pages').value;
    const readInput = document.getElementById('book-read').checked;

    const bookString = `book${myLibrary.length + 1}`
    window[bookString] = new Book(titleInput, authorInput, pagesInput, readInput)
    myLibrary.push(window[bookString]);
    console.log(myLibrary);
}

for (let i = 0; i < myLibrary.length; i++) {
    addBookCardsToDisplay(i);
}