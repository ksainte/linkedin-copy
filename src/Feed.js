import React from 'react'
import "./Feed.css"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InputOption from './InputOption'
import ImageIcon from '@mui/icons-material/Image';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import Posts from "./Posts"
import { useState, useEffect } from "react";
import { doc } from 'firebase/firestore';
import { db, auth } from "./firebase";
// import { firebase } from 'firebase';
import { getFirestore } from "firebase/firestore";
import { collection} from "firebase/firestore";
import { getDocs, deleteDoc} from "firebase/firestore";
import { addDoc} from "firebase/firestore";
import { updateDoc, serverTimestamp } from "firebase/firestore";
import { onSnapshot, query, orderBy } from 'firebase/firestore';
import {selectUser} from "./features/userSlice"
import { useSelector } from 'react-redux';
import FlipMove from 'react-flip-move'




function Feed() {

  const user = useSelector(selectUser);
const[posts,setPosts]= useState([]);
const [input, setInput] = useState('');
const postsCollectionRef = collection(db, "posts");
// await addDoc(postsCollectionRef, {
  // addDoc(collection(db, "contacts"), {

//OnSnapshot is to retrieve real time, It listens for changes to the data in the collection
// When a change occurs, the function provided as an argument will be executed.
//setPosts(...) is a React state setter function
//The data is received in the form of a snapshot, 
// and setPosts is used to update the component's state variable
//every time the post change I will update my "posts" piece of state with setPosts
//docs.map stands for map through the docs and for every single doc inside that collection I will 
// return "=> ({" I will return an object, inside it I will have 
// an id which is the document id inside the database
// the data which is the data stored behind the posts in the db
//WE POUR THAT FROM THE DB AND WE WILL SEND IT TO OUR POST FUNCTION LATER

// the code is mapping the documents in the snapshot to an array of objects
// Each object has two properties: id (the document's unique identifier) 
// and data (the actual data of the document).

//The empty dependency array [] passed as the second argument to useEffect 
//indicates that this effect should run only once when the component is initially mounted.
// aka it should go fetch the data when the "the component is first displayed" or "added to the dom"
//Since [] it's empty, there are no dependencies, 
//=>the effect is effectively "hooked" to the component's initial mounting or "first display" 
// even though new data can be in the database

//If you omit  the effect will run after every render,

// useEffect(() => {
//     db.collection("posts")
//       .orderBy("timestamp", "desc")
//       .onSnapshot(
//       (snapshot) => {
//       setPosts(
//         snapshot.docs.map((doc) => ({
//           id: doc.id,
//           data: doc.data(),
//         }))
//       );
//     });
//   }, []);

//=>  it fetches the data upon every component render, works too

// instead of const data = await getDocs(postsCollectionRef);
// useEffect(() => {
//   const getPosts = async () => {
//     const q = query(postsCollectionRef, orderBy("timestamp", "desc"));
//     const data = await getDocs(q);
//     const posts = data.docs.map((doc) => ({ 
//     data: doc.data(), 
//     id: doc.id }));
//     setPosts(posts);
//   };
//   getPosts();
// });

//WE POUR data and id FROM THE DB AND WE WILL SEND IT TO OUR POST FUNCTION LATER
useEffect(() => {
  // Create a function to handle the initial data retrieval and updates
  ////The data is received in the form of a snapshot
  const handleSnapshot = (snapshot) => {
    const posts = snapshot.docs.map((doc) => ({ data: doc.data(), id: doc.id }));
    setPosts(posts);


  };
  
  // const unsubscribe = onSnapshot(collection(db, 'posts'), handleSnapshot);
  const q = query(postsCollectionRef, orderBy('timestamp', 'desc'));

  // Set up a real-time listener using .onSnapshot()
  const unsubscribe = onSnapshot(q, handleSnapshot);

  // The above line will start listening for changes in the "posts" collection

  // Cleanup function to unsubscribe from the listener when the component unmounts
  return () => {
    unsubscribe();
  };
}, []);

//here I decide what data I want in my db whenever someone sends a message
//input here is my input piece of state

const sendPost = (e) => {
    e.preventDefault();

    addDoc(postsCollectionRef, {

        name :user.displayName,
        description : user.email,
        message: input,
        photoUrl: user.photoURL || "",
        // timestamp: getFirestore.FieldValue.serverTimestamp(),
        timestamp: serverTimestamp(),
    });

    // await addDoc(collection(db, 'posts'), postData); 
    setInput(''); // OTHERWISE TEXT REMAINS INSIDE
    
}

//the value of my input is my input piece of state
//my input piece of state is changed with setInput(e.target.value)
//onChange otherwise its stuck to the default value which is useState('');

  return (
    <div className='feed'>

      <div className='feed_inputContainer'>

        <div className='feed_input'>
            <AddCircleIcon />
            <form>
                <input 
                value={input} 
                onChange={e => setInput(e.target.value)} 
                type = "text"/>
                <button onClick={sendPost} type="submit">Send</button>
            </form>
        </div>
        <div className='feed_inputOptions'>
            <InputOption Icon={ImageIcon} title="Photo"
            color = "#70B5F9"/>
             <InputOption Icon={SubscriptionsIcon} title="Subscriptions"
            color = "green"/>
             <InputOption Icon={EventNoteIcon} title="Event"
            color = "red"/>
             <InputOption Icon={CalendarViewDayIcon} title="Calendar"
            color = "black"/>
        </div>
      </div>
        <FlipMove>
        {posts.map(({ id, data: { name, description, message, 
        photoUrl }}) => (
          <Posts
            key={id} // IF WE DONT IT WILL RERENDER THE ENTIRE POSTS LIST
            name={name}
            description={description}
            message={message}
            photoUrl ={photoUrl}
          />
        ))}
        </FlipMove>

        
        {/* <Posts 
        name ='Sonny' 
        description= 'This is a test' 
        message= 'Wow the message worked'
        />
        <Posts 
        name ='Kevin' 
        description= 'This is a test too' 
        message= 'Wow the message worked too'
        /> */}
    </div>
  )
}
//MANUALY CHECKING THE UI BY HARDCODING POSTS , EVEN THOUGH NOT PART OF DB
export default Feed

// #70B5F9"