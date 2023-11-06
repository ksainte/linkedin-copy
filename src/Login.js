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
import { signInWithEmailAndPassword } from "firebase/auth";




function Login() {

const[email, setEmail]= useState("");
const[password, setPassword]= useState("");
const[name, setName]= useState("");
const[picture, setPicture]= useState("");
const dispatch = useDispatch();


const register =(e) => {
    e.preventDefault();
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
})
.then(()=> {
    console.log('userCredential:', userCredential);
 console.log('userCredential name:', u.displayName);//ca va display grave a update
 console.log('userCredential name:', u.email);
    dispatch(
        login({
        email: email,//u.email cree apd de email
        uid : u.uid,
        displayName: name,//ou u.displayName
        photoURL: picture,// //ou u.photoURL photoURL
    }))
})
}).catch((error) => alert(error));
}

// createUserWithEmailAndPassword(auth, email, password)
// .then((userCredential) => {
//  const u = userCredential.user;
//  console.log('userCredential:', userCredential);
//  console.log('userCredential name:', u.displayName);
//  console.log('userCredential name:', u.email);// bien evidemment aucun fonctionnera ss update
//     dispatch(
//         login({
//         email: email,
//         uid : u.uid,
//         displayName: name,
//         photoURL: picture,
//     }))
// })
// .catch((error) => alert(error));
// }

const loginToApp =(e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    const u = userCredential.user;
        dispatch(
            login({
            email: email,//uid et email sont lies, pas de sign in dans email sans uid valide
            uid : u.uid,
            displayName: u.displayName,
            photoURL: u.photoURL,//et pas picture!
        }))
        // console.log('userCredential name:', u.displayName); non si ss update car E pas
        // par contre le dispatch update bien avec name et picture
        // console.log('userCredential email:', u.email); fonctionne car email ds signin
    })
    .catch((error) => alert(error));
}

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
        onClick={loginToApp}
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
