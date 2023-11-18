"use strict";

const container = document.querySelector(".container");
let ID = 0;
let isAddSucceeded = false;
setup();

function setup() {
  setupAddButton();
  setupContainer();
}

function setupAddButton() {
  const addButton = document.getElementById("add");
  addButton.addEventListener("click", () => {
    ID = `textArea${localStorage.length}`;
    isAddSucceeded = true;
    setupNote(ID);
  });
}

function setupContainer() {
  Object.keys(localStorage).forEach((key) => {
    setupNote(key);
  });
}

function setupNote(id) {
  setupCard(id);
  setupTextarea();
  setupDeleteButton();
}

function setupCard(id) {
  if (isAddSucceeded && localStorage.length !== 0) {
    const table = Object.keys(localStorage).sort();
    id = "textArea" + (parseInt(table[table.length - 1].slice(8)) + 1);
  }
  const card = `
  <div class="card">
  <span class="icon">
      <i class="fa-solid fa-xmark"></i>
  </span>
  <p class="note">
      <textarea
      name="${id}"
      id="${id}"
      cols="30"
      rows="10"
      placeholder="write your note here..."
      >${localStorage.getItem(id) ?? ""}</textarea>
  </p>
  </div>`;
  container.innerHTML += card;
  isAddSucceeded = false;
}

function setupTextarea() {
  const textAreas = document.querySelectorAll(`textarea`);
  textAreas.forEach((textArea) => {
    textArea.addEventListener("keyup", () => {
      if (localStorage.getItem(textArea.id) !== null)
        localStorage.removeItem(textArea.id);
      localStorage.setItem(textArea.id, textArea.value);
    });
  });
}

function setupDeleteButton() {
  const deleteButtons = document.querySelectorAll(".card .icon");
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", () => {
      container.removeChild(deleteButton.parentNode);
      localStorage.removeItem(
        deleteButton.parentNode.lastElementChild.lastElementChild.id
      );
    });
  });
}
