import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useEffect , useState} from 'react';
import axios from 'axios';


export default function App() {
  const [data, setData] = useState([]);
  const [render, setRender] = useState(false);
    useEffect(() => {
      async function render () {
        axios.get('http://192.168.10.14:3001/data')
        .then(data => setData(data.data));
      }
      render();
    },[render])
    console.log(data);

    
  
    async function handlerPostSV() {
     try {
      await axios.post('http:/192.168.10.14:3001/data',{
        name: "triet",
        age: 54,
        address: "123/3e st"
      })
     } catch (error) {
     console.log("🚀 ~ file: App.js ~ line 29 ~ handlerPostSV ~ error", error)
       
     }
      setRender(!render);
    }

  return (
    <View style={styles.container}>
      {
        data.map((sinhvien) =>{
          return(
            <View key={sinhvien.id}>
              <Text >
                {sinhvien.name}+{sinhvien.age}+{sinhvien.address}
              </Text>
            </View>
          )
        })
        
      }
      <StatusBar style="auto" />
      <Button onPress={handlerPostSV} title="ADD"/>
    </View>
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
