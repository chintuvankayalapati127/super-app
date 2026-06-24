import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");

    const navigate = useNavigate();


     const handleSubmit = () => {
         if(name === ""){
        alert("Please enter name");
         return;
          }

      if(username === ""){
        alert("Please enter username");
        return;
      }

      if(!email.includes("@")){
       alert("Enter valid email");
       return;
      }

       if(mobile.length !== 10){
         alert("Mobile number should be 10 digits");
         return;
        }
        alert("Registration Successfull")

        localStorage.setItem("name", name);
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("mobile", mobile);
    navigate("/categories");

      console.log(name);
      console.log(username);
      console.log(email);
      console.log(mobile);
      }
  return (
    <div className="container">

      <div className="left">
        <h2>Discover new things on SuperApp</h2>
      </div>

      <div className="right">
        <h1>Super App</h1>
        <p>Create your new account</p>
        <input
         type="text"
         placeholder="Name"
         value={name}
         onChange={(e) => setName(e.target.value)}
        />
       <input
         type="text"
         placeholder="Username"
         value={username}
         onChange={(e) => setUsername(e.target.value)}
        />
        <input
         type="email"
         placeholder="Email"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
        />
         <input
           type="text"
           placeholder="Mobile"
           value={mobile}
           maxLength="10"
           onChange={(e) =>
             setMobile(e.target.value.replace(/\D/g, ""))
           }
         />
        


         <button onClick={handleSubmit}>Sign Up</button>     
          </div>

    </div>
  );
}

export default Register;