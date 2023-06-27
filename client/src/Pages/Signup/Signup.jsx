import React from 'react'
import './Signup.css'
import { Link } from 'react-router-dom'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
  const navigate = useNavigate()

    const [setData, setUserdata] = useState({
        username:"",
        email:"",
        password:""
    });

    console.log({setData});

    const setVal=(event)=>{
        const name= event.target.name;
        const value = event.target.value;

        setUserdata((prev)=>{
            return { ...prev, [name]: value };
        });
    }
    // username:setData.username,password:setData.password,email:setData.email
    const handleSubmit = async(event)=>{
        event.preventDefault();


        if(setData.username!= "" && setData.email!= "" && setData.password!= "")
        {
          const result = await axios.post(
            'https://dst-server.onrender.com/api/v1/users',
            {   username:setData.username,password:setData.password,email:setData.email},
            ).then(response=>{
                console.log("Success===>",response.data.status)
                if(response.data.status === "success")
                {
                 console.log("Account successfully created!!", response.data.status)
                  navigate('/')
                } 
            })
            .catch(error=>{
                console.log("Error===>",error.response.data.status)
                if(error.response.data.status === "failed")
                {
                  alert("User is already exist")
                } 
            })
        }else{
          alert("Please enter all fields correctly");
          window.location.reload()
        }
    }

  return (
    <>
      <main className="signin-main">
        <div className="main-container">
          <section className="wrapper">
            <div className="heading">
              <h1 className="text text-large">Create an account</h1>
              {/* <p className="text text-normal">New user? <span><a href="#" className="text text-links">Create an account</a></span> */}
              {/* </p> */}
              <p>Let's get started to track your sleep.</p>
            </div>
            <form name="signin" className="form">
              <div className="input-control">
                <label className="input-label" hidden>
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="email"
                  className="input-field"
                  placeholder="Username"
                  value={setData.username}
                  onChange={setVal}
                />
              </div>
              <div className="input-control">
                <label className="input-label" hidden>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="input-field"
                  placeholder="Email id"
                  value={setData.email}
                  onChange={setVal}
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
                  value={setData.password}
                  onChange={setVal}
                />
              </div>
              <div className="input-control">
                {/* <a href="#" className="text text-links">Forgot Password</a> */}
                <input
                  type="submit"
                  name="submit"
                  className="input-submit"
                  value="Sign Up"
                  onClick={handleSubmit}
                />
              </div>
              <p style={{ textAlign: 'center' }}>
                Already have an account?{' '}
                <strong>
                  <Link to="/signin">Sign In </Link>
                </strong>
              </p>
            </form>
            {/* <div className="striped">
				<span className="striped-line"></span>
				<span className="striped-text">Or</span>
				<span className="striped-line"></span>
			</div> */}
            {/* <div className="method">
				<div className="method-control">
					<a href="/signup" className="method-action">
						<span>Sign in</span>
					</a>
				</div>
			</div> */}
          </section>
        </div>
      </main>
    </>
  )
}

export default Signup
