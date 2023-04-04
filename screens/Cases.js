import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { Feather, Entypo, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { doc, setDoc } from "firebase/firestore";
import { collection, addDoc, orderBy, query, onSnapshot, where } from 'firebase/firestore';
import { auth, database } from '../config/firebase';
import { signOut } from "firebase/auth";

const Cases = () => {

  const navigation = useNavigation();

  const onSignOut = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };

  const [actives, setActives] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [rescued, setRescued] = useState([]);

  useEffect(() => {

    const collectionRef = collection(database, 'cases');
    const activeQuery = query(collectionRef, where("status", "==", "Active"));

    const unsubscribe1 = onSnapshot(activeQuery, querySnapshot => {
      console.log('querySnapshot unsusbscribe');
      setActives(
        querySnapshot.docs.map(doc => ({
          id: doc.data().id,
          latitude: doc.data().latitude,
          longitude: doc.data().longitude,
          mopName: doc.data().mopName,
          mopAddress: doc.data().mopAddress,
          mopPhone: doc.data().mopPhone,
          notes: doc.data().notes,
          responders: doc.data().responders,
          species: doc.data().species,
          status: doc.data().status,
          title: doc.data().title,
        }))
      );
    });
    return unsubscribe1;
  }, [navigation], []);

  useEffect(() => {

    const collectionRef = collection(database, 'cases');
    const inProgressQuery = query(collectionRef, where("status", "==", "In Progress"));

    const unsubscribe2 = onSnapshot(inProgressQuery, querySnapshot => {
      console.log('querySnapshot unsusbscribe');
      setInProgress(
        querySnapshot.docs.map(doc => ({
          id: doc.data().id,
          latitude: doc.data().latitude,
          longitude: doc.data().longitude,
          mopName: doc.data().mopName,
          mopAddress: doc.data().mopAddress,
          mopPhone: doc.data().mopPhone,
          notes: doc.data().notes,
          responders: doc.data().responders,
          species: doc.data().species,
          status: doc.data().status,
          title: doc.data().title,
        }))
      );
    });
    return unsubscribe2;
  }, [navigation], []);

  useEffect(() => {

    const collectionRef = collection(database, 'cases');
    const rescuedQuery = query(collectionRef, where("status", "==", "Rescued"));

    const unsubscribe3 = onSnapshot(rescuedQuery, querySnapshot => {
      console.log('querySnapshot unsusbscribe');
      setRescued(
        querySnapshot.docs.map(doc => ({
          id: doc.data().id,
          latitude: doc.data().latitude,
          longitude: doc.data().longitude,
          mopName: doc.data().mopName,
          mopAddress: doc.data().mopAddress,
          mopPhone: doc.data().mopPhone,
          notes: doc.data().notes,
          responders: doc.data().responders,
          species: doc.data().species,
          status: doc.data().status,
          title: doc.data().title,
        }))
      );
    });
    return unsubscribe3;
  }, [navigation], []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navButton && { width: 80 }}>
          <Text style={styles.navButtonTextClicked}>Cases</Text>
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
      <View style={styles.form}>
        <View style={styles.column}>
          <Text style={styles.title}>Active</Text>
          <FlatList
            style={styles.flatlist}
            data={actives}
            numColumns={1}
            scrollsToTop={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.item} onPress={(item) => navigation.navigate("EditDetails", { paramKey: item.id })}>
                <View style={styles.innerContainer}>
                  <Text style={styles.heading}>{item.title}</Text>
                  <Text style={styles.text}>{item.species}</Text>
                  <Text style={styles.text}>{item.status}</Text>
                  <Text style={styles.text}>{item.longitude}</Text>
                  <Text style={styles.text}>{item.latitude}</Text>
                  <Text style={styles.text}>{item.mopName}</Text>
                  <Text style={styles.text}>{item.mopAddress}</Text>
                  <Text style={styles.text}>{item.mopPhone}</Text>
                  <Text style={styles.text}>{item.notes}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.column}>
          <Text style={styles.title}>In Progress</Text>
          <FlatList
            style={styles.flatlist}
            data={inProgress}
            numColumns={1}
            scrollsToTop={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.item} onPress={(item) => navigation.navigate("EditDetails", { paramKey: item.id })}>
                <View style={styles.innerContainer}>
                  <Text style={styles.heading}>{item.title}</Text>
                  <Text style={styles.text}>{item.species}</Text>
                  <Text style={styles.text}>{item.status}</Text>
                  <Text style={styles.text}>{item.longitude}</Text>
                  <Text style={styles.text}>{item.latitude}</Text>
                  <Text style={styles.text}>{item.mopName}</Text>
                  <Text style={styles.text}>{item.mopAddress}</Text>
                  <Text style={styles.text}>{item.mopPhone}</Text>
                  <Text style={styles.text}>{item.notes}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.column}>
          <Text style={styles.title}>Rescued</Text>
          <FlatList
            style={styles.flatlist}
            data={rescued}
            numColumns={1}
            scrollsToTop={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.item} onPress={(item) => navigation.navigate("EditDetails", { paramKey: item.id })}>
                <View style={styles.innerContainer}>
                  <Text style={styles.heading}>{item.title}</Text>
                  <Text style={styles.text}>{item.species}</Text>
                  <Text style={styles.text}>{item.status}</Text>
                  <Text style={styles.text}>{item.longitude}</Text>
                  <Text style={styles.text}>{item.latitude}</Text>
                  <Text style={styles.text}>{item.mopName}</Text>
                  <Text style={styles.text}>{item.mopAddress}</Text>
                  <Text style={styles.text}>{item.mopPhone}</Text>
                  <Text style={styles.text}>{item.notes}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Cases

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 100,
    flexDirection: 'row',
    paddingTop: 50,
  },
  column: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    flexDirection: 'column',
    height: 670
  },
  flatlist: {
    height: '100%',
    width: '90%',
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0f4c5c',
    alignSelf: 'center',
    paddingBottom: 24,
  },
  item: {
    backgroundColor: '#85ccc3',
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
  },
  innerContainer: {
    alignItems: "center",
    flexDirection: "column",
  },
  heading: {
    fontWeight: "bold",
  },
  text: {
    fontWeight: '300',
    paddingTop: 5,
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