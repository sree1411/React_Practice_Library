import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  let [books, setBooks] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/posts")
      .then((res) => {
        setBooks(res.data);
      })
      .catch();
  });

  return (
    <div className="App">
      <h1> hello people</h1>
      <ul id="box">
        {books.length >= 0 &&
          books.map((book) => (
            <li>
              <h4> id:{book.id}</h4>
              <h4> title:{book.title}</h4>
              <h4> author: {book.author}</h4>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
