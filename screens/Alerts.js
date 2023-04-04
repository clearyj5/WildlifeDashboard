import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { Feather, Entypo, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { auth, database } from '../config/firebase';
import { collection, addDoc, orderBy, query, onSnapshot, setDoc, Timestamp, updateDoc } from 'firebase/firestore';

export default function Alerts() {

    const navigation = useNavigation();

    const [alert, setAlert] = useState();
    const [data, setData] = useState();

    const onHandleSubmit = async () => {

        const docRef = await addDoc(collection(database, "alerts"), {
            text: alert,
            createdAt: Timestamp.now(),
            readBy: [],
        });

        await updateDoc(docRef, {
            id: docRef.id,
        })

        setAlert("");
    }

    useEffect(() => {

        const collectionRef = collection(database, 'alerts');
        const q = query(collectionRef, orderBy('createdAt', "desc"));

        const unsubscribe = onSnapshot(q, querySnapshot => {
            console.log('querySnapshot unsusbscribe');
            setData(
                querySnapshot.docs.map(doc => ({
                    text: doc.data().text,
                    createdAt: doc.data().createdAt.toDate().toString(),
                }))
            );
        });
        return unsubscribe;
    }, [navigation], []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navbar}>
                <TouchableOpacity style={styles.navButton && { width: 80 }} onPress={() => navigation.navigate("Cases")}>
                    <Text style={styles.navButtonTextUnclicked}>Cases</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton && { width: 80 }} >
                    <Text style={styles.navButtonTextClicked}>Alerts</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton && { width: 140 }} onPress={() => navigation.navigate("AddCases")}>
                    <Text style={styles.navButtonTextUnclicked}>Add New Case</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton && { width: 80 }} onPress={() => navigation.navigate("Chat")}>
                    <Text style={styles.navButtonTextUnclicked}>Chat</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.form}>
                <Text style={styles.title}>Alerts</Text>
                <TextInput
                    style={styles.notesInput}
                    multiline={true}
                    value={alert}
                    onChangeText={setAlert}
                    placeholder="Type here to add new message..."
                    placeholderTextColor={'gray'}
                />
                <TouchableOpacity style={styles.button} onPress={onHandleSubmit}>
                    <Text style={styles.buttonText}>Post Alert</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Past Alerts</Text>
                <View style={styles.scrollContainer}>
                    <FlatList
                        style={{ height: '100%', width: '100%' }}
                        data={data}
                        numColumns={1}
                        scrollsToTop={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.item}>
                                <View style={styles.innerContainer}>
                                    <Text style={styles.heading}>{item.text}</Text>
                                    <Text style={styles.text}>{item.createdAt}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                    {/* <FlatList
                            data={data}
                            renderItem={({ item }) => <Item title={item.message} />}
                            keyExtractor={item => item.id}
                        /> */}
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        height: 400,
        width: '70%',
        marginBottom: 30
    },
    heading: {
        fontWeight: "bold",
    },
    text: {
        fontWeight: '300',
    },
    item: {
        backgroundColor: '#e5e5e5',
        padding: 15,
        borderRadius: 15,
        margin: 5,
        marginHorizontal: 10,

    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
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
        marginBottom: 10,
        marginTop: 30,
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
        width: '70%',
        height: 80,
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
        width: '70%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 15,
        marginBottom: 20,
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
        paddingHorizontal: 5,
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