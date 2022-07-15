import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text } from 'react-native';
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import ImageScreen from './screens/ImageScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import pexelsLogo from './assets/pexels.jpeg';

const Stack = createNativeStackNavigator();


export default function App() {

  const [openSearch, setOpenSearch] = useState(false)

  return (
    <NavigationContainer>
        <Stack.Navigator>
              <Stack.Screen name="HomeScreen" 
              // component={HomeScreen}
                    options={{
                      headerLeft: () => <Image source={pexelsLogo} style={styles.logo}/>,
                      headerRight: () => (
                        <Text style={{color: 'white', fontSize: 18}}
                              onPress={() => setOpenSearch(!openSearch)}>
                                {openSearch ? "Close" : "Search"}
                              </Text>
                      ),
                      title: "Pexels App",
                      // headerTitleStyle:{
                      //   color: '#fff',
                      // },
                      headerTintColor: '#fff',
                      headerTitleStyle:{
                        fontWeight: 'bold',
                      },
                      headerStyle: {
                          backgroundColor: "#0d0d0d",
                      },
                    }}
                >
                  {(props) => <HomeScreen {...props} openSearch={openSearch}/>}
               </Stack.Screen>
                  
              <Stack.Screen name="ImageScreen" component={ImageScreen} 
              options={{
                title: "Pexels App",
                headerTintColor: '#fff',
                headerTitleStyle:{
                  fontWeight: 'bold',
                },
                headerStyle: {
                    backgroundColor: "#0d0d0d",
                },
              }} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 38,
    height: 38,
    marginBottom: 4,
    marginRight: 4,
    marginEnd:4,
    borderRadius: 5,
    paddingBottom: 5,
  },

});
