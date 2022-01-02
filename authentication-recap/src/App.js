import {GoogleAuthProvider, getAuth, GithubAuthProvider, signOut, signInWithPopup} from 'firebase/auth';
import { useState } from 'react';
import './App.css';
import intializeAuthentication from './Firebase/firebase.initialize';

intializeAuthentication();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

function App() {
  const [user, setUser] = useState({});
  const auth = getAuth();

  const handleGoogleSignIn = () =>{
    signInWithPopup(auth, googleProvider)
    .then(result =>{
      const {displayName, uid, photoURL} = result.user;
      const loggedInUser ={
        name: displayName,
        user_id: uid,
        photo: photoURL
      };
      setUser(loggedInUser);
    })
  }


  const handleGithubSignIn = () =>{
    signInWithPopup(auth, githubProvider)
    .then(result =>{
      const {displayName, uid, photoURL} = result.user;
      const loggedInUser ={
        name: displayName,
        user_id: uid,
        photo: photoURL
      };
      setUser(loggedInUser);
    })
  }

  const handleSignOut = () =>{
    signOut(auth)
    .then(() => {
      setUser({});
    })
  }

  return (
    <div className="App">
      { !user.user_id ? <div>
      <button onClick={handleGoogleSignIn}>Google Sign In</button>
      <button onClick={handleGithubSignIn}>Github Sign In</button></div> :
      <button onClick={handleSignOut}>Sign Out</button>}
      <br />
      {
        user.user_id && <div>
          <p>Show your id: {user.user_id}</p>
          <h2>Welcome {user.name}</h2>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
