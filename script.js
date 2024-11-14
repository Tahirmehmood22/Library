
const dialog = document.querySelector("dialog");
const addBtn = document.querySelector(".add-button");
const includeBtn = document.querySelector(".include-button");
const closeBtn = document.querySelector(".close-button");
const form = document.querySelector("form");
const booksContainer = document.querySelector(".books-list-container");
let idCounter = 0;
let cardCounter = 0;
const myLibrary = [];

addBtn.addEventListener("click", () => {
  dialog.showModal();
});

includeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary();
});

closeBtn.addEventListener("click", () => {
  dialog.close();
});

function addBookToLibrary() {
  const title = document.querySelector("#book-name").value;
  const author = document.querySelector("#author-name").value;
  const pages = document.querySelector("#pages").value;
  const readStatus = document.querySelector("#read-status").value;

  if (form.checkValidity()) {
    const idCounter = new Book(title, author, pages, readStatus);

    myLibrary.push(idCounter);
    createCard();
    dialog.close();
  } else {
    form.reportValidity();
  }
}

function createCard() {
  const div = document.createElement("div");
  div.className = "card";

  booksContainer.appendChild(div);
  for (let i = 0; i < 3; i++) {
    const p = document.createElement("p");
    switch (i) {
      case 0:
        p.textContent = `Book: ${myLibrary[cardCounter].title}`;
        break;
      case 1:
        p.textContent = `Author: ${myLibrary[cardCounter].author}`;
        break;
      case 2:
        p.textContent = `Pages: ${myLibrary[cardCounter].pages}`;
        break;
    }
    div.appendChild(p);
  }
  const div1 = document.createElement("div");
  div1.className = "read-status-container";
  div.appendChild(div1);
  const p = document.createElement("p");
  p.className = "read-status";
  p.textContent = `${myLibrary[cardCounter].readStatus}`;
  div1.appendChild(p);
  const div2 = document.createElement("div");
  div2.className = "delete-button-container";
  div.appendChild(div2);
  const deleteBtn = document.createElement("i");
  deleteBtn.classList.add("fa-solid", "fa-trash", "delete-button");
  div2.appendChild(deleteBtn);
  cardCounter++;

  div1.addEventListener("click", () => {
    p.textContent = p.textContent === "Read" ? "Not Read" : "Read";
  });

  // delete btn

  deleteBtn.addEventListener("click", (e) => {
    console.log(e.target.parentElement.parentElement);
    const card = e.target.parentElement.parentElement;
    card.remove();
  });
}

function Book(title, author, pages, readStatus) {
  idCounter++;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

Book.prototype.info = function () {
  let readMessage =
    this.readStatus === "Read" ? "already read" : "not read yet";
  return `${this.title} by ${this.author}, ${this.pages}, ${readMessage}`;
};
