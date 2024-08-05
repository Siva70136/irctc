import { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
import './index.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const token = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
      if (token != undefined || token != null) {
          navigate('/');
      }

  })


  const login = async (event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username, password })
    }

    const res = await fetch('http://localhost:3000/api/login', options);
    if (res.ok) {
      const data = await res.json();
      Cookies.set("token", data.token, {
        expires: 30,
        path:"/",
      });

      await new Promise((resolve) => {
        toast.success('User Login Successfully', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: resolve,
        });
      });

      navigate('/');

    }
    else {
      const data = await res.json();
      toast.error(`${data.msg}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",

      });
      //console.log(data);
    }
    setPassword("");
    setUsername("");

  };

  return (
    <div className="container">
      <div className="container2  ">
        <form id="addUserForm" className="form">
          <h3 className="textHead">Login</h3>
          <label htmlFor="name" className="label-data ">User Name</label><br />
          <input type="text" name="" id="name" value={username} className="form-control input" placeholder="Email" onChange={(e) => { setUsername(e.target.value) }} />
          <p id="nameErrMsg"></p>
          <label htmlFor="PWD" className="label-data">Password</label><br />
          <input type="password" name="" id="PWD" value={password} className="form-control input" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />

          <div className='remember-container'>
            <input type="checkbox" name="" id="save" className="label-check" />
            <label htmlFor="save" className="label-data">Remember me</label><br />
          </div>
          <div className="btn">
            <button type="button" className="button " onClick={(e) => { login(e) }}>submit</button>
          </div>
        </form>
        <br />
        <p className=" acc">Don't have an account?
          <Link to="/signup" className="signup">
            Sign Up
          </Link>
        </p>

      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
