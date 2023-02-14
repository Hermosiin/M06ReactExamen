import React, { useState, useContext } from 'react';
import { UserContext } from '../userContext';
import { useNavigate } from "react-router-dom";

export default function TodoAdd() {
  let [formulari, setFormulari] = useState({});
  let {usuari, setUsuari, idUser, setIdUser}=useContext(UserContext);
  let navigate = useNavigate();
  let [error, setError] = useState("");
  

  const handleChange = (e) => {
    e.preventDefault();
    setFormulari({
      ...formulari,
      [e.target.name] : e.target.value
    })
  };

  const sendTodo = async (e) => {
    e.preventDefault();
    let {userId=idUser,title,completed}=formulari;
    try {
      const data = await fetch("http://localhost:3004/todos", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({userId:new Number(userId), 
                              title: new String(title), 
                              completed:new Boolean(completed)})
      })
      const resposta = await data.json();
      console.log(resposta);
      navigate("/todos")

      // me falta poner el error de min 4 caracteres

      // setError("Minimo 4 caracteres para el title ")

        
    }catch{
      console.log("Error");
      // alert("catch");
    

    }
  }

  return <div>
            <h1>ADD TODOS</h1>
            <form>
                <label>TITLE: </label>
                <input type="text" minlength="4" placeholder="Title" name="title" onChange={handleChange}/>
                <br></br>
                <label>COMPLETED: </label>
                <select name="completed" onChange={handleChange} value={formulari.completed}>
                  <option value="false">False</option>
                  <option value="true">True</option>
                </select>
                <br></br>
                <div>{ error ? (<div className="error"> {error}</div>) : (<></>)}</div>
                <button onClick={(e) => {sendTodo(e);}}>Crear Todo</button>
                <button type="reset">Reset formulari</button>
            </form>
            
          </div>;
  }