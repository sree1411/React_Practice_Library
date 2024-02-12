import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  let [books, setBooks] = useState([]);
  let [show, setShow] = useState(false);
  let [newbook, setNewBook] = useState({ title: "", author: "" });
  let [textbook, setTextBook] = useState(null);

  useEffect(() => {
    getBooks();
  }, []);

  function addBook() {
    axios.post("http://localhost:8000/posts", newbook)
      .then(() => {
        getBooks();
      })
      .catch(error => {
        console.error("Error adding book:", error);
      });
  }

  function getBooks() {
    axios.get("http://localhost:8000/posts")
      .then((res) => {
        setBooks([...res.data]);
      })
      .catch(error => {
        console.error("Error fetching books:", error);
      });
  }

  function deleteBook(id) {
    axios.delete("http://localhost:8000/posts/" + id)
      .then(() => {
        getBooks();
      })
      .catch(error => {
        console.error("Error deleting book:", error);
      });
  }

  function editBook(book) {
    setTextBook({ ...book });
    setShow(true);
  }

  function updateBook() {
    axios.put("http://localhost:8000/posts/" + textbook.id, textbook)
      .then(() => {
        getBooks();
        setShow(false);
      })
      .catch(error => {
        console.error("Error updating book:", error);
      });
  }

  return (
    <div className="App">
      <h1>hello people</h1>
      {!show && (
        <div>
          <input type="text" placeholder="enter the author" onChange={(e) => { setNewBook({ ...newbook, author: e.target.value }) }} />
          <input type="text" placeholder="enter the title" onChange={(e) => { setNewBook({ ...newbook, title: e.target.value }) }} />
          <button onClick={addBook}>Add Book</button>
        </div>
      )}
      {show && (
        <div>
          <input type="text" placeholder="enter the author" value={textbook.author} onChange={(e) => { setTextBook({ ...textbook, author: e.target.value }) }} />
          <input type="text" placeholder="enter the title" value={textbook.title} onChange={(e) => { setTextBook({ ...textbook, title: e.target.value }) }} />
          <button onClick={updateBook}>Update Book</button>
        </div>
      )}
      <ul id="box">
        {books.map((book, index) => (
          <li key={book.id}>
            <h4>id: {book.id}</h4>
            <h4>title: {book.title}</h4>
            <h4>author: {book.author}</h4>
            <button onClick={() => { deleteBook(book.id) }}>Delete</button>
            <button onClick={() => { editBook(book) }}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
