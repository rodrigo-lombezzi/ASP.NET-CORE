import React from "react";
import "./Global.css";
import Login from "./compenets/Login/index"
import Alunos from "./compenets/Alunos";
import NovoAluno from "./compenets/NovoAluno";
import { BrowserRouter, Routes, Route} from "react-router-dom";

const App = () => { 
    return ( 
        <div className="App"> 
          <BrowserRouter> 
            <div className="container"> 
              <Routes> 
                <Route path="/" element={<Login />} /> 
                <Route path="/alunos" element={<Alunos />} /> 
                <Route path="/alunos/aluno/novo/:alunoId" element={<NovoAluno />} /> 
              </Routes> 
            </div> 
          </BrowserRouter>  
        </div> 
      ); 
} 

export default App 
