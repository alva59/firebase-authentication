import {getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut, createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react';
import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';

initializeAuthentication();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();




function App() {
const [user, setUser] = useState({});
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const [isLogin, setIsLogin] = useState(false);
const auth = getAuth();

const handleGoogleSignIn = () =>{
  signInWithPopup(auth, googleProvider)
  .then(result =>{
    const {displayName, uid, photoURL} = result.user;
    const loggedInUser = {
      name: displayName,
      user_id: uid,
      photo: photoURL
    };
    setUser(loggedInUser);
  })
  .catch(error=>{
    console.log(error.message);
  })
}

const handleGithubSignIn = () =>{
  
  signInWithPopup(auth, githubProvider)
  .then(result => {
    const {displayName, uid, photoURL} = result.user;
    const loggedInUser = {
      name: displayName,
      user_id: uid,
      photo: photoURL
    };
    setUser(loggedInUser);
  })
  .catch(error=>{
    console.log(error.message);
  })
}

const handleSignOut = () =>{
  signOut(auth)
  .then( () => {
    setUser({});
  })
}

const handleRegistration = e =>{
  e.preventDefault();
  if(password.length < 8){
    setError('Password should be at least 6 characters long')
    return;
  }else if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
    setError('Password must contain 2 uppercase letter')
    return;
  }
  isLogin? processLogin(email, password): createNewUser(email, password);
  
}

const processLogin = (email, password) => {
  
}

const handleEmailChange = e =>{
  setEmail(e.target.value);
}

const handlePasswordChange = e =>{
  setPassword(e.target.value);
}

const toggleLogin = e =>{
  setIsLogin(e.target.checked);
}

const createNewUser = (email, password) =>{
  createUserWithEmailAndPassword(auth, email, password)
  .then(result =>{
    const user = result.user;
    setError('');
    console.log(user);
  })
  .catch(error =>{
    setError(error.message);
  })
}


  return (
    <div className="mx-5">
      <form onSubmit={handleRegistration}>
        <h3 className='text-primary'>Please {isLogin ? 'Login' : 'Register'}</h3>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input onBlur={handleEmailChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input onBlur={handlePasswordChange} type="password" className="form-control" id="exampleInputPassword1" name="password"/>
        </div>
        <div className="mb-3 form-check">
          <input onChange={toggleLogin} type="checkbox" className="form-check-input" id="exampleCheck1"/>
          <label className="form-check-label" htmlFor="exampleCheck1">Already Registered?</label>
        </div>
        <div className="row mb-3 text-danger">{error}</div>
        <button type="submit" className="btn btn-primary">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      
      <br /><br /><br />


      {
        !user.user_id ? <div>
      <button onClick={handleGoogleSignIn}>Google Sign In</button>
      <button onClick={handleGithubSignIn}>Github Sign In</button>
      </div> :
      <button onClick={handleSignOut}>Sign Out</button>}
      <br />
      {
        user.user_id && <div>
          <p>Show your ID: {user.user_id}</p>
          <h2>Welcome {user.name}</h2>
          <img src={user.photo} alt="" />
        </div>
      }
      
    </div>
  );
}

export default App;
