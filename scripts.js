let myLibrary = [];

function Book(author, title, numPages, hasRead) {
    this.author = author;
    this.title = title;
    this.numPages = numPages;
    this.hasRead = hasRead;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.numPages} pages, ` + (this.hasRead ? "read already" : "not read yet");
}

Book.prototype.addBookToLibrary = function() {
    myLibrary.push(this);
}

Book.prototype.toggleRead = function() {
    this.hasRead = !this.hasRead;
}

const harryPotter = new Book("JK Rowling", "Harry Potter: Prisoner of Azkaban", 300, true);
const breakfast = new Book("Kurt Vonnegut", "Breakfast of Champions", 250, false);

harryPotter.addBookToLibrary();
breakfast.addBookToLibrary();

function renderBooks() {
    const container = document.querySelector('.container');
    container.innerHTML = '';

    for (let book of myLibrary) {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        const authorP = document.createElement('p');
        authorP.classList.add('card-writing');
        authorP.textContent = book.author;

        const titleP = document.createElement('p');
        titleP.classList.add('card-writing');
        titleP.textContent = book.title;

        const numPagesP = document.createElement('p');
        numPagesP.classList.add('card-writing');
        numPagesP.textContent = book.numPages;

        const readP = document.createElement('p');
        readP.classList.add('card-writing');
        readP.textContent = book.hasRead ? "Read Already" : "Not read yet"; 

        const readCheck = document.createElement('input');
        readCheck.setAttribute('type', 'checkbox');
        readCheck.checked = book.hasRead;
        readCheck.addEventListener('change', (e) => {
            let childArray = Array.from(e.path[1].childNodes);
            let title = childArray[1].innerText;
            let index = myLibrary.map((e) => e.title).indexOf(title);
            myLibrary[index].toggleRead();
            renderBooks();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = "Remove";
        deleteBtn.addEventListener('click', (e) => {
            let childArray = Array.from(e.path[1].childNodes);
            let title = childArray[1].innerText;
            deleteBook(title);
        });


        bookCard.appendChild(authorP);
        bookCard.appendChild(titleP);
        bookCard.appendChild(numPagesP);
        bookCard.appendChild(readP);
        bookCard.appendChild(readCheck);
        bookCard.appendChild(deleteBtn);

        container.appendChild(bookCard);


    }
}



function deleteBook(title) {
    let index = myLibrary.map((e) => e.title).indexOf(title);
    myLibrary.splice(index,1);
    renderBooks();
}

renderBooks();

const form = document.querySelector('.book-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTitle = document.querySelector('#new-title');
    const newAuthor = document.querySelector('#new-author');
    const newPages = document.querySelector('#new-pages');
    const newHasRead = document.querySelector('#has-read');

    if (newTitle.value === '' || newAuthor.value === '' || newPages.value === '') {
        console.log("You tried to add a new book but one of the values was empty...");
        return;
    }

    let clientBook = new Book(newAuthor.value, newTitle.value, parseInt(newPages.value), newHasRead.checked);
    clientBook.addBookToLibrary();
    renderBooks();
});


// const submitBtn = document.querySelector('#submit-book-btn');
// submitBtn.addEventListener('click', (e) => {
//     console.log('yeah');


//     renderBooks();
// })
