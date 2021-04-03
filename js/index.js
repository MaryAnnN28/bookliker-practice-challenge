let like = true

document.addEventListener("DOMContentLoaded", () => {
  fetchBooks()
});

const fetchBooks = () => {
  fetch('http://localhost:3000/books')
    .then(resp => resp.json())
    .then(books => books.forEach(renderList))
}

const renderList = (book) => {
  const bookList = document.getElementById('list')

  let bookObj = document.createElement('li')
      bookObj.innerText = book.title
      bookObj.addEventListener('click', () => renderBook(book))

  bookList.appendChild(bookObj)
}

const renderBook = (book) => {
  let bookContainer = document.getElementById("show-panel")
      bookContainer.innerText = ""

  let bookImg = document.createElement('img')
      bookImg.src = book.img_url
  
  let bookTitle = document.createElement('h2')
      bookTitle.innerText = book.title
  
  let subtitle = document.createElement('h4')
      subtitle.innerText = book.subtitle
  
  let bookAuthor = document.createElement('h4')
      bookAuthor.innerText = book.author
  
  let bookDesc = document.createElement('p')
      bookDesc.innerText = book.description
  
  let usersList = document.createElement('ul')
    
    book.users.forEach(user => {
        let li = document.createElement('li')
        li.innerText = user.username
      usersList.append(li)
    })
  
  let button = document.createElement('button')
  like? button.innerText = "Like" : button.innerText = "Unlike"
  button.addEventListener('click', () => likeBook(book, button))
  
  bookContainer.append(bookImg, bookTitle, subtitle, bookAuthor, bookDesc, usersList, button)
  
};

const likeBook = (book) => {
  let likeObj

  if (like) {
    const currentUser = { "id": 1, "username": "pouros" }
    book.users.push(currentUser)
    likeObj = { "users": book.users }
    like = false
  } else {
    like = true
    book.users.pop()
    likeObj = {"users": book.users}
  }

  const reqPack = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(likeObj)
  }

  fetch(`http://localhost:3000/books/${book.id}`, reqPack)
    .then(resp => resp.json())
    .then(book => renderBook(book))
}