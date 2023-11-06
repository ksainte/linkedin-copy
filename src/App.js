import React from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import Header from "./Header";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import { selectUser } from './features/userSlice';
import { useSelector } from 'react-redux';
import Login  from "./Login";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect} from "react";
import { auth } from "./firebase";
import { useDispatch } from 'react-redux'
import {login} from "./features/userSlice";
import {logout} from "./features/userSlice";
import { updateProfile } from "firebase/auth";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userCredential) => {
      if (userCredential) {
        dispatch(
          login({
              email: userCredential.email,
              uid : userCredential.uid,
              displayName: userCredential.displayName,
              photoURL: userCredential.photoURL,
            })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  const user = useSelector(selectUser)
  return (
    <div className="App">
      <Header />

      {!user ? (
        <Login />
      ) : (
      <div className="App_body">
        <Sidebar/>
        <Feed/>
          {/* Widgets */}
      </div>
      )}
    </div>
  );
}

export default App;
