const myLibrary = [];

function Book(title, author, numPages, haveRead) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.haveRead = haveRead;
}

Book.prototype.info = function () {
  let message;
  if (this.haveRead) {
    message = "have read already";
  } else {
    message = "not read yet";
  }

  return `${this.title} by ${this.author}, ${this.numPages} pages, ${message}`;
};

function addBookToLibrary() {
  const title = prompt("What is the title of the book?");
  const author = prompt("Who is the author of the book?");
  const numPages = prompt("How many pages are in the book?");
  const haveReadInput = prompt("Have you read it already? Y/N");
  let haveRead;
  if (haveReadInput === "Y") {
    haveRead = true;
  } else {
    haveRead = false;
  }

  const toAppend = new Book(title, author, numPages, haveRead);

  myLibrary.push(toAppend);
}

function displayBooks() {
  myLibrary.forEach((e) => {
    e.info();
  });
}
