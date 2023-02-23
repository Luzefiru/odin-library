/* New Book Form Logic */
const btnAddBook = document.querySelector(".nav__btn--add-book");
const formAddBook = document.querySelector("form");
const btnCloseForm = document.querySelector(".form__btn--close");

// opens the form window & blurs every other object
// TODO: disable button Add Book button when form window is open
btnAddBook.addEventListener("click", () => {
  formAddBook.classList.toggle("off");
  const allElements = document.querySelectorAll("body > *");
  allElements.forEach((e) => e.classList.toggle("blur"));
  formAddBook.classList.toggle("blur");
});

// closes the form window, not adding any cards
btnCloseForm.addEventListener("click", () => {
  formAddBook.classList.toggle("off");
  const allElements = document.querySelectorAll("body > *");
  allElements.forEach((e) => e.classList.toggle("blur"));
  formAddBook.classList.toggle("blur");
});

/* Card Logic */

const checkMark = document.querySelector(".card--book__have-read-check");

// toggles the "Have Read" check mark
checkMark.addEventListener("click", function () {
  this.classList.toggle("yes");
});

/* Book Object Code */

const myLibrary = [];
let lastID = 0;

function Book(id, title, author, numPages, haveRead) {
  this.id = id;
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

// creates a new Book object based on arguments and appends it to the Book array
function addBookToLibrary(id, title, author, numPages, haveRead) {
  const toAppend = new Book(id, title, author, numPages, haveRead);
  myLibrary.push(toAppend);
}

function displayBooks() {
  myLibrary.forEach((e) => {
    e.info();
  });
}

/* Add Book Form Submit logic */

const submitForm = document.querySelector("form");
const btnSubmitForm = document.querySelector(".form__btn--submit");

function createBookCard(id, title, author, pages, read) {
  const newCard = document.createElement('div');
  newCard.setAttribute("class", "main__card card--book");

  const cardId = document.createElement('p');
  cardId.setAttribute("class", "card--book__id");
  cardId.textContent = id;
  newCard.appendChild(cardId);

  const cardTitle = document.createElement('p');
  cardTitle.setAttribute("class", "card--book__title");
  cardTitle.textContent = title;
  newCard.appendChild(cardTitle);

  const cardAuthor = document.createElement('p');
  cardAuthor.setAttribute("class", "card--book__author");
  cardAuthor.textContent = `by ${author}`;
  newCard.appendChild(cardAuthor);

  const cardPages = document.createElement('p');
  cardPages.setAttribute("class", "card--book__pages");
  cardPages.textContent = `${pages} pages`;
  newCard.appendChild(cardPages);

  const main = document.querySelector("main");
  main.appendChild(newCard);
}

// creates a new card based on form input and appends it to the document
submitForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevents type="submit" <button> tags from defaulting to refreshing the page for form submissions

  const titleInput = document.querySelector("#title").value;
  const authorInput = document.querySelector("#author").value;
  const pagesInput = document.querySelector("#pages").value;
  const readInput = document.querySelector("#read").checked;

  console.log(titleInput, authorInput, pagesInput, readInput); // debug

  // increments lastID for unique primary key
  lastID += 1;
  const id = lastID;

  addBookToLibrary(id, titleInput, authorInput, pagesInput, readInput);

  console.log(myLibrary); // debug

  createBookCard(id, titleInput, authorInput, pagesInput, readInput);
});