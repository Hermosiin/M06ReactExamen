import  React  from 'react';
import { Link } from 'react-router-dom';
import './Header.css'


export default function Footer() {
    
  return (
    <>
      <div className='footer'>
        <Link to="/coses">foot </Link>
        <Link to="/enlloc">Enlloc </Link>
        <Link to="/about">About </Link>
      </div>
      <hr />
    </>
  );
}
