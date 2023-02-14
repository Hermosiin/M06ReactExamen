import React from 'react'
import './PlacesMenu.css';
import { Link } from 'react-router-dom';


function TodosMenu() {
  return (
    <>
    <div>Todos MENU</div>
    <div>
        <ul>
            <li><Link className="active" to="/todos/add">Afegir entrada</Link></li>
            <li><Link to="/todos">Llista</Link></li>
        </ul>
    </div>
    </>
  )
}

export default TodosMenu