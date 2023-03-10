import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Feather, Entypo, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Settings() {

    const navigation = useNavigation();

    const [alert, setAlert] = useState("Hello");

    return (
        <View style={styles.container}>
            <View style={styles.navbar}>
                <TouchableOpacity style={styles.navButton && { width: 80 }} onPress={() => navigation.navigate("Cases")}>
                    <Text style={styles.navButtonTextUnclicked}>Cases</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton && { width: 90 }} >
                    <Text style={styles.navButtonTextClicked}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton && { width: 120 }} onPress={() => navigation.navigate("AddCases")}>
                    <Text style={styles.navButtonTextUnclicked}>Add New Case</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.form}>
                <Text style={styles.title}>Alerts</Text>
                <TextInput
                    style={styles.input}
                    value={alert}
                    onChangeText={setAlert}
                />
                <TouchableOpacity style={styles.button} onPress={console.log(alert)}>
                    <Text style={styles.buttonText}>Save Changes</Text> 
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                />
                <TextInput
                    style={styles.input}
                />
                <TouchableOpacity style={styles.mediaButton} >
                    <Feather name='upload' style={{ marginRight: 7 }} size={24} color="#0f4c5c" />
                    <Text style={styles.mediaButtonText}>Upload Media</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    locationContainer: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: "row",
        alignItems: 'center',
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 100,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    notesInput: {
        textAlignVertical: 'top',
        textAlign: 'left',
        paddingLeft: 10,
        paddingBottom: 60,
        width: '100%',
        height: 100,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    locationInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        marginEnd: 15,
    },
    button: {
        backgroundColor: '#0f4c5c',
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 15,
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
    buttonText: {
        color: '#fff',
        fontSize: 20,
    },
    mediaButtonText: {
        color: '#000',
        fontSize: 15,
    },
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-start",
        backgroundColor: '#0f4c5c',
        height: 50,
        paddingHorizontal: 20,
    },
    navButton: {
        paddingVertical: 10,
    },
    navButtonTextClicked: {
        color: '#fff',
        textDecorationLine: "underline",
        fontSize: 16,
        fontWeight: 'bold',
    },
    navButtonTextUnclicked: {
        color: '#fff',
        textDecorationLine: "none",
        fontSize: 16,
        fontWeight: 'bold',
    },
});