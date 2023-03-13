import './App.css';
import { useEffect } from 'react';
import Form from './Components/Common/Form'
import Home from './Components/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router,
   Routes,
   Route,
   useNavigate 
  } from 'react-router-dom';
import { auth } from './firebase-config'
import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import LoginPage from './login';
import React from 'react';


function App() {
useEffect(() => {
  let authToken = sessionStorage.getItem('Auth Token')
  if (authToken) {
    navigate('/home')
  }
}, [])
const navigate = useNavigate();
const handleAction = (id:number, email:string, password:string) => {
    if (id === 2)
    createUserWithEmailAndPassword(auth, email, password)
    .then((response) => {
      sessionStorage.setItem('Auth Token', response.user.refreshToken)
      navigate('/home')
    })
    .catch((error) => {
      console.log(error);
      if(error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found'){
        toast.error('Please check the Password or email');
      }
      if(error.code === 'auth/invalid-email'){
        toast.error('Please write a valid email');
      }
      if(error.code === 'auth/weak-password')
      {
        toast.error('Please enter a password with'
        + '8 min characters '+'1 symbol')
      }
    })

    else if ( id === 1)
    signInWithEmailAndPassword(auth, email, password)
    .then((response) => {
      sessionStorage.setItem('Auth Token', response.user.refreshToken)
      navigate('/home')
    })
    .catch((error) => {
      if(error.code === 'auth/wrong-password'){
        toast.error('Please check the Password');
      }
      if(error.code === 'auth/user-not-found'){
        toast.error('Please check the Email');
      }
    })

}
  return (
      <div className="App">
        <>
        <ToastContainer />
        <Routes>
            <Route path='/login' element={<LoginPage 
                  handleAction={(email:string,password:string) => handleAction(1,email,password)}
                  />} 
            />
            {/* <Route
              path='/register'
              element={
                <Form
                  title="Register"
                  setEmail={setEmail}
                  setPassword={setPassword}
                  handleAction={() => handleAction(2)}
                  />}
            /> */}
            <Route
            path='/home'
            element={
              <Home />}
          />
          </Routes>
        </>
      </div>
  );
}

export default App;