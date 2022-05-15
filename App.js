import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { useEffect , useState} from 'react';
import axios from 'axios';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { NativeRouter, Route, Link } from 'react-router-native';
import Qr  from './components/Qr/index';
import Home from './components/Home/index'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import Profile from './components/Profile';


 function MyTab() {
  const [data, setData] = useState([]);
  const [render, setRender] = useState(false);
  const Tab = createBottomTabNavigator();

  // scan
  

    useEffect(() => {
      async function render () {
        axios.get('http://192.168.1.15/data')
        .then(data => setData(data.data));
      }
      render();

    },[render])
    console.log(data);

    // scan
    

    
  
    /* async function handlerPostSV() {
     try {
      await axios.post('http://192.168.1.5data',{
        name: "triet",
        age: 54,
        address: "123/3e st"
      })
     } catch (error) {
     console.log("🚀 ~ file: App.js ~ line 29 ~ handlerPostSV ~ error", error)
       
     }
      setRender(!render);
    } */

  return (
      
      <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
    >
     {/*  <Tab.Screen
        name="HOME PAGE"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="QR SCAN"
        component={Qr}
        options={{
          tabBarLabel: 'QR Scan',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="qrcode" color={color} size={size} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Map"
        component={Profile}
        options={{
          tabBarLabel: 'Google Map',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <MyTab />
    </NavigationContainer>
  );
}