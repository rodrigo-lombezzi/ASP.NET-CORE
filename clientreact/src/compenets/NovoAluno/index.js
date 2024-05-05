import React from "react";
import './styles.css';
import { FiCornerDownLeft, FiUserPlus } from "react-icons/fi"; 
import { Link , useParams} from 'react-router-dom';

export default function NovoAluno() {
    const { alunoId } = useParams();
    return (
        <div className="novo-aluno-container">
            <div className="content">
                <h1>Texto</h1>
                <section className="form">
                    <FiUserPlus size="105" color="#17202a" aria-label="Ícone de Adicionar Novo Aluno" />
                    <h1>{alunoId === '0' ? 'Incluir Novo Aluno' : 'Atualizar Aluno'}</h1>
                    <Link className="back-link" to="/alunos" aria-label="Voltar para a Página de Alunos">
                        <FiCornerDownLeft size="25" color="#17202a" aria-label="Ícone de Voltar" />
                        Retornar
                    </Link>
                </section>
                <form>
                    <input placeholder="Nome" />
                    <input placeholder="Email" />
                    <input placeholder="Idade" />
                    <button className="button" type="submit">{alunoId === '0' ? 'Incluir' : 'Atualizar'}</button>
                </form>
            </div>
        </div>
    );
}
