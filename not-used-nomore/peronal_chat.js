import React, { Component } from 'react';
import { View, StyleSheet, Text } from "react-native";

import { mainColor, customRadius } from './settings.js';
import { Login } from './login'

class PersonalChat extends Component {
    state = {
        logged: false,
        register: false
    }

    render() {
        return(
            <View>
                {this.state.logged ?  <Text>Hier komen de berichten</Text> : <Login /> } 
            </View>
        );
    }
}

export { PersonalChat }