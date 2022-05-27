import React, {useEffect, useState} from 'react';
import { WebView } from 'react-native-webview';
import {Text, View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Qr from '../Qr/index'

Profile.propTypes = {
    
};


function Profile(props) {
  const id = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.798482307307!2d105.7524674147425!3d10.033481592828178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0886a7cfe14df%3A0x34602e2fdca1972d!2zxJDhuqFpIEjhu41jIFkgRMaw4bujYyBD4bqnbiBUaMah!5e0!3m2!1svi!2s!4v1652607368551!5m2!1svi!2s";
  const [address, setAddress] = useState("");
  /* await AsyncStorage.getItem('address'); */
  /* setAddress(data); */
  useEffect(() => {
    const getAddress = async ()=>{
      
      /* return async ()=>{
        await AsyncStorage.removeItem('address');
      } */
      
      console.log('map link',data);
      setAddress(data);
      
    }
    getAddress()
    /* async ()=>{
      try {
        const data = await AsyncStorage.getItem('address');
        if (data !== null) {
          this.setState({address: data});
        }
      } catch (error) {
        
      }
    } */
    
  });
  
  
  
    return (
        
        <WebView
      scalesPageToFit={true}
      bounces={false}
      javaScriptEnabled
      style={{  width: 620 }}
      source={{
        html: `
              <!DOCTYPE html>
              <html>
                <body>
                
                <iframe src= ${id} width="600" height="1070" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </body>
              </html>
        `,
      }}
      automaticallyAdjustContentInsets={false}
    />
    );
}

export default Profile;