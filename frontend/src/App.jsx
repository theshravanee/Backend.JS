
import React, { useState } from "react";
import axios from 'axios'
const App = () => {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit =  async(e) => {
    e.preventDefault();

      let res= await axios.get('http://localhost:3000/signUp',user)
      console.log(res,"resssssss");


      http://localhost:5173/

      


      http://localhost:3000/signUp



      

    
  };

  return (
    <div>

      <h1>Signup</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={user.name}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={user.email}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={user.password}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Sign Up
        </button>

      </form>

    </div>
  );
};

export default App;

