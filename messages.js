import React, { Component } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";

import { mainColor, customRadius } from './settings.js';
import { InitApp, ReadAllMessages } from './database.js';

class EenBericht extends Component {
    state = {
        make_bigger: false,
        msg: "",
        cropped_msg: "",
        trunc: false
    }

    constructor(props) {
        super(props);
        if (this.props.message.length > 100) {
            this.state.trunc = true
            let sliced = this.props.message.slice(0, 100)
            let msg = ""
            this.state.cropped_msg = msg.concat(sliced, " ...")
            this.state.msg = msg.concat(sliced, " ...") // init van het bericht bij grote
        }else{
            this.state.msg = this.props.message // init van het bericht bij kleine
        }  
    }
    
    handleClick = () => {
        let display_msg = this.state.make_bigger ? this.state.cropped_msg  : this.props.message
        this.setState({
            make_bigger: !this.state.make_bigger, 
            msg:  display_msg
        })
    }
    
    getDateFromTimeStamp() {
        let d = new Date(this.props.date*1000);
        return d.toLocaleDateString("nl-NL")
    }

    getButton() {
        return(
        <View key={this.props.given_ke + "_4"} style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <Text key={this.props.given_key + "_5"} onPress={this.handleClick} style={[{ marginTop: this.state.make_bigger ? 20 : 15 }, styles.leesmeer, styles.shaduw]}> {this.state.make_bigger ? "Lees minder" : "Lees meer"} </Text>
        </View>

        );
    }
    
    render(){
        return(
            <View key={this.props.given_key + "_1"} style={[styles.een_bericht, styles.shaduw]} >
                <Text key={this.props.given_key + "_2"} style={styles.titel_bericht}>[{this.getDateFromTimeStamp()}]  {this.props.title}</Text>
                <Text key={this.props.given_key + "_3"} style={styles.bericht}>{this.state.msg}</Text> 
                {this.state.trunc ? this.getButton() : null}

            </View>
        );

    }
}


class Messages extends Component {
    state = {
		messages: {},
        loading: true
	};
    
    async componentDidMount() {
        //Have a try and catch block for catching errors.
        var data = null
        try {            
            InitApp()
            //Assign the promise unresolved first then get the data using the json method. 
            ReadAllMessages().then(dataSnapshot => {
                data = dataSnapshot.exportVal()
                this.setState({messages: data, loading: false})

            }
            );
        } catch(err) {
            console.log("Error fetching data-----------", err);
        }
    } 
    
    render() {
        const { messages, loading } = this.state;
        
        if (!loading) {
            if (this.state.messages == null) {
                return (<View><Text>Er zijn geen berichten om weertegeven</Text></View>);
            }
            return (
                <View>                    
                    {Object.keys(this.state.messages).reverse().map( (element) => {
                        return <EenBericht key={element} title={messages[element].title} message={messages[element].message} date={messages[element].date} given_key={element} />
                    })}
                </View> 
            );  
        }else{
            return (
                <View style={styles.wait_view}>
                    <Text style={{textAlign: 'center'}}>Even geduld, de berichten worden opgehaald ...</Text>
                    <ActivityIndicator color={mainColor} />
                </View>
                ) 
            }
            
        }
    }


export { Messages }

const styles = StyleSheet.create({
    een_bericht: {
        backgroundColor: "white",
        width: "100%",
        borderWidth: 3,
        borderColor: mainColor, 
        marginBottom: 10,
        padding: 10,
        borderRadius: 20,
    },
    titel_bericht: {
        fontSize: 17
    },
    bericht: {
        marginTop: 2,
        marginRight: 5,
        fontSize: 15
    },
    leesmeer: {
        backgroundColor: mainColor,
        borderRadius: customRadius,
        padding: 5,
        textAlign: "center",
        width: "20%",
        minWidth: 100,
        color: "white",
    },
    shaduw: {
        shadowColor: mainColor,
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
    },
    wait_view: {
        justifyContent: "center",
        alignContent: "center",
        margin: "5%"
    },
    button: {
        borderWidth: 1,
        borderRadius: customRadius,
        borderColor: mainColor,
        backgroundColor: mainColor,
        width: "25%", 
        marginBottom: 15, 
        alignContent: "center",
        justifyContent: "center"
    }
    
});


