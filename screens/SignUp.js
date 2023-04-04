import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { doc, setDoc } from "firebase/firestore";
import { auth, database, storage } from '../config/firebase';
import { useNavigation } from "@react-navigation/native";
import { Feather, Entypo, AntDesign } from "@expo/vector-icons";

const backImage = require("../assets/SignUp Screen Logo.png");

export default function SignUp({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [displayName, setDisplayName] = useState("");

    const onHandleSignUp = async () => {
        if ((email != "" && password != "" && displayName != "") && (password === passwordConfirm)) {
            const res = await createUserWithEmailAndPassword(auth, email, password)

            try {
                //Update profile
                await updateProfile(res.user, {
                    displayName,
                    // photoURL: downloadURL,
                });
                //create user on firestore
                await setDoc(doc(database, "users", res.user.uid), {
                    id: res.user.uid,
                    displayName,
                    email,
                    type: "ADMIN"
                    // photoURL: downloadURL,
                });

                //create empty user chats on firestore
                await setDoc(doc(database, "userChats", res.user.uid), {});
            } catch (err) {
                console.log(err);
            }
        }
        else if (password !== passwordConfirm) {
            window.alert("Passwords did not match, please try again");
        }
        else {
            window.alert("Please enter valid details");
        }
    };

    const handleChooseProfilePic = async () => {
        //handle Choose profile pic
    }

    return (
        <View style={styles.container}>
            <Image source={backImage} style={styles.backImage} />
            <View style={styles.whiteSheet}>
                <View style={styles.form}>
                    <Text style={styles.title}>Sign Up</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter Display Name'
                        placeholderTextColor={'gray'}
                        autoCapitalize='none'
                        autofocus={true}
                        value={displayName}
                        onChangeText={(text) => setDisplayName(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Enter Email'
                        placeholderTextColor={'gray'}
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
                        placeholderTextColor={'gray'}
                        autoCapitalize='none'
                        autocorrect={false}
                        secureTextEntry={true}
                        textContentType="password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Confirm Password'
                        placeholderTextColor={'gray'}
                        autoCapitalize='none'
                        autocorrect={false}
                        secureTextEntry={true}
                        textContentType="password"
                        value={passwordConfirm}
                        onChangeText={(text) => setPasswordConfirm(text)}
                    />
                    <TouchableOpacity style={styles.mediaButton} onPress={handleChooseProfilePic}>
                        <Feather name='upload' style={{ marginRight: 7 }} size={24} color="#0f4c5c" />
                        <Text style={styles.mediaButtonText}>Upload Profile Picture</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={onHandleSignUp}>
                        <Text style={styles.text}>Sign Up</Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14, marginTop: 20 }}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '600', color: '#0f4c5c' }}>Login</Text>
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
        height: 45,
        width: '55%',
        marginBottom: 15,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
    },
    backImage: {
        height: "70%",
        resizeMode: 'cover',
    },
    whiteSheet: {
        width: '100%',
        height: "75%",
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
    mediaButton: {
        backgroundColor: 'white',
        flexDirection: "row",
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    mediaButtonText: {
        color: '#000',
        fontSize: 15,
    },
    button: {
        backgroundColor: '#0f4c5c',
        height: 55,
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