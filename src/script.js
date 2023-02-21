let myLibrary = []

function Book(title, author, numPages, haveRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.haveRead = haveRead;
}

Book.prototype.info = function () {

    let message;
    if (this.haveRead) {
        message = "have read already"
    }
    else {
        message = "not read yet"
    }

    console.log(`${this.title} by ${this.author}, ${this.numPages} pages, ${message}`);
}