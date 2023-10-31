
class Book {

    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

}


// Sample books

const book1 = new Book('Amrita', 'Banana Yoshimoto', 336, true);
const book2 = new Book('The Naked Ape', 'Desmond Morris', 256, true);
const book3 = new Book('Tao Te Ching', 'Lao Tzu', 107, false);

const myLibrary = [
    book1, book2, book3
];



const dialogController = (() => {
    const dialog = document.getElementById("dialog");
    const addBtn = document.getElementById("append");
    const dialogCloseBtn = document.getElementById("close");

    addBtn.addEventListener('click', () => {
        dialog.showModal();
    });

    dialogCloseBtn.addEventListener('click', () => {
        dialog.close();
    });

    return dialog

})();



const newBookController = (() => {

    const form = document.getElementById('form');
    const addToLibraryBtn = document.getElementById("add");

    addToLibraryBtn.addEventListener('click', (e) => {
        let checkStatus = form.checkValidity();

        if (checkStatus) {
            addBookToLibrary();
            displayController.addBookCardsToDisplay(myLibrary.length - 1);
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

        const bookNumber = `book${myLibrary.length + 1}`
        window[bookNumber] = new Book(titleInput, authorInput, pagesInput, readInput);
        myLibrary.push(window[bookNumber]);
    }

})();



const displayController = (() => {

    let mainBoard = document.getElementById('main')

    function addBookCardsToDisplay(num) {

        let div = document.createElement('div');
        div.id = `book${num + 1}`
        div.className = 'book'

        const removeCardBtn = document.createElement('button');
        removeCardBtn.id = 'remove-card'
        removeCardBtn.textContent = '✕'
        removeCardBtn.addEventListener('click', () => {
            const response = confirm("Are you sure you want to delete this book?");

            if (response) {
                myLibrary.splice(num, 1);
                mainBoard.removeChild(div);
            }
        })

        const pTitle = document.createElement('p');
        pTitle.className = 'title'
        const boldedTitle = document.createElement('strong');
        boldedTitle.innerHTML = `${myLibrary[num].title}`
        pTitle.appendChild(document.createTextNode('Title: '));
        pTitle.appendChild(boldedTitle);

        const pAuthor = document.createElement('p');
        pAuthor.className = 'author'
        const boldedAuthor = document.createElement('strong');
        boldedAuthor.innerHTML = `${myLibrary[num].author}`
        pAuthor.appendChild(document.createTextNode('Author: '));
        pAuthor.appendChild(boldedAuthor);

        const pPages = document.createElement('p');
        pPages.className = 'pages'
        const boldedPages = document.createElement('strong');
        boldedPages.innerHTML = `${myLibrary[num].pages}`
        pPages.appendChild(document.createTextNode('Pages: '));
        pPages.appendChild(boldedPages);

        const readBtn = document.createElement('button');
        readBtn.id = 'read';
        if (myLibrary[num].read === true) {
            readBtn.textContent = 'Read'
            readBtn.style.backgroundColor = '#9acb97';
        } else {
            readBtn.textContent = 'Not Read'
            readBtn.style.backgroundColor = '#fdc795';
        }

        readBtn.addEventListener('click', () => {
            myLibrary[num].read = !myLibrary[num].read

            if (readBtn.textContent === "Read") {
                readBtn.textContent = "Not Read";
                readBtn.style.backgroundColor = '#fdc795';
            } else {
                readBtn.textContent = "Read";
                readBtn.style.backgroundColor = '#9acb97';
            };
        })

        div.appendChild(removeCardBtn);
        div.appendChild(pTitle);
        div.appendChild(pAuthor);
        div.appendChild(pPages);
        div.appendChild(readBtn);

        mainBoard.insertBefore(div, mainBoard.firstChild);

    }

    return {
        addBookCardsToDisplay
    }

})();



// Initializer

for (let i = 0; i < myLibrary.length; i++) {
    displayController.addBookCardsToDisplay(i);
}

