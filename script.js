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

  const container = document.querySelector(".container");

  for (let i = 0; i < myLibrary.length; i++) {
    const archives = document.createElement("div");
    archives.className = "bookArchives";

    const booklist = document.createElement("p");

    booklist.innerText = `${myLibrary[i].title}: ${myLibrary[i].author}`;
    archives.appendChild(booklist);

    container.appendChild(archives);
  }
}

const addbookbtn = document.querySelector("#addbook");

addbookbtn.addEventListener("click", function (e) {
  const bookname = document.getElementById("Book").value;
  const bookauthor = document.getElementById("Author").value;
  const bookpages = document.getElementById("Page").value;
  const bookread = document.getElementById("Read").value;
  const newBook = new Book(bookname, bookauthor, bookpages, bookread);
  console.log(newBook.info());
  addBookToLibrary(newBook);
});
