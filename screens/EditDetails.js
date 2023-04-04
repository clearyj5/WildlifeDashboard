import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button, SafeAreaView } from 'react-native';
import { Feather, Entypo, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc, orderBy, query, onSnapshot, updateDoc, getDoc, doc, where } from 'firebase/firestore';
import { auth, database } from '../config/firebase';
import { signOut } from "firebase/auth";

const EditDetails = ({ route }) => {

    const caseID = String.toString(route.params.paramkey);

    const [status, setStatus] = useState("");
    const [title, setTitle] = useState("");
    const [species, setSpecies] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [mopName, setMopName] = useState("");
    const [mopAddress, setMopAddress] = useState("");
    const [mopPhone, setMopPhone] = useState("");
    const [files, setFiles] = useState([]);
    const [notes, setNotes] = useState("");

    const navigation = useNavigation();

    const onHandleSubmit = async () => {
        
    }

    const onSignOut = () => {
        signOut(auth).catch(error => console.log('Error logging out: ', error));
    };

    const handleChooseFiles = () => {
        // Handle case submission
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbar}>
                <TouchableOpacity style={styles.navButton && { width: 80 }} onPress={() => navigation.navigate("Cases")}>
                    <Text style={styles.navButtonTextUnclicked}>Cases</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton && { width: 80 }} onPress={() => navigation.navigate("Settings")}>
                    <Text style={styles.navButtonTextUnclicked}>Alerts</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton && { width: 140 }} onPress={() => navigation.navigate("AddCases")}>
                    <Text style={styles.navButtonTextUnclicked}>Add New Case</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton && { width: 80 }} onPress={() => navigation.navigate("Chat")}>
                    <Text style={styles.navButtonTextUnclicked}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ right: 10 }} onPress={onSignOut}>
                    <AntDesign name="logout" size={24} color={"#e5e5e5"} style={{ marginRight: 10 }} />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Edit Case Details</Text>
                <View style={styles.form}>
                    <View style={styles.column}>
                        <Text style={styles.heading}>Status</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Case Status"
                            onChangeText={(text) => setStatus(text)}
                            value={status}
                            editable="false"
                            placeholderTextColor="grey"
                        />
                        <Text style={styles.heading}>Title</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Case Title"
                            onChangeText={(text) => setTitle(text)}
                            value={title}
                            placeholderTextColor="grey"
                        />
                        <Text style={styles.heading}>Species</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Species"
                            onChangeText={(text) => setSpecies(text)}
                            value={species}
                            editable="false"
                            placeholderTextColor="grey"
                        />
                        <Text style={styles.locationHeading}>Longitude</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Longitude"
                            onChangeText={(text) => setLongitude(text)}
                            value={longitude}
                            placeholderTextColor="grey"
                        />
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.heading}>Member of Public - Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Member of Public Name"
                            onChangeText={(text) => setMopName(text)}
                            value={mopName}
                            placeholderTextColor="grey"
                        />
                        <Text style={styles.heading}>Member of Public - Address</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Member of Public Home Address"
                            onChangeText={(text) => setMopAddress(text)}
                            value={mopAddress}
                            placeholderTextColor="grey"
                        />
                        <Text style={styles.heading}>Member of Public - Phone</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Member of Public Phone Number"
                            onChangeText={(text) => setMopPhone(text)}
                            value={mopPhone}
                            placeholderTextColor="grey"
                        />
                        <Text style={styles.locationHeading}>Latitude</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Latitude"
                            onChangeText={(text) => setLatitude(text)}
                            value={latitude}
                            placeholderTextColor="grey"
                        />
                    </View>
                </View>
                <View style={styles.formBottom}>
                    <Text style={styles.locationHeading}>Notes</Text>
                    <TextInput
                        style={styles.notesInput}
                        multiline={true}
                        placeholder="Enter any further Notes..."
                        onChangeText={(text) => setNotes(text)}
                        value={notes}
                        placeholderTextColor="grey"
                    />
                    <TouchableOpacity style={styles.mediaButton} onPress={handleChooseFiles}>
                        <Feather name='upload' style={{ marginRight: 7 }} size={24} color="#0f4c5c" />
                        <Text style={styles.mediaButtonText}>Upload Media</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={onHandleSubmit}>
                        <Text style={styles.buttonText}>Submit Changes</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'top',
        alignItems: 'center',
    },
    locationContainer: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: "row",
        alignItems: 'center',
    },
    form: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: 1000,
    },
    formBottom: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        width: 1000,
        paddingHorizontal: 30
    },
    column: {
        flex: 1,
        paddingHorizontal: 30,
        height: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 700,
        paddingVertical: 30,
        color: '#0f4c5c',
    },
    heading: {
        fontSize: 16,
        fontWeight: 500,
        marginBottom: 10,
    },
    locationHeading: {
        fontSize: 16,
        fontWeight: 500,
        marginBottom: 10,
        marginTop: 10,
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
        padding: 10,
        width: '100%',
        height: 100,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#0f4c5c',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 5,
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
        width: '100%'
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

export default EditDetails;
