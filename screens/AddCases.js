import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Feather, Entypo, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


const AddCases = () => {
    const [status, setStatus] = useState('');
    const [title, setTitle] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [mopName, setMopName] = useState("");
    const [mopAddress, setMopAddress] = useState("");
    const [mopPhone, setMopPhone] = useState("");
    const [files, setFiles] = useState(null);
    const [notes, setNotes] = useState("");
    
    const navigation = useNavigation();

    const handleCaseSubmit = () => {
        // Handle case submission
    };

    const handleChooseFiles = () => {
        // Handle case submission
    };

    const handleCasesPress = () => {
    };

    const handleAddNewPress = () => {
    };


    return (
        <View style={styles.container}>
            <View style={styles.navbar}>
                <TouchableOpacity style={styles.navButton && { width: 80 }} onPress={() => navigation.navigate("Cases")}>
                    <Text style={styles.navButtonTextUnclicked}>Cases</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton && { width: 90 }} onPress={() => navigation.navigate("Settings")}>
                    <Text style={styles.navButtonTextUnclicked}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton && { width: 120 }}>
                    <Text style={styles.navButtonTextClicked}>Add New Case</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.form}>
                <Text style={styles.title}>Add Case</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Case Status"
                    onChangeText={(text) => setStatus(text)}
                    value={status}
                    editable="false"
                    placeholderTextColor="grey"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Title"
                    onChangeText={(text) => setTitle(text)}
                    value={title}
                    placeholderTextColor="grey"
                />
                <View style={styles.locationContainer}>
                    <TextInput
                        style={styles.locationInput}
                        placeholder="Longitude"
                        onChangeText={(text) => setLongitude(text)}
                        value={longitude}
                        placeholderTextColor="grey"
                    />
                    <TextInput
                        style={styles.locationInput}
                        placeholder="Latitude"
                        onChangeText={(text) => setLatitude(text)}
                        value={latitude}
                        placeholderTextColor="grey"
                    />
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Member of Public Name"
                    onChangeText={(text) => setMopName(text)}
                    value={mopName}
                    placeholderTextColor="grey"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Member of Public Address"
                    onChangeText={(text) => setMopAddress(text)}
                    value={mopAddress}
                    placeholderTextColor="grey"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Member of Public Phone"
                    onChangeText={(text) => setMopPhone(text)}
                    value={mopPhone}
                    placeholderTextColor="grey"
                />
                <TextInput
                    style={styles.notesInput}
                    placeholder="Notes"
                    onChangeText={(text) => setNotes(text)}
                    value={notes}
                    placeholderTextColor="grey"
                />
                <TouchableOpacity style={styles.mediaButton} onPress={handleChooseFiles}>
                    <Feather name='upload' style={{ marginRight: 7 }} size={24} color="#0f4c5c" />
                    <Text style={styles.mediaButtonText}>Upload Media</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleCaseSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

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
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '49%',
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

export default AddCases;
