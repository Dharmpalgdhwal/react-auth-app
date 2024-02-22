import React, { Component } from 'react';
var firebase = require('firebase');


var config = {
  apiKey: "AIzaSyBj39Fqotu55PEcKlGZb7ae8pGyf5DeJXc",
  authDomain: "cyber-yatra-auth.firebaseapp.com",
  databaseURL: "https://cyber-yatra-auth-default-rtdb.firebaseio.com",
  projectId: "cyber-yatra-auth",
  storageBucket: "cyber-yatra-auth.appspot.com",
  messagingSenderId: "671888862422",
  appId: "1:671888862422:web:d99edccc7b85b849dc6d77",
  measurementId: "G-46FN87R1TX"
  };
  firebase.initializeApp(config);


class Authen extends Component {

  login(event){
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    console.log(email, password);

    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, password);

    promise.then(user => {
      var lout = document.getElementById('logout');

      //Write a welcome message for user
      lout.classList.remove('hide');
    });

    promise.catch(e => {
      var err = e.message;
      console.log(err);
      this.setState({err: err});
    });
  }

  signup(){
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    console.log(email, password);

    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, password);

    promise
    .then(user => {
      var err = "Welcome "+ user.email;
      firebase.database().ref('users/'+user.uid).set({
        email: user.email
      });
      console.log(user);
      this.setState({err: err});
    });
    promise
    .catch(e => {
      var err = e.message;
      console.log(err);
      this.setState(({err: err}));
    });
  }

  logout(){
    firebase.auth().signOut();
    var lout = document.getElementById('logout');

    //Write a thanks message for user
    lout.classList.add('hide');
  }

  google() {
    console.log("Signing in with Google");
  
    var provider = new firebase.auth.GoogleAuthProvider();
    var promise = firebase.auth().signInWithPopup(provider);
  
    promise.then(result => {
      var user = result.user;
      console.log("Google sign-in success:", user);
  
      // Update user profile in Firebase database
      firebase.database().ref('users/' + user.uid).set({
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL  // Store user's profile photo URL
      });
  
      // Show a welcome message to the user
      this.setState({ err: `Welcome, ${user.displayName || user.email}!` });
    })
    .catch(error => {
      // Handle sign-in errors
      var errorMessage = error.message;
      console.error("Google sign-in error:", errorMessage);
      this.setState({ err: errorMessage });
    });
  }
  

  constructor(props){
    super(props);

    this.state = {
      err: ''
    };

    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
    this.google = this.google.bind(this);
  }

  render(){
    return(
      <div>
        <input id="email" ref="email" type="email" placeholder="Enter your email" /><br />
        <input id="pass" ref="password" type="password" placeholder="Enter your password" /><br />
        <p>{this.state.err}</p>
        <button onClick={this.login}>Log In</button>
        <button onClick={this.signup}>Sign Up</button>
        <button onClick={this.logout} id="logout" className="hide">Log out</button><br />
        <button onClick={this.google} id="google" className="google">Sign In with Google</button>
      </div>
    );
  }
}


export default Authen;
