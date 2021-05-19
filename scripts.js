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

const harryPotter = new Book("JK Rowling", "Harry Potter: Prisoner of Azkaban", 300, true);
const breakfast = new Book("Kurt Vonnegut", "Breakfast of Champions", 250, false);

myLibrary.push(harryPotter);
myLibrary.push(breakfast);

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