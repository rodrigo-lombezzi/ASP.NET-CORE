import React from "react";
import './styles.css';
import loginImg from '../../assets/login.png'; // Added 'from'

export default function Login(){
    return(
        <div className="login-container">
            <section className="form">
                <img src={loginImg} alt="Login" />
                <form>
                <h1 >Cadastro de Alunos</h1>    
                    <input placeholder="Email"/>
                    <input type="password" placeholder="Password" />
                    <button class="button" type="submit" >Login</button>    
                </form>
            </section>
        </div>
    );
}
