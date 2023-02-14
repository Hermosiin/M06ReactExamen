import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from "../userContext";
import '../App.css'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function TodoEdit () {
    const { id } = useParams();
    let [formulari, setFormulari] = useState({});
    let { authToken,setAuthToken } = useContext(UserContext);
    let [error, setError] = useState("");
    let navigate = useNavigate();

    const handleChange = (e) => {
      e.preventDefault();
      setFormulari({
        ...formulari,
        [e.target.name] : e.target.value
      })
    };
    const getTodoEdit = async() =>{
      
      try{
        const data = await fetch("http://localhost:3004/todos/" + id, {
          headers: {
            'Accept': 'application/json',
          },
          method: "GET"

        })
        const resposta = await data.json();
          console.log(resposta)
          resposta.completed=resposta.completed ? 1 : 0;

          setFormulari({
            userId: resposta.userId,
            id: resposta.id,
            title: resposta.title,
            completed: resposta.completed,

          })

          
      }catch{
        console.log("Error");
        alert("catch");
      }

    }
    const editTodo = async(e) => {

      e.preventDefault();

      let {userId,title,completed}=formulari;
      console.log(formulari);

      try {
        const data = await fetch("http://localhost:3004/todos/" + id, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify({userId:new Number(userId), 
                                title: new String(title), 
                                completed:parseInt(completed)? true:false})
        })
        const resposta = await data.json();
        console.log(resposta);
        navigate("/todos/"+ id)
          
      }catch{
        console.log("Error");
        alert("catch");
      }

    }
    useEffect(() => {
      getTodoEdit();
      editTodo();


    }, [])
  return (
    <div>
      <h1>EDIT TODOS</h1>
      <form>
          <label>TITLE: </label>
          <input type="text" placeholder="Title" name="title" value = { formulari.title } onChange={handleChange}/>
          <br></br>
          <label>COMPLETED: </label>
          <select name="completed" onChange={handleChange} value={formulari.completed}>
            <option value="0">False</option>
            <option value="1">True</option>
          </select>
          <br></br>
          <button onClick={(e) => {editTodo(e);}}>Edit Todo</button>
      </form>
    </div>
  )
}