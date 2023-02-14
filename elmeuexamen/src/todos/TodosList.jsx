import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../userContext';
import './PlacesList.css';
import { TodoList } from './TodoList';



const TodosList = () => {
  let [ todos, setTodos] = useState([]);
  let { usuari, setUsuari, idUser, setIdUser } = useContext(UserContext)
  let [refresh,setRefresh] = useState(false)
  let [error, setError] = useState("");

  const getTodos = async (e) => {
      try {
  
        const data = await fetch("http://localhost:3004/todos", {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          method: "GET",
      })
        const resposta = await data.json();
        console.log(resposta);
          if (resposta == []){
            setError("No hi ha cap todo")

          }
          else{
            setTodos(resposta);
          console.log(todos);

          }

           

        
      } catch {
        console.log("Error");
        console.log("catch");
      }
    };

    //PRUEBA

    const completedTodo = async(e) => {

      e.preventDefault();

      try {
        const data = await fetch("http://localhost:3004/todos/" + id, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify({ 
                                completed:parseInt(completed)? true:false})
        })
        const resposta = await data.json();
        console.log(resposta);


          
      }catch{
        console.log("Error");
        alert("catch");
      }
    }

    const deleteTodo = async (e,id) =>{
      e.preventDefault();
      try{
        const data = await fetch("http://localhost:3004/todos/" + id, {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          method: "DELETE",
      })
  
        const resposta = await data.json();
        console.log(resposta);

          setRefresh(!refresh);
          console.log("Place eliminat correctament");
  
      }catch {

        console.log("catch");
      }
    }

    useEffect(()=>{
      getTodos();
  }, [refresh])

return (
  <>
  <div>TodosList</div>
  { error ? (<div className="error"> {error}</div>) : (<></>)}
  <div className="container">

    <table className="table">
      <thead>
        <tr>
          <th><h1>ID TODO</h1></th>
          <th><h1>ID USER</h1></th>
          <th><h1>TITLE</h1></th>
          <th><h1>COMPLETED</h1></th>
          <th colSpan={4}><h1>ACTIONS</h1></th>
        </tr>
      </thead>
      <tbody>
      {todos.map((todo) => ( 
          (<tr  key={todo.id}><TodoList todo={todo} deleteTodo={deleteTodo} completedTodo={completedTodo}/></tr>)
        ))}

      </tbody>
    </table>
  </div>
</>
)
}

export default TodosList