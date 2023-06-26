import React from "react";
import "./Signin.css";
import { setDate } from "date-fns";
import { useState } from "react";
import axios from 'axios'
const Signin = () => {
  const [setUser, setUserdata] = useState({
    username: "",
    password: "",
  });

  console.log({setUser});
  // console.log(setUser.username);
  // console.log(setUser.password);

  const setData = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserdata((prev) => {
      return { ...prev, [name]: value };
    });
  };






  const handleSubmit = async(event)=>{
	event.preventDefault();
	// const headers = {
  //       'Content-Type': 'text/plain'
  //   };

    const result = await axios.post(
        'https://dst-server.onrender.com/api/v1/auth',
		{username:setUser.username,password:setUser.password},
        // {headers}
        ).then(response => {
            console.log("Success==> ", response.status);
        })
        .catch(error => {
            console.log("Error===>", error);
        }
    )


        // console.log("Result=====>" ,res.data)
  }

  

  return (
    <>
      <main className="signin-main">
        <div className="main-container">
          <section className="wrapper">
            <div className="heading">
              <h1 className="text text-large">Sign In</h1>
              {/* <p className="text text-normal">New user? <span><a href="#" className="text text-links">Create an account</a></span> */}
              {/* </p> */}
              <p>Hello Again, Let's continue to track your sleep.</p>
            </div>
            <form name="signin" className="form">
              <div className="input-control">
                <label className="input-label" hidden>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="input-field"
                  placeholder="Username"
                  name="username"
                  value={setUser.username}
                  onChange={setData}
                />
              </div>
              <div className="input-control">
                <label className="input-label" hidden>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="input-field"
                  placeholder="Password"
                
                  value={setUser.password}
                  onChange={setData}
                />
              </div>
              <div className="input-control">
                <a href="#" className="text text-links">
                  Forgot Password
                </a>
                <input
                  type="submit"
                  name="submit"
                  className="input-submit"
                  value="Sign In"
                  onClick={handleSubmit}
                />
              </div>
            </form>
            <div className="striped">
              <span className="striped-line"></span>
              <span className="striped-text">Or</span>
              <span className="striped-line"></span>
            </div>
            <div className="method">
              <div className="method-control">
                <a href="/signup" className="method-action">
                  <span>Sign up</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Signin;
