import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';

export default function Qr() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [id, setId] = useState(null);
  const [data, setData] = useState([]);
  
   

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      console.log(id);
    })();

  }, []);
 

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    /* alert(`Bar code with type ${type} and data ${data} has been scanned!`); */
   console.log(data);
   const gethttp = await axios.get(`http://192.168.1.15:3001/data/${data}`);
   console.log(gethttp.data);
   setData(gethttp.data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
    <View style={styles.barcodebox}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View >
    <View style={styles.qrdata}>
      {data && data.map((item, index) => {
        return (
          <View key={index}>
            <Text>Tên sản phẩm: {item.tensanpham}</Text>
            <Image source={{uri: `${item.anh}`}} style={{width: 300, height: 140}} />
            <Text>Giá của sản phẩm{item.giasanpham}</Text>
            <Text>Mô tả{item.mota}</Text>
          </View>
        )
      })}
    </View>
    </>
    

  );
}

const styles = StyleSheet.create({  
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    width: 400,
    overflow: 'hidden',
    borderRadius: 30,
 }, 
 qrdata: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 30,
 }, 
}); 

 
