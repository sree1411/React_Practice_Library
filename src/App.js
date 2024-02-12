import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  let [books, setBooks] = useState([])
  let [newbook, setNewBook] = useState({title:"", author:""})
  let [show, setShow] = useState(false)
  let [selectedBook, setSelectedBook] = useState(null) 
    
    useEffect(()=>{
      getBook()
    }, [])


  function getBook(){
    axios.get("http://localhost:8000/books").then((res)=>{
            setBooks(res.data);
       })
  }


  function addBook(){
   axios.post("http://localhost:8000/books", newbook).then(()=>{
        getBook()
        setNewBook({title:"", author:""})
   })
  }


  function deleteBook(id){
     axios.delete(`http://localhost:8000/books/${id}`).then(()=>{
      getBook()
     })
  }


  function editBook(book){
       setShow(true)
       setSelectedBook({...book})
  }


  function updateBook(){
    axios.put(`http://localhost:8000/books/${selectedBook.id}`, selectedBook).then(()=>{
      getBook()
      setShow(false)
    })
  }
  return (
    <div className="App">
      <h1>Hello people</h1>
       
         {
          !show && <div>
          <input type="text" placeholder="enter the author" value={newbook.author} onChange={(e)=>{setNewBook({...newbook, author:e.target.value})}}  />
           <br/>
          <input type="text" placeholder="enter the title"  value={newbook.title}    onChange={(e)=>{setNewBook({...newbook, title:e.target.value})}} />
          <br/>
          <button onClick={()=>{addBook()}}> Add Book </button>
          </div>
         }
         {
          show && <div>
          <input type="text" placeholder="enter the author" value={selectedBook.author} onChange={(e)=>{setSelectedBook({...selectedBook, author:e.target.value})}}  />
           <br/>
          <input type="text" placeholder="enter the title"  value={selectedBook.title}    onChange={(e)=>{setSelectedBook({...selectedBook, title:e.target.value})}} />
          <br/>
          <button onClick={()=>{updateBook()}}> Update Book</button>
          </div>
         }
  




      {
        books.length>0 && books.map((book, i)=>(
          <li className="booksname" key={i}>
                <h4> {book.id}. {book.author}</h4>
                <h3> {book.title}</h3>
                <button onClick={()=>{deleteBook(book.id)}}> Delete </button>
                <button onClick={()=>{editBook(book)}}> Edit </button>

          </li>
        ))
      }
    </div>
  );
}

export default App;
