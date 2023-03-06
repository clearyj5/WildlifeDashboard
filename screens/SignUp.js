import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { doc, setDoc } from "firebase/firestore";
import { auth, database, storage } from '../config/firebase';
import { useNavigation } from "@react-navigation/native";
const backImage = require("../assets/KWR_logo.png");

export default function SignUp({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState("");

    const onHandleSignUp = async () => {
        if (email != "" && password != "" && displayName != "") {
            const res = await createUserWithEmailAndPassword(auth, email, password)

            try {
                //Update profile
                await updateProfile(res.user, {
                    displayName,
                    // photoURL: downloadURL,
                });
                //create user on firestore
                await setDoc(doc(database, "users", res.user.uid), {
                    uid: res.user.uid,
                    displayName,
                    email,
                    // photoURL: downloadURL,
                });

                //create empty user chats on firestore
                await setDoc(doc(database, "userChats", res.user.uid), {});
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Image source={backImage} style={styles.backImage} />
            <View style={styles.whiteSheet}>
                <View style={styles.form}>
                    <Text style={styles.title}>Sign Up</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter Display Name'
                        autoCapitalize='none'
                        autofocus={true}
                        value={displayName}
                        onChangeText={(text) => setDisplayName(text)}
                    />
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
                    <TouchableOpacity style={styles.button} onPress={onHandleSignUp}>
                        <Text style={styles.text}>Sign Up</Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'gray', fontweight: '600', fontSize: 14, marginTop: 20 }}>Already have an account? </Text>
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
        height: 58,
        width: '55%',
        marginBottom: 15,
        fontsize: 16,
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