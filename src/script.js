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
  const newCard = document.createElement("div");
  newCard.setAttribute("class", "main__card card--book");

  const cardId = document.createElement("p");
  cardId.setAttribute("class", "card--book__id");
  cardId.textContent = id;
  newCard.appendChild(cardId);

  const cardTitle = document.createElement("p");
  cardTitle.setAttribute("class", "card--book__title");
  cardTitle.textContent = title;
  newCard.appendChild(cardTitle);

  const cardAuthor = document.createElement("p");
  cardAuthor.setAttribute("class", "card--book__author");
  cardAuthor.textContent = `by ${author}`;
  newCard.appendChild(cardAuthor);

  const cardPages = document.createElement("p");
  cardPages.setAttribute("class", "card--book__pages");
  cardPages.textContent = `${pages} pages`;
  newCard.appendChild(cardPages);

  // adds the ".yes" class if the book has been read
  const haveRead = read ? " yes" : "";

  // adds the check button
  newCard.innerHTML += `<svg class="card--book__have-read-check${haveRead}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0.41,13.41L6,19L7.41,17.58L1.83,12M22.24,5.58L11.66,16.17L7.5,12L6.07,13.41L11.66,19L23.66,7M18,7L16.59,5.58L10.24,11.93L11.66,13.34L18,7Z" /></svg>`;

  // adds the remove button
  newCard.innerHTML += `<a href="#" class="close"></a>`;

  const main = document.querySelector("main");
  main.appendChild(newCard);
}

// selects all check box icons and enables functionality
function scanAndEnableButtons() {
  const checkMarks = document.querySelectorAll(".card--book__have-read-check");
  const closeIcons = document.querySelectorAll(".close");

  // toggles the "Have Read" check mark
  checkMarks.forEach((e) => {
    e.addEventListener("click", function () {
      this.classList.toggle("yes");
      const id = e.parentElement.firstChild.textContent;
      myLibrary.find((book) => book.id === Number(id)).haveRead =
        !myLibrary.find((book) => book.id === Number(id)).haveRead;
    });
  });

  // deletes the book from myLibrary and removes the card
  closeIcons.forEach((e) => {
    e.addEventListener("click", () => {
      const id = e.parentElement.firstChild.textContent;

      myLibrary.splice(
        myLibrary.indexOf(myLibrary.find((book) => book.id === Number(id))),
        1
      );

      e.parentElement.parentElement.removeChild(e.parentElement);
    });
  });
}

// creates a new card based on form input and appends it to the document
submitForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevents type="submit" <button> tags from defaulting to refreshing the page for form submissions

  const titleInput = document.querySelector("#title").value;
  const authorInput = document.querySelector("#author").value;
  const pagesInput = document.querySelector("#pages").value;
  const readInput = document.querySelector("#read").checked;

  // increments lastID for unique primary key
  lastID += 1;
  const id = lastID;

  addBookToLibrary(id, titleInput, authorInput, pagesInput, readInput);

  createBookCard(id, titleInput, authorInput, pagesInput, readInput);

  // resets form fields
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";
  document.querySelector("#read").checked = false;

  // turns form off
  formAddBook.classList.toggle("off");
  const allElements = document.querySelectorAll("body > *");
  allElements.forEach((node) => node.classList.toggle("blur"));
  formAddBook.classList.toggle("blur");

  scanAndEnableButtons();
});
