import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Image,ScrollView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';

export default function Qr() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loHaiSan, setLoHaiSan] = useState({});
  const [daily, setDaily] = useState({});
  const [donViNuoi, setDonViNuoi] = useState({});
   

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
   console.log("Day la id qr",data);

   const getLoHaiSan = await axios.get(`http://192.168.1.6:3001/data/${data}`);
   console.log("day la id nuoi",getLoHaiSan.data.data[0].idnuoi);
   console.log("lo hai san  + lo hai san",getLoHaiSan.data.data[0])
   setLoHaiSan(getLoHaiSan.data.data[0]);
   /* console.log("lohaisan",loHaiSan); */

    const getDonViNuoi = await axios.get(`http://192.168.1.6:3001/data/donvinuoi/${getLoHaiSan.data.data[0].idnuoi}`);
    setDonViNuoi(getDonViNuoi.data[0]);
   
    await AsyncStorage.setItem('address', JSON.stringify(getDonViNuoi.data[0].map))

    const getdaily = await axios.get(`http://192.168.1.6:3001/data/daily/${getLoHaiSan.data.data[0].iddaily}`); 
    setDaily(getdaily.data[0]);
    setLoading(false);

    
   
  };
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  
  return (
    <>
    <ScrollView>
    
    <View style={styles.barcodebox}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View >
    
    <View style={styles.qrdata}>
         {!loading ?  
         <View style={styles.textcs}>
          
           <Text style={{fontSize: 20,fontWeight: 'bold'}}>Thông Tin Lô Hải Sản </Text>
           <Text>Ngày Đánh Bắt: {moment(loHaiSan.ngaydanhbat).format('DD/MM/YYYY')}</Text>
           <Text>Ngày Chế Biến: {moment(loHaiSan.ngaychebien).format('DD/MM/YYYY')}</Text>
           <Text>Ngày Nuôi: {moment(loHaiSan.ngaynuoi).format('DD/MM/YYYY')}</Text>
           <Text>Số lượng sản phẩm: {loHaiSan.soluong}</Text>
           <Text>Khối Lượng (kg): {loHaiSan.khoiluong}</Text>
           <Text style={{fontSize: 20,fontWeight: 'bold'}}>Thông Tin Đơn Vị Nuôi </Text>
           <Text>Địa chỉ nuôi: {donViNuoi.diachinuoi}</Text>
           <Text>Số điện thoại: {donViNuoi.sdt_dvnuoi}</Text>
           <Text  style={{fontSize: 20, fontWeight: 'bold'}}>Thông Tin Đại lý</Text>
            <Text>Tên Đại lý: {daily.tendaily}</Text>
            <Text>Số điện thoại: {daily.sdt}</Text>
            <Text>Địa chỉ: {daily.diachi}</Text>
            {/* <Image source={{uri: `${sanPham.anh}`}} style={{width: 250, height: 100}} /> */}
            
          </View>
           : <Text>loading...</Text>
        }
    </View>
    
    </ScrollView>
   
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
 textcs: {
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  borderRadius: 30,
 }, 
}); 

 
