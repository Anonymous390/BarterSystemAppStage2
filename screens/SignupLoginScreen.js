import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import db from '../config'
import firebase from 'firebase'

export default class SignupLoginScreen extends React.Component{

    constructor() {
        super();
        this.state = {
            emailId: "",
            password: "",
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: "",
            address: "",
            contact: "",
        }
    }

    userSignUp = (emailId, password, confirmPassword) => {
        if(password!==confirmPassword){
            Alert.alert("Password doesn't match check your password");
        }else{
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((response) => {
                return Alert.alert('User Signed Up Successfully')
            }).catch((error) => {
                var errorCode = error.code;
                var errorMsg = error.message;
                return Alert.alert(errorMsg);
            });

            db.collection('user').add({firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, password: this.state.password, confirmPassword: this.state.confirmPassword});
        }
    }

    userLogin = (emailId, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((response) => {
            // return Alert.alert('Logged in Successfully')
            this.props.navigation.navigate('donateBooks')
        }).catch((error) => {
            var errorCode = error.code;
            var errorMsg = error.message;
            return Alert.alert(errorMsg);
        });
    }

    render() {
        return(
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}> Welcome to the Barter App Please Signup to use the App </Text>
                </View>
                <View>
                    <TextInput style={styles.loginBox}
                    placeholder="Username eg:abc@gmail.com"
                    keyboardType="email-address"
                    onChangeText={(text) => {
                        this.setState({emailId: text});
                    }} />
                    <TextInput style={styles.loginBox}
                    placeholder="Enter Password"
                    secureTextEntry={true}
                    onChangeText={(text) => {
                        this.setState({password: text});
                    }} />
                    <TouchableOpacity style={[styles.button, {marginBottom: 20}]} onPress={() => {
                        this.userLogin(this.state.emailId, this.state.password);
                    }}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword);
                    }}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{ flex:1, backgroundColor:'#F8BE85' }, profileContainer:{ flex:1, justifyContent:'center', alignItems:'center', }, title :{ fontSize:65, fontWeight:'300', paddingBottom:30, color : '#ff3d00' }, loginBox:{ width: 300, height: 40, borderBottomWidth: 1.5, borderColor : '#ff8a65', fontSize: 20, margin:10, paddingLeft:10 }, button:{ width:300, height:50, justifyContent:'center', alignItems:'center', borderRadius:25, backgroundColor:"#ff9800",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8, },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16, },
    buttonText:{ color:'#ffff',
    fontWeight:'200', fontSize:20 },
    buttonContainer:{ flex:1, alignItems:'center' },
    container:{ flex:1, backgroundColor:'#F8BE85', alignItems: 'center', justifyContent: 'center' },
    profileContainer:{ flex:1, justifyContent:'center', alignItems:'center', },
    title :{ fontSize:65, fontWeight:'300', paddingBottom:30, color : '#ff3d00' },
    loginBox:{ width: 300, height: 40, borderBottomWidth: 1.5, borderColor : '#ff8a65', fontSize: 20, margin:10, paddingLeft:10 },
    button:{ width:300, height:50, justifyContent:'center', alignItems:'center', borderRadius:25, backgroundColor:"#ff9800", shadowColor: "#000",
    shadowOffset: { width: 0, height: 8, },
    shadowOpacity: 0.30, shadowRadius: 10.32, elevation: 16, padding: 10 },
    buttonText:{ color:'#ffff', fontWeight:'200', fontSize:20 }
});