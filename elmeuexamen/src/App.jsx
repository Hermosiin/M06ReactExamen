import "./style.css"
import React, {useState} from 'react'
import LoginRegister  from './auth/LoginRegister';
import { UserContext } from "./userContext";
import { Routes, Route } from "react-router-dom";
import NotFound from "./NotFound";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

import TodosList from "./todos/TodosList";
import TodosMenu from "./todos/TodosMenu";
import TodoAdd from "./todos/TodoAdd";
import Todo from "./todos/Todo";

import TodoEdit from "./todos/TodoEdit";


export default function App() {
  let [usuari, setUsuari] = useState("");
  let [idUser, setIdUser] = useState("");

  return (
    <>
      <UserContext.Provider value= { { usuari, setUsuari, idUser, setIdUser }}>
        {usuari ? (
          <>
            <Header />
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/todos/add" element={<> <TodosMenu/><TodoAdd /> </>} />
              <Route path="/todos/:id" element={<> <TodosMenu/><Todo /> </>} />
              <Route path="/todos/edit/:id" element={<> <TodosMenu/><TodoEdit /> </>} />


              <Route path="/todos" element={<> <TodosMenu/><TodosList /> </>} />
              <Route path="/" element={<> <TodosMenu/><TodosList /> </>} />

            </Routes>
            <Footer />
          </>
        ) : (
          <LoginRegister />
        )}
      </UserContext.Provider>
    </>
  );
}
