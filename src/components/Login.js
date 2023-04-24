import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { _Login } from "../store/slice/authSlice";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const login = () => {
    dispatch(_Login({
      email: email,
      password: password
    }))
  };
  return (
    <div className="block ">
      <div>
        <input
          className="bg-gray-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          className="bg-gray-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={login}>Log in</button>
    </div>
  );
};

export default Login;
