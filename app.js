
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

    const removeCardBtn = document.createElement('button');
    removeCardBtn.id = 'remove-card'
    removeCardBtn.textContent = 'X'
    removeCardBtn.addEventListener('click', () => {
        myLibrary.splice(num, 1);
        mainBoard.removeChild(div);
    })

    const pTitle = document.createElement('p');
    pTitle.className = 'title'
    pTitle.appendChild(document.createTextNode(`Title: ${myLibrary[num].title}`));

    const pAuthor = document.createElement('p');
    pAuthor.className = 'author'
    pAuthor.appendChild(document.createTextNode(`Author: ${myLibrary[num].author}`));

    const pPages = document.createElement('p');
    pPages.className = 'pages'
    pPages.appendChild(document.createTextNode(`Pages: ${myLibrary[num].pages}`));

    const readBtn = document.createElement('button');
    readBtn.id = 'read';
    if (myLibrary[num].read === true) {
        readBtn.textContent = 'Read'
    } else {
        readBtn.textContent = 'Not Read'
    }

    readBtn.addEventListener('click', () => {
        myLibrary[num].read = !myLibrary[num].read
        if (readBtn.textContent === "Read") {
            readBtn.textContent = "Not Read";
        } else { readBtn.textContent = "Read" };
    })

    div.appendChild(removeCardBtn);
    div.appendChild(pTitle);
    div.appendChild(pAuthor);
    div.appendChild(pPages);
    div.appendChild(readBtn);

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
}

for (let i = 0; i < myLibrary.length; i++) {
    addBookCardsToDisplay(i);
}