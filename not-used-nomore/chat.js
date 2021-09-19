import React, { Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { mainColor, customRadius } from './settings';

class Bericht extends Component {
    render() {
        return(
            <View style={[styles.all, this.props.isMine ? styles.mine : styles.other]}>
                <Text style={[styles.text, this.props.isMine ? {color: "white"} : {color: "black"}]}>{this.props.msg}</Text>
            </View>
        );
    }
}

class Chat extends Component {
    render() {
      return(
        <View>
            <Bericht isMine={true} msg="Ik heb een vraag over iets. Kan ik die stellen ?" /> 
            <Bericht isMine={false} msg="Ja dat kan. Stel je vraag" /> 
            <Bericht isMine={true} msg="Mij vraag is, wat is het onderwerp van de khotba van overmorgen ?" />
        </View>
            
      );
  }
}

//de isMine prop moet van de database gehaald worden. Staat bij elke bericht

const styles = StyleSheet.create({
  mine: {
    backgroundColor: mainColor,
    marginLeft: "20%"
},
other: {
    backgroundColor: "white",
    borderWidth: 3, 
    borderColor: mainColor,
    marginRight: "20%"

}, 
all: {
    marginTop: 5,
    marginBottom: 5,
    borderRadius: customRadius,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
},
text: {
    color: "white",
    
}
});
export { Chat }