const booksURL = "http://localhost:3000/books"


document.addEventListener("DOMContentLoaded", function () {
  fetchBooks()
});

let books = []

const fetchBooks = () => {
  fetch(booksURL)
    .then((resp) => resp.json())
    .then((books) => {
      books.forEach((book) => renderList(book))
    })
}

const renderList = (book) => {
  let bookList = document.querySelector('#list')

  let bookObj = document.createElement('li')
      bookObj.innerText = book.title
      bookObj.addEventListener("click", () => 
        renderBook(book))

  bookList.append(bookObj)

}

const renderBook = (book) => {
  let bookImg = document.getElementById('book-img')
      bookImg.src = book.img_url
  
  let bookTitle = document.getElementById('book-title')
      bookTitle.innerText = book.title 
  
  let bookSubtitle = document.getElementById('book-subtitle')
      bookSubtitle.innerText = book.subtitle
  
  let bookAuthor = document.getElementById('book-author')
      bookAuthor.innerText = book.author
  
  let bookDesc = document.getElementById('book-description')
  bookDesc.innerText = book.description
  
  let usersList = document.getElementById('users-list')
    usersList.innerText = book.users.map(user => {
   return `<li>${user.username}</li>`
  })
  return usersList
  
}