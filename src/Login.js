import React from 'react'
import link from './Assets/link.png'
import link1 from './Assets/Linkedin-Logo-2003.png'
import "./Login.css"
import {useState} from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch } from 'react-redux'
import {login} from "./features/userSlice";
import { updateProfile } from "firebase/auth";




function Login() {

const[email, setEmail]= useState("");
const[password, setPassword]= useState("");
const[name, setName]= useState("");
const[picture, setPicture]= useState("");
const dispatch = useDispatch();


const register =() => {
    if (!name){
        return alert("Please enter a full name");
    }

    //if we created as user successfully with the auth
    //once we got it created, we go into the user and update their
    // profile with a mapping name and picture
    //then... after that's done we will do the following:
    // we dispatch a login action aka we push the user into the redux
    // circle
    // the auth will get us back the user object against which we
    // take the mail, uid, name etc
    // if smthing goes wrong then...

createUserWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
 const u = userCredential.user;
updateProfile(u, {
    displayName: name,
    photoURL: picture,
}).then(()=> {
    dispatch(
        login({
        email: u.email,
        uid : u.uid,
        displayName: name,
        photoURL: picture,
    }))
})
}).catch((error) => alert(error));
}


const loginToApp =() => {

};

  return (
    <div className='login'>
     <img
     src={link1}
     alt=""
     />
     <form>
        <input 
        placeholder='Full name(required if registering'
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
        <input 
        placeholder='Profile Pic'
        type='text'
        value={picture}
        onChange={(e) => setPicture(e.target.value)}
        />
        <input
        value={email} 
        placeholder='Email'
        onChange={(e) => setEmail(e.target.value)}
        type='email'
        />
        <input
        value={password}  
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
        type='password'/>
        <button
        type='submit'
        // onClick={loginToApp}
        >Sign In</button>
     </form>

     <p>
        Not a member?
        <span
            className='login_register' 
            onClick ={register}> Register Now
        </span>
     </p>
    </div>
  )
}

export default Login
