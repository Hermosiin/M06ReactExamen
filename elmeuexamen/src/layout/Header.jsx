import  React  from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../userContext';
import { useContext } from 'react';
import './Header.css'


export default function Header() {
  let {usuari, setUsuari, idUser, setIdUser}=useContext(UserContext)

  const logout = async (e) => {
    e.preventDefault();
    setIdUser('');
    setUsuari('');
  };


  return (
    <>
      <div className='cabecera'>
        <div className='botones'>
          <Link to="/todos" >Todos </Link>
        </div>
        <p className='roles-name'> USER: {usuari} {idUser}
        </p>
        <button className='boton-logout'
          onClick={(e) => {
            logout(e);
          }}> Log Out 
        </button>
      </div>
      <hr />
    </>
  );
}