import React, {useEffect, useState} from 'react';
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
  Button,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import storage from '@react-native-firebase/storage';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const productsData = [
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


export default function Show({navigation}) {
  const [plist, setPlist] = useState([]);
	const [img,setImg] = useState()
  const getProducts = () => {
    const subscriber = firestore()
      .collection('products')
      .onSnapshot(querySnapshot => {
        const productArray = [];

        querySnapshot.forEach(documentSnapshot => {
          productArray.push({
            ...documentSnapshot.data(),
            pid: documentSnapshot.id,
          });
        });
        setPlist(productArray);
        console.log(plist);

        // setLoading(false);
      });
    // console.log(books[0]);

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  };

  // useEffect(() => {
  //   getProducts();
  // }, []);

	const getimaage=async( img )=>{

		try{
			console.log("start")
			const url = await storage().ref('images/'+img).getDownloadURL();
			console.log("stop")
			// const l= await url.json()
			console.log(url)
			setImg(url)
			// return url
	
		}
		catch(e){
			console.log(e)
		}
	};
	
  const renderItem = ({item}) => {
		
		console.log(item.imageuri) 
		// const img= getimaage(item.imageuri)
		// setImg(getimaage(item.imageuri))
		getimaage(item.imageuri)
		 console.log("AAAA")
		 console.log(img)
		
		return(
		
    <TouchableOpacity
		
      onPress={() => getimaage(item.imageuri)}>
      <View
        style={{
          padding: 10,
          margin: 10,
          backgroundColor: 'white',
          width: w * 0.45,
          height: 300,
        }}>
        <Image
          style={{
            width: w * 0.4,
            height: 100,
          }}
          source={{
            uri: img,
          }}
        />
        <Text
          style={{
            fontSize: 24,
            color: 'red',
            textAlign: 'center',
            paddingVertical: 10,
            fontWeight: '500',
          }}>
          {item.title}
        </Text>
        <Text style={{textAlign: 'center'}}>{item.desc}</Text>
        <Text style={{fontSize: 18, textAlign: 'center', color: 'green'}}>
          {item.price}
        </Text>
      </View>
    </TouchableOpacity>
  )};

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../images/images.jpg')}
        style={{width: '100%', height: '100%'}}>
        <FlatList
          data={plist}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
        />
        <Button title="get" onPress={getProducts}></Button>
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
