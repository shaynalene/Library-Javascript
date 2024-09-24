const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return title + ", " + author + ", " + pages + ", " + read;
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  console.table(myLibrary);

  displayLibrary();
}

function createButtonField(value, bookIndex) {
  const fieldContainer = document.createElement("div");
  fieldContainer.className = "fieldContainer";

  if (value === "Finished" || value === "Unfinished") {
    const readButton = document.createElement("button");
    readButton.className = "readButton";
    readButton.innerText = value;

    if (value === "Finished") {
      readButton.style.background = "#85ff81";
    } else {
      readButton.style.background = "#ff9090";
    }

    readButton.addEventListener("click", function (e) {
      myLibrary[bookIndex].read =
        myLibrary[bookIndex].read === "Finished" ? "Unfinished" : "Finished";

      readButton.innerText = myLibrary[bookIndex].read;

      if (myLibrary[bookIndex].read === "Finished") {
        readButton.style.background = "#85ff81";
      } else {
        readButton.style.background = "#ff9090";
      }
    });

    fieldContainer.appendChild(readButton);
  } else if (value == "Remove") {
    const removeButton = document.createElement("button");
    removeButton.className = "removeButton";
    removeButton.innerText = value;

    removeButton.addEventListener("click", function (e) {
      if (bookIndex > -1) {
        myLibrary.splice(bookIndex, 1);
        displayLibrary();
      }
    });

    fieldContainer.appendChild(removeButton);
  }

  return fieldContainer;
}

// Helper function to create an input-like field
function createInputField(label, value) {
  const fieldContainer = document.createElement("div");
  fieldContainer.className = "fieldContainer";

  const fieldLabel = document.createElement("label");
  fieldLabel.className = "fieldLabel";
  fieldLabel.innerText = label;

  const fieldValue = document.createElement("div");
  fieldValue.className = "fieldValue";
  fieldValue.innerText = value;

  fieldContainer.appendChild(fieldLabel);
  fieldContainer.appendChild(fieldValue);

  return fieldContainer;
}

const formdialog = document.querySelector("dialog");
const newbookbtn = document.querySelector("#showForm");
const closedialog = document.querySelector("dialog button");
const addbkform = document.getElementById("addbookform");

newbookbtn.addEventListener("click", function (e) {
  formdialog.showModal();
});

closedialog.addEventListener("click", () => {
  formdialog.close();
});

const addbookbtn = document.querySelector("#addbook");

addbookbtn.addEventListener("click", function (e) {
  const bookname = document.getElementById("Book").value;
  const bookauthor = document.getElementById("Author").value;
  const bookpages = document.getElementById("Page").value;
  let bookread = document.getElementById("Read");
  if (bookread.checked) {
    bookread = "Finished";
  } else {
    bookread = "Unfinished";
  }
  const newBook = new Book(bookname, bookauthor, bookpages, bookread);
  console.log(newBook.info());
  addBookToLibrary(newBook);
});

function displayLibrary() {
  const container = document.querySelector(".container");

  // Clear the container to prevent duplicate entries
  container.innerHTML = "";

  for (let i = 0; i < myLibrary.length; i++) {
    const archives = document.createElement("div");
    archives.className = "bookCard";

    // Create and style each property field
    const titleField = createInputField("Title", myLibrary[i].title);
    const authorField = createInputField("Author", myLibrary[i].author);
    const pageField = createInputField("Page", myLibrary[i].pages);
    const readField = createButtonField(myLibrary[i].read, i);
    const removeField = createButtonField("Remove", i);

    // Append the fields to the card
    archives.appendChild(titleField);
    archives.appendChild(authorField);
    archives.appendChild(pageField);
    archives.appendChild(readField);
    archives.appendChild(removeField);

    container.appendChild(archives);
  }
}
