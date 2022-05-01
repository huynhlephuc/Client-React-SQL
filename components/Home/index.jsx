import React from 'react';
import {Text , Image, Button } from 'react-native'

Home.propTypes = {
    
};


function Home(props) {
    return (
        <>
          <Text>Tên công ty</Text>
          <Image source={{uri: 'https://onlinepngtools.com/images/examples-onlinepngtools/google-logo-transparent.png'}} style={{width: 300, height: 140}} />
          
          
        </>
    );
}

export default Home;