import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../userContext';
import { useNavigate } from "react-router-dom";

export default function Todo () {
  const { id } = useParams();
  let { usuari, setUsuari, idUser, setIdUser } = useContext(UserContext)
  let [refresh,setRefresh] = useState(false)
  let [todo, setTodo] = useState({
    userId:"",
    id:"",
    title:"",
    completed:"",
  });
  let navigate = useNavigate();
  
  const getTodo = async () => {
    try{
      const data = await fetch("http://localhost:3004/todos/" + id, {
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        },
        method: "GET",
      })

      const resposta = await data.json();
      console.log(resposta);

        setTodo(resposta)
        console.log(resposta);


    }catch {
      console.log("Error");
      alert("catch")
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
        navigate("/todos")

    }catch {

      console.log("catch");
    }
  }

  useEffect(() => { getTodo();}, [refresh]);
  return (

    <div>
      <p>ID USER: {todo.userId}</p>
      <p>ID TODO: {todo.id}</p>
      <p>TITLE: {todo.title}</p>

      <p> COMPLETED: {todo.completed ?<span className='hecho'> Si</span> : <span className='nohecho'>No</span> }</p>

      {(idUser == todo.userId ) &&  
      <p><Link to={"/todos/edit/" +todo.id}><i className="bi bi-pencil-fill"></i></Link></p>}

      {(idUser == todo.userId ) && 
      <p><button onClick={(e) => { deleteTodo(e,todo.id); }}><i className="bi bi-trash3-fill"></i></button></p>}

    </div>

  )
}
