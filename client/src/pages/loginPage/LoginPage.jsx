import { useEffect, useRef, useState } from "react";
import "./LoginPage.css";
import Input from "./input/Input";
import kpmg from "./../../assets/kpmg.svg";
const LoginPage = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
  };
  const inputs = [
    {
      label: "Email *",
      name: "Email",
      type: "email",
      placeholder: "ex: john.doe@gmail.com",
      inputRef: emailRef,
    },
    {
      label: "Password *",
      name: "password",
      type: "password",
      placeholder: "ex: @password123",
      inputRef: passwordRef,
    },
  ];

  return (
    <div className="login">
      <img src={kpmg} className="kpmg" />
      <div className="form-container">
        <div className="login-header">
          <div className="login-title">TicketTrac.</div>
          <div className="login-description">
            votre système de gestion de tickets.
          </div>
        </div>

        <form onSubmit={handleLogin}>
          {inputs.map((el, i) => (
            <Input
              key={i}
              label={el.label}
              name={el.name}
              type={el.type}
              placeholder={el.placeholder}
              inputRef={el.inputRef}
            />
          ))}
          <button type="submit" className="form-btn" disabled={false}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
