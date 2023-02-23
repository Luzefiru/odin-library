/* New Book Form Logic */
const btnAddBook = document.querySelector(".nav__btn--add-book");
const formAddBook = document.querySelector("form");
const btnCloseForm = document.querySelector(".form__btn--close");
const submitForm = document.querySelector("form");
const btnSubmitForm = document.querySelector(".form__btn--submit");

// creates a new card based on form input and appends it to the document
submitForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const titleInput = document.querySelector("#title").value;
  const authorInput = document.querySelector("#author").value;
  const pagesInput = document.querySelector("#pages").value;
  const readInput = document.querySelector("#read").checked;

  console.log(titleInput, authorInput, pagesInput, readInput);

  
});

// opens the form window & blurs every other object
// TODO: disable button Add Book button when form window is open
btnAddBook.addEventListener('click', () => {
  formAddBook.classList.toggle('off');
  const allElements = document.querySelectorAll("body > *");
  allElements.forEach((e) => e.classList.toggle('blur'));
  formAddBook.classList.toggle('blur');
});

// closes the form window, not adding any cards
btnCloseForm.addEventListener('click', () => {
  formAddBook.classList.toggle('off');
  const allElements = document.querySelectorAll("body > *");
  allElements.forEach((e) => e.classList.toggle('blur'));
  formAddBook.classList.toggle('blur');
});

/* Card Logic */

const checkMark = document.querySelector(".card--book__have-read-check");

// toggles the "Have Read" check mark
checkMark.addEventListener("click", function () {
  this.classList.toggle("yes");
});

/* Book Object Code */

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
