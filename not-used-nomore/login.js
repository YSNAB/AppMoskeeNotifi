import React, { Component, useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/auth'
import { InitApp }  from './database.js'

import { Chat } from './chat'
import { customRadius, mainColor } from './settings';

function ananymousLogin(){
  
  firebase.auth()
  .signInAnonymously() 
  .catch(error => {console.error("ERROR: ", error.message)} )
}

class LoginScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      email_input: "",
      password_input: ""
    }
  }

  render() {
    return(
      <View style={{border: "1px solid red"}} >
        <Text style={{textAlign: "center", marginBottom: 25}}>Login</Text>
        <View style={{flexDirection: 'row'}}>
          <TextInput style={styles.input} placeholder="E-mail" autoCapitalize='none' onChangeText={(text) => {this.setState({email: text, email_input: text})}} value={this.state.email_input} />
        </View>

        <View style={{flexDirection: 'row'}}>
          <TextInput style={styles.input} placeholder="Wachtwoord" autoCapitalize='none' secureTextEntry={true} onChangeText={(text) => {this.setState({password: text, password_input: text})}} value={this.state.password_input}/>
        </View>

        <Text style={styles.button} onPress={()=>{this.setState({email_input: "", password_input: ""}, console.log("email: ", this.state.email, "\npassword: ", this.state.password) )}}>Login</Text>
      
      </View>
    );
  }
}


function Login() {
  InitApp();
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  if (!user) {
    return (
      <View>
        {/*<Text onPress={ananymousLogin} >Anonymous!</Text>*/}
        <LoginScreen />
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
      <Text onPress={() => {firebase.auth().signOut()}} >Logout</Text>
      <Chat />
    </View>
  );
}

const styles = StyleSheet.create({
input: {
  borderWidth: 2, 
  borderColor: mainColor, 
  borderRadius: 10, 
  width: "100%", 
  height: 40,
  marginBottom: 10,
  paddingLeft: 10,
  paddingRight: 10,
},
button:{
  width: "100%",
  borderRadius: 10,
  textAlign: "center",
  color: "white",
  padding: 10,
  backgroundColor: mainColor
},
});

export { Login }


/*
code to add user to datbase upon signin

const database = firebase.database()
const createUser = user => database.ref().child(`User/${user.uid}`).set(user)
exports.createUser = functions.auth.user().onCreate(createUser)
*/