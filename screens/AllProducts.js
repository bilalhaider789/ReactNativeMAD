import React, {useState,useEffect} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

import storage from '@react-native-firebase/storage';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const productsData = [
  {
    id: 3,
    title: 'Graphic Card',
    price: '1000$',
    desc: 'This is gamming keyboard',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD2Rtwh2HSoExFFvyXL628TaiCnL6ShtogMg&usqp=CAU',
  },
  {
    id: 4,
    title: 'Graphic Card',
    price: '1000$',
    desc: 'This is gamming keyboard',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD2Rtwh2HSoExFFvyXL628TaiCnL6ShtogMg&usqp=CAU',
  },
  {
    id: 4,
    title: 'Graphic Card',
    price: '1000$',
    desc: 'This is gamming keyboard',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD2Rtwh2HSoExFFvyXL628TaiCnL6ShtogMg&usqp=CAU',
  },
];

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default function AllProducts({navigation}) {
  const [imageTab, setImageTab] = useState([]);
  const getall = async () => {
    storage()
      .ref('images/')
      .listAll()
      .then(function (result) {
        result.items.forEach(function (imageRef) {
          imageRef
            .getDownloadURL()
            .then(function (url) {
              setImageTab(prev => [...prev, url]);
              console.log('horah');
            })
            .catch(function (error) {});
        });
      })
      .catch(e => console.log('Errors while downloading => ', e));

    console.log(imageTab + 'abc');
  };

  useEffect(()=>{
    getall()
},[])

const renderItem = ({ item }) => (

  <TouchableOpacity onPress={() => navigation.navigate('ProductDetail2', item)}>
    <View
      style={{
        margin: 10,
        backgroundColor: "white",
        width: w*0.45,
        height: 150,
        flex:0,
        justifyContent: "center"
      }}>
      <Image
        style={{
          width: w * 0.4,
          height: 140,


        }}
        resizeMode="contain"
        source={{
          uri: item,
        }}
      />
      {/* <Text
        style={{
          fontSize: 24,
          color: 'red',
          textAlign: 'center',
          paddingVertical: 10,
          fontWeight: '500',
        }}>
        {item.title}
      </Text>
      <Text style={{textAlign: 'center',}}>{item.desc}</Text>
      <Text style={{fontSize: 18, textAlign: 'center', color: 'green'}}>
        {item.price} */}
      {/* </Text> */}
    </View>
  </TouchableOpacity>
);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../images/images.jpg')}
        style={{width: '100%', height: '100%'}}>
        <FlatList
          data={imageTab}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
        />
        <View style={{height: 50, width: w, backgroundColor: "white", flexDirection: "row", borderTopColor: "grey", borderTopWidth: 2}}>
          <TouchableOpacity onPress={()=> navigation.navigate("AddProduct")}>
          <View style={{height: 50, width: w*0.5, justifyContent: "center", alignItems: "center"}}> 
          <Text> Add Products</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate("Search")}>
          <View style={{height: 50, width: w*0.5, justifyContent: "center", alignItems: "center"}}> 
          <Text> Search Products</Text>
          </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

// const renderItem = ({ item }) => (

//   <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', item)}>
//     <View
//       style={{
//         padding: 10,
//         margin: 10,
//         backgroundColor: "white",
//         width: w*0.45,
//         height: 300
//       }}>
//       <Image
//         style={{
//           width: w * 0.4,
//           height: 100,
//         }}
//         source={{
//           uri: item.url,
//         }}
//       />
//       <Text
//         style={{
//           fontSize: 24,
//           color: 'red',
//           textAlign: 'center',
//           paddingVertical: 10,
//           fontWeight: '500',
//         }}>
//         {item.title}
//       </Text>
//       <Text style={{textAlign: 'center',}}>{item.desc}</Text>
//       <Text style={{fontSize: 18, textAlign: 'center', color: 'green'}}>
//         {item.price}
//       </Text>
//     </View>
//   </TouchableOpacity>
// );
