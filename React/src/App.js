import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import React , { useState, useEffect } from 'react';
import Cadastro from './assets/cadastro.png';

function App() {
  
  const baseUrl = "http://localhost:5012/api/alunos";
  const [data, setData] = useState([]);
  const [modalIncluir,setModalIncluir] = useState(false);
  const [alunoSelecionado,setAlunoSelecionado] = useState(
    {
    id: '',
    nome: '',
    email: '',
    idade: ''
    }
  )

  const abrirFecharModalIncluir=()=>{
    setModalIncluir(!modalIncluir);
  }

  const handleChange=e=>{
    const {name, value} = e.target;
    setAlunoSelecionado({
      ...alunoSelecionado,
      [name]: value
    });
    console.log(alunoSelecionado);
  }
  const pedidoGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      });
  };

  const pedidoPost=async()=>{
    delete alunoSelecionado.id;
    alunoSelecionado.idade=parseInt(alunoSelecionado.idade);
      await axios.post(baseUrl, alunoSelecionado)
      .then(response=>{
        setData(data.concat(response.data));
        abrirFecharModalIncluir();
      }).catch(error=>{
        console.log(error);
      })
  }

  useEffect(() => {
    pedidoGet();
  });

  return (
    <div className="aluno-container">
      <br />
      <h3>Cadastro de Alunos</h3>
      <header>
        <img src={Cadastro} alt="Cadastro" />
        <button className='btn btn-success' onClick={()=>abrirFecharModalIncluir()}>Incluir Novo Aluno</button>
      </header>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Idade</th>
            <th>Operação</th>
          </tr>
        </thead>
        <tbody>
          {data.map(aluno=>(
            <tr key={aluno.id}>
              <td>{aluno.id}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>{aluno.idade}</td>
              <td>
                <button className='btn btn-primary'>Editar</button>{"  "}
                <button className='btn btn-danger'>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={modalIncluir}>
            <ModalHeader>Incluir alunos</ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label>Nome: </label>  
                <br/>
                <input type="text" className="form-control" name="nome" onChange={handleChange}/>
                <br/>  
                <label>Email: </label>  
                <input type="text" className="form-control" name="email" onChange={handleChange}/>
                <br/>
                <label>Idade: </label>
                <input type="text" className="form-control" name="idade" onChange={handleChange} />
                <br/>  
              </div>  
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-primary" onClick={()=>pedidoPost()}>Incluir</button> {"  "}
              <button className="btn btn-danger" onClick={()=>abrirFecharModalIncluir()}>Excluir</button>
            </ModalFooter>
        </Modal>

    </div>
  );
  
}

export default App;