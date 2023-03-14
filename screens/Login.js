import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
const backImage = require("../assets/KWR_logo.png");

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onHandleLogin = () => {
        if (email != "" && password != "") {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => console.log("Login Success"))
                .catch((err) => Alert.alert("Login error", err.message));
        }
    };

    return (
        <View style={styles.container}>
            <Image source={backImage} style={styles.backImage} />
            <View style={styles.whiteSheet}>
                <View style={styles.form}>
                    <Text style={styles.title}>Log In</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter Email'
                        autoCapitalize='none'
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        autofocus={true}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Enter Password'
                        autoCapitalize='none'
                        autocorrect={false}
                        secureTextEntry={true}
                        textContentType="password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
                        <Text style={styles.text}>Log In</Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14, marginTop: 20 }}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={{marginTop: 10}}>
                        <Text style={{ fontSize: 16, fontWeight: '600', color: '#0f4c5c' }}> Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#68a19a',
        alignSelf: 'center',
        paddingBottom: 24,
    },
    input: {
        backgroundColor: "#F6F7FB",
        height: 58,
        width: '55%',
        marginBottom: 15,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
    },
    backImage: {
        height: "50%",
        resizeMode: 'cover',
    },
    whiteSheet: {
        width: '100%',
        height: "60%",
        position: "absolute",
        bottom: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 60,
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 200,
        backgroundColor: '#fff'
    },
    button: {
        backgroundColor: '#0f4c5c',
        height: 58,
        width: '55%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
    },
    text: {
        fontSize: 24,
        color: '#ffff',
        alignSelf: 'center',
    }
});