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
  Alert,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import storage from '@react-native-firebase/storage';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

export default function ViewDetails({route, navigation}) {
  const rimage = route.params;
  const [item, setitem] = useState({});
  const [itemid, setitemid] = useState();
  var imguri = route.params.split('%2F').pop().split('?')[0];

  console.log(imguri);

  const getdata = () => {
    firestore()
      .collection('products')
      .where('imageuri', '==', imguri)
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot.docs[0].id);
        console.log(querySnapshot.docs[0]);
        setitem(querySnapshot.docs[0]._data);
        setitemid(querySnapshot.docs[0].id);
      });
  };
   getdata();

  const delproduct = () => {
    firestore()
      .collection('products')
      .doc(itemid)
      .delete()
      .then(() => {
        Alert.alert("Product Deleted")
      });
    let imageRef = storage().ref('images/' + imguri);
    imageRef
      .delete()
      .then(() => {
        console.log(`${imageName}has been deleted successfully.`);
      })
      .catch(e => console.log('error on image deletion => ', e));
      navigation.navigate("AllProducts")
  };

  //   useEffect =
  //     (() => {
  //       getdata();
  //     },
  //     []);

  return (
    <View>
      <ImageBackground
        source={require('../images/images.jpg')}
        style={{width: '100%', height: '100%'}}>
            
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text
            style={{
              textAlign: 'center',
              fontSize: 30,
              color: 'black',
              marginBottom: 50,
            }}>
            Product Details
          </Text>
          <View
            style={{
              padding: 10,
              marginVertical: 10,
            }}>
            <Image
              style={{
                width: w * 1 - 20,
                height: 200,
              }}
              resizeMode="contain"
              source={{
                uri: rimage,
              }}
            />
            <Text
              style={{
                fontSize: 24,
                color: 'black',
                textAlign: 'center',
                paddingVertical: 10,
                fontWeight: '500',
              }}>
              Title of Product:
              {'  ' + item.title}
            </Text>
            <Text style={{fontSize: 18, textAlign: 'center', color: 'black'}}>
              Description: {' ' + item.desc}
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontSize: 18,
                textAlign: 'center',
                color: 'green',
              }}>
              Price: {' ' + item.price}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: 327,
              height: 50,
              borderRadius: 50,
              backgroundColor: 'orange',
              padding: 10,
              marginBottom: 15,
              marginTop: 50
            }}
            onPress={() => navigation.goBack()
            }>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-between',
  },
  heading: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 145,
    color: '#E83151',
  },
  form: {
    flex: 0,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
    paddingLeft: 20,
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 0,
    width: 327,
  },
  button: {
    width: 327,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#387780',
    padding: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 30,
  },
  fb: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    padding: 5,
    width: 170,
    borderRadius: 5,
  },
  sectionStyle: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 327,
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 5,
    padding: 5,
    fontSize: 14,
  },
  imageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
  },
});
