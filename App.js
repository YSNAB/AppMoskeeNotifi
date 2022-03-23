import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, StatusBar, Platform } from 'react-native';

import { mainColor, customRadius } from './settings.js';
import { Messages } from './messages.js';


const Top = () => {
  return (
    <View style={styles.top}>
      <View style={styles.top_left}>
        <View style={styles.top_left_view}>
          <Image style={styles.top_left_image} source={require('./assets/logo.jpg')}/>
        </View>
      </View>
      <View style={styles.top_right}> 
        <Text style={styles.top_right_text}>MOSKEE EL FATH</Text>

      </View>
    </View>
  );
}


const MainContent = () => {
  return (
      <ScrollView style={[styles.maincontent, styles.shadow]}>
        <Messages />
      </ScrollView>
  );
}


function Main() {  
  const windowHeight = Dimensions.get('window').height;
  const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 0;
  const totalHeight  = windowHeight + statusBarHeight

  return (
    <View style={[styles.background, {height: totalHeight}, {paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : Platform.OS === "ios" ? 10 : 0}   ]}> 
        <MainContent />
        <Top />
    </View>   
  )
}

export default function App() {
  const {height, width} = Dimensions.get('window');

  if ((width < 320) || (height < 400)) { 
    return (
      <View style={{flex: 1, alignContent: "center", justifyContent: "center", textAlign: "center"}}>
        <Text>Deze app is niet te gebruiken met de huidige dimensties.</Text>
      </View>
    );

  }


  return (
    Main()
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingBottom: 25,
  },
  default_text: {
    color: 'white',
  },
  background: {
    backgroundColor: mainColor,
    width: '100%',
    flexDirection: "column-reverse"
  },
  top_right: {
    flex: 1,
    justifyContent: "center", 
  },
  top_right_text: {
    color: "white",
    fontSize: 18,
    textAlign: 'left',
  },
  top_left: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 10,
  },
  top_left_image: {
    resizeMode: 'contain',
    height: "50%",
    width: "100%",
    alignContent: "center",
  },
  top_left_view: {
    width: 125,
    height: 125,
    borderWidth: 7,
    borderColor: mainColor,
    borderRadius: 62.5,
    backgroundColor: "white",
    justifyContent: "center"
  },
  top: {
    height: 125, 
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center", 
  },
  button: {
    textAlign: "center",
    padding: 5,
    marginBottom: 10,
    borderRadius: customRadius,
    backgroundColor: mainColor,
    color: "white"
  },
  maincontent: {
    marginTop: -10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: customRadius,
    backgroundColor: "white",
    padding: 20,
    alignContent: "center"    
  },


});

