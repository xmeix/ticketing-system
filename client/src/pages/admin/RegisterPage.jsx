import { useDispatch, useSelector } from "react-redux";
import "./RegisterPage.css";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { register } from "../../store/apiCalls/auth";
import Input from "../../components/input/Input";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, user } = useSelector((state) => state.auth);
  const lastNameRef = useRef(null);
  const firstNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const roleRef = useRef(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("registering....");
    const lastName = lastNameRef.current.value;
    const firstName = firstNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const role = roleRef.current.value;

    if (
      lastName.trim() === "" ||
      firstName.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      role.trim() === ""
    )
      toast.error("Champs invalides.");
    else {
      toast.success("Inscription réussie");

      await dispatch(
        register({
          last_name: lastName,
          first_name: firstName,
          email,
          password,
          role,
        })
      );
      toast.success("Inscription réussie");
    }
  };

  const inputs = [
    {
      label: "Nom *",
      name: "last_name",
      type: "text",
      placeholder: "ex: Doe",
      inputRef: lastNameRef,
    },
    {
      label: "Prénom *",
      name: "first_name",
      type: "text",
      placeholder: "ex: John",
      inputRef: firstNameRef,
    },
    {
      label: "Email *",
      name: "Email",
      type: "email",
      placeholder: "ex: john.doe@gmail.com",
      inputRef: emailRef,
    },
    {
      label: "Mot de passe *",
      name: "password",
      type: "password",
      placeholder: "ex: @password123",
      inputRef: passwordRef,
    },
    {
      label: "Rôle *",
      name: "role",
      type: "text",
      placeholder: "ex: ADZ",
      inputRef: roleRef,
    },
  ];

  return (
    <div className="login">
      <div className="form-container">
        <div className="login-header">
          <div className="login-title">Inscription</div>
          <div className="login-description">
            Vous pouvez inscrire d'autres assistantes
          </div>
        </div>
        <form onSubmit={handleRegister}>
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
            Enregistrer
          </button>
        </form>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default RegisterPage;
