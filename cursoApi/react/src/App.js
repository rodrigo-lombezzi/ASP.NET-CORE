import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const baseUrl = "http://localhost:5012/api/alunos";
  const [data, setData] = useState([]);

  const pedidoGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    pedidoGet();
  }, );

  return (
    <div className="App">
      <br />
      <h3>Cadastro de aluno</h3>
      <header>
        <button className='btn btn-success'>Incluir novo aluno</button>
      </header>
      <h3>
        <table className="table table-bordered">
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
            {data.map(aluno => (
              <tr key={aluno.id}>
                <td>{aluno.id}</td>
                <td>{aluno.nome}</td>
                <td>{aluno.email}</td>
                <td>{aluno.idade}</td>
                <td>
                  <button className="btn btn-primary">Editar</button>
                  <button className="btn btn-danger">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </h3>
    </div>
  );
}

export default App;
