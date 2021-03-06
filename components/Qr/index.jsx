import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  ScrollView,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WebView } from "react-native-webview";
import { DataTable } from "react-native-paper";

export default function Qr() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loHaiSan, setLoHaiSan] = useState({});
  const [daily, setDaily] = useState({});
  const [donViNuoi, setDonViNuoi] = useState({});
  const [scaning, setScaning] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
      console.log(id);
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    /* alert(`Bar code with type ${type} and data ${data} has been scanned!`); */
    console.log("Day la id qr", data);

    const getLoHaiSan = await axios.get(
      `http://192.168.1.85:3001/data/${data}`
    );
    console.log("day la id nuoi", getLoHaiSan.data.data[0].idnuoi);
    console.log("lo hai san  + lo hai san", getLoHaiSan.data.data[0]);
    setLoHaiSan(getLoHaiSan.data.data[0]);
    /* console.log("lohaisan",loHaiSan); */

    const getDonViNuoi = await axios.get(
      `http://192.168.1.85:3001/data/donvinuoi/${getLoHaiSan.data.data[0].idnuoi}`
    );
    setDonViNuoi(getDonViNuoi.data[0]);

    /* async () => {
      try {
        await AsyncStorage.setItem('address', JSON.stringify(donViNuoi.map))
      } catch (error) {
        console.log(error)
      }
    } */
    await AsyncStorage.setItem("address", getDonViNuoi.data[0].map);

    const getdaily = await axios.get(
      `http://192.168.1.85:3001/data/daily/${getLoHaiSan.data.data[0].iddaily}`
    );
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
          {scanned && (
            <Button
              title={"Tap to Scan Again"}
              onPress={() => setScanned(false)}
            />
          )}
        </View>

        <View>
          {!loading ? (
            <View>
              {/* Bang thong tin lo hai san */}
              <View style={styles.container}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Th??ng Tin L?? h???i s???n{" "}
                </Text>
                <DataTable>
                  <DataTable.Row>
                    <DataTable.Cell>M?? s???</DataTable.Cell>
                    <DataTable.Title>{loHaiSan.idlo}</DataTable.Title>
                  </DataTable.Row>
                  <DataTable.Header>
                    <DataTable.Cell>Ng??y nu??i</DataTable.Cell>
                    <DataTable.Title>
                      {moment(loHaiSan.ngaynuoi).format("DD/MM/YYYY")}
                    </DataTable.Title>
                  </DataTable.Header>

                  <DataTable.Row>
                    <DataTable.Cell>Ng??y ????nh b???t</DataTable.Cell>
                    <DataTable.Title>
                      {moment(loHaiSan.ngaydanhbat).format("DD/MM/YYYY")}
                    </DataTable.Title>
                  </DataTable.Row>

                  <DataTable.Row>
                    <DataTable.Cell>Ng??y ch??? bi???n</DataTable.Cell>
                    <DataTable.Title>
                      {moment(loHaiSan.ngaychebien).format("DD/MM/YYYY")}
                    </DataTable.Title>
                  </DataTable.Row>

                  <DataTable.Row>
                    <DataTable.Cell>S??? l?????ng s???n ph???m</DataTable.Cell>
                    <DataTable.Title>{loHaiSan.soluong}</DataTable.Title>
                  </DataTable.Row>

                  <DataTable.Row>
                    <DataTable.Cell>Kh???i l?????ng</DataTable.Cell>
                    <DataTable.Title>{loHaiSan.khoiluong}</DataTable.Title>
                  </DataTable.Row>
                </DataTable>
              </View>

              <View style={styles.container}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Th??ng Tin ?????i l??
                </Text>

                <DataTable>
                  <DataTable.Row>
                    <DataTable.Cell>M?? s???</DataTable.Cell>
                    <DataTable.Title>{daily.iddaily}</DataTable.Title>
                  </DataTable.Row>
                  <DataTable.Header>
                    <DataTable.Cell>T??n ?????i l??</DataTable.Cell>
                    <DataTable.Title>{daily.tendaily}</DataTable.Title>
                  </DataTable.Header>

                  <DataTable.Row>
                    <DataTable.Cell>?????a ch???</DataTable.Cell>
                    <DataTable.Title>{daily.diachi}</DataTable.Title>
                  </DataTable.Row>

                  <DataTable.Row>
                    <DataTable.Cell>S??? ??i???n tho???i</DataTable.Cell>
                    <DataTable.Title>{daily.sdt}</DataTable.Title>
                  </DataTable.Row>
                </DataTable>
              </View>
              {/* Bang thong tin lo don vi nuoi */}
              <View style={styles.container}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Th??ng Tin ????n V??? Nu??i{" "}
                </Text>
                <DataTable>
                  <DataTable.Row>
                    <DataTable.Cell>M?? s???</DataTable.Cell>
                    <DataTable.Title>{donViNuoi.idnuoi}</DataTable.Title>
                  </DataTable.Row>
                  <DataTable.Header>
                    <DataTable.Cell>T??n ????n v??? nu??i</DataTable.Cell>
                    <DataTable.Title>{donViNuoi.tendonvinuoi}</DataTable.Title>
                  </DataTable.Header>

                  <DataTable.Row>
                    <DataTable.Cell>?????a ch??? nu??i</DataTable.Cell>
                    <DataTable.Title>{donViNuoi.diachinuoi}</DataTable.Title>
                  </DataTable.Row>

                  <DataTable.Row>
                    <DataTable.Cell>S??? ??i???n tho???i</DataTable.Cell>
                    <DataTable.Title>{donViNuoi.sdt_dvnuoi}</DataTable.Title>
                  </DataTable.Row>
                </DataTable>
              </View>

              <WebView
                scalesPageToFit={true}
                bounces={false}
                javaScriptEnabled
                style={{ width: 620, height: 800 }}
                source={{
                  html: `
                <!DOCTYPE html>
                <html>
                  <body>
                  
                  <iframe src= ${donViNuoi.map} width="600" height="1070" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                  </body>
                </html>
          `,
                }}
                automaticallyAdjustContentInsets={false}
              />
            </View>
          ) : (
            // <Text
            // style={{textAlignVertical: "center",textAlign: "center", fontWeight: "bold", fontSize: 20}}
            // >
            //   loading...
            // </Text>
            <Image
              source={{ uri: "https://genk.mediacdn.vn/thumb_w/640/2015/1-1477901-1450843193145.jpg" }}
              style={{ width: 400, height: 300, marginLeft: 0 }}
            />
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 400,
    width: 400,
    overflow: "hidden",
    borderRadius: 30,
  },
  qrdata: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 30,
  },
  textcs: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 30,
  },
  container: {
    paddingTop: 50,
    paddingHorizontal: 30,
  },
});
