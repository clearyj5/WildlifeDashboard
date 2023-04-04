import React, { useState, createContext, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';

import Login from './screens/Login.js';
import SignUp from './screens/SignUp';
import AddCases from './screens/AddCases';
import Alerts from './screens/Alerts';
import Cases from './screens/Cases';
import Chat from './screens/Chat';
import EditDetails from './screens/EditDetails';

const Stack = createStackNavigator();
export const AuthenticatedUserContext = createContext({});

export const AuthenticatedUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  )
}

function MainStack() {
  return (
    <Stack.Navigator defaultScreenOptions={Alerts}>
      <Stack.Screen name='Cases' component={Cases} options={{ headerShown: false }}/>
      <Stack.Screen name='AddCases' component={AddCases} options={{ headerShown: false }}/>
      <Stack.Screen name='Settings' component={Alerts} options={{ headerShown: false }}/>
      <Stack.Screen name='EditDetails' component={EditDetails} options={{ headerShown: false }}/>
      <Stack.Screen name='Chat' component={Chat} options={{ headerShown: true }}/>
    </Stack.Navigator>
  )
}

function AuthStack() {
  return (
    <Stack.Navigator defaultScreenOptions={Login} screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='SignUp' component={SignUp} />
    </Stack.Navigator>
  )
}

function RootNavigator() {
  const { currentUser, setCurrentUser } = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,
      async authenticatedUser => {
        authenticatedUser ? setCurrentUser(authenticatedUser) : setCurrentUser(null);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [currentUser]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    )
  }
  return (
    <NavigationContainer>
      {currentUser ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});