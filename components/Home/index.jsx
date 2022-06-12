import React from "react";
import { Text, Image, Button, View } from "react-native";

Home.propTypes = {};

function Home(props) {
  return (
    <>
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 20,
          }}
        >
          Báo cáo tiểu luận 2022
        </Text>

        <Image
          source={{ uri: "https://career.gpo.vn/uploads/images/1(37).jpg" }}
          style={{ width: 300, height: 300, justifyContent: "center" }}
        />
        <Text  style={{
            fontWeight: 'bold',
            fontSize: 20,
            marginTop: 20,fontWeight: 'bold',
            textAlign: 'center',
          }}>
          XÂY DỰNG HỆ THỐNG TRUY XUẤT NGUỒN GỐC SẢN PHẨM HẢI SẢN
        </Text>
        

      </View>
    </>
  );
}

export default Home;
