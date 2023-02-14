import React, { useContext, useState} from 'react'
import '../App.css'
import { UserContext } from '../userContext'
import { Link } from 'react-router-dom'

export const TodoList = ({todo,deleteTodo}) => {
  let { usuari, setUsuari, idUser, setIdUser } = useContext(UserContext)

  return (
    <>
      <td>{todo.id}</td>
      <td>{todo.userId}</td>
      <td>{todo.title}</td>
      {todo.completed ? 
      <td>Si</td> : <td>No</td>}

      <td><Link to={"/todos/" +todo.id}> <i className="bi bi-eye-fill"></i></Link></td>

      {(idUser == todo.userId ) &&  
      <td><Link to={"/todos/edit/" +todo.id}><i className="bi bi-pencil-fill"></i></Link></td>}

      {(idUser == todo.userId ) && 
      <td><button onClick={(e) => { deleteTodo(e,todo.id); }}><i className="bi bi-trash3-fill"></i></button></td>}
      



    </>
  )
}
