import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Image,ScrollView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import moment from 'moment'

export default function Qr() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loHaiSan, setLoHaiSan] = useState({});
  const [sanPham, setSanPham] = useState({});
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
   console.log(data);
   const getLoHaiSan = await axios.get(`http://192.168.1.6:3001/data/${data}`);
   setLoHaiSan(getLoHaiSan.data.data[1]);
   const getsanpham = await axios.get(`http://192.168.1.6:3001/data/sanpham/${getLoHaiSan.data.data[1].idsanpham}`);
   setSanPham(getsanpham.data[0]);
   const getDonViNuoi = await axios.get(`http://192.168.1.6:3001/data/donvinuoi/${getLoHaiSan.data.data[1].idnuoi}`);
   setDonViNuoi(getDonViNuoi.data[0]);
   setLoading(false)
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
           <Text  style={{fontSize: 20, fontWeight: 'bold'}}>SAN PHAM </Text>
            <Text>Tên sản phẩm: {sanPham.tensanpham}</Text>
            <Image source={{uri: `${sanPham.anh}`}} style={{width: 300, height: 140}} />
            <Text>Giá của sản phẩm{sanPham.giasanpham}</Text>
            <Text>Mô tả{sanPham.mota}</Text>
           <Text style={{fontSize: 20,fontWeight: 'bold'}}>LO HAI SAN </Text>
           <Text>Khoi luong: {loHaiSan.khoiluong}</Text>
           <Text>Ngay danh bat: {moment(loHaiSan.ngaydanhbat).format('DD/MM/YYYY')}</Text>
           <Text>Ngay che bien: {moment(loHaiSan.ngaychebien).format('DD/MM/YYYY')}</Text>
           <Text>Ngay nuoi: {moment(loHaiSan.ngaynuoi).format('DD/MM/YYYY')}</Text>
           <Text style={{fontSize: 20,fontWeight: 'bold'}}>DON VI NUOI </Text>
           <Text>Giá của sản phẩm{donViNuoi.diachinuoi}</Text>
           <Text>Giá của sản phẩm{donViNuoi.sdt_dvnuoi}</Text>
           <Text>So luong sản phẩm{loHaiSan.soluong}</Text>

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

 
