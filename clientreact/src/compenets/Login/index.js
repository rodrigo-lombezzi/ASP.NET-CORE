import React, { useState } from "react";
import './styles.css';
import loginImg from '../../assets/login.png';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    return (
        <div className="login-container">
            <section className="form">
                <img src={loginImg} alt="Login" />
                <form onSubmit={login}>
                    <h1 >Cadastro de Alunos</h1>
                    <input placeholder="Email" value={email} />
                    <input type="password" placeholder="Password" />
                    <button className="button" type="submit">Login</button>
                </form>
            </section>
        </div>
    );
}
