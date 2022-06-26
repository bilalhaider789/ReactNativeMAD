import React, {useState} from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Alert
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

export default function AddProduct({navigation}) {

  const [pimage, setpimage]= useState(null)
  const [ptitle, setptitle]= useState("")
  const [pprice, setpprice]= useState("")
  const [pdesc, setpdesc]= useState("")

  const chooseFile = () => {
    let options = {
        mediaType: 'photo',
        quality: 1,

    };
    ImagePicker.launchImageLibrary(options, (response) => {
        console.log('Response = ', response);
        setpimage(response.assets[0].uri);
    });
};

const addproduct= ()=>{
    if(pimage==null){
        Alert.alert(
            'Error',
            'Please upload picture of Product',
            [
              {
                text: 'OK',
                style: 'cancel',
              },
            ],
          );
    }else if(pprice=="" && ptitle== "" && pdesc==""){
        Alert.alert(
            'Error',
            'Please fill all fields',
            [
              {
                text: 'OK',
                style: 'cancel',
              },
            ],
          );

    }else{
        uploadimage();
        addtofirebase()
    }

}

const uploadimage= async()=>{
    const uploaduri= pimage;
    let filename= uploaduri.substring(uploaduri.lastIndexOf('/')+1)
    console.log(filename)

    try{
        // setuploading(true)
        await storage().ref('images/'+filename).putFile(pimage);
        // setuploading(false)
        Alert.alert(
          "Product Added"
        )
        navigation.navigate("AllProducts");
        
    }
    catch(e){
      console.log(e)
    }

}

const addtofirebase= ()=>{
    let filename= pimage.substring(pimage.lastIndexOf('/')+1)
    const dummy= { title: ptitle, price: pprice, desc: pdesc, imageuri: filename};
    firestore().collection("products").add(dummy).then(()=>{console.log("added")})

}






  return (
    <View>
      <ImageBackground
        source={require('../images/images.jpg')}
        style={{width: '100%', height: '100%'}}>
          <ScrollView>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 30,
            color: 'black',
            marginTop: 15,
          }}>
          ADD Product
        </Text>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              padding: 10,
              marginVertical: 10,
            }}>
            { pimage==null?<Image style={{width: 200, height: 180 ,marginLeft: 10}} source={require('../images/uploadpic.jpg')}/>:
            <Image
              style={{
                width: 300,
                height: 250,
              }}
              resizeMode="contain"
              source={{
                uri: pimage,
              }}
            />}
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              style={{ width: 200, height: 50, backgroundColor: "brown", padding: 10, margin:10, borderRadius: 30}}
              onPress={() => chooseFile()}>
              <Text style={styles.buttonText}>Upload Pic</Text>
            </TouchableOpacity>
            </View>
            </View>
            <View>
            <Text style={{color: 'grey', marginLeft: 12, fontSize: 16}}>Product Title:</Text>
            <TextInput
              style={styles.updateTextInputs}
              placeholder={'Enter new Product title'}
              value={ptitle}
              onChangeText={setptitle}
            />
            <Text style={{color: 'grey', marginLeft: 12, fontSize: 16}}>Product Price:</Text>
            <TextInput
              style={styles.updateTextInputs}
              placeholder={'Enter new Product Price'}
              value={pprice}
              onChangeText={setpprice}
            />
            <Text style={{color: 'grey', marginLeft: 12, fontSize: 16}}>Product Description:</Text>
            <TextInput
                style={[styles.updateTextInputs, styles.updateDesc]}
                placeholder={'Enter Product description'}
                value={pdesc}
                multiline={true}
                onChangeText={setpdesc}
              />
            </View>
            
            
          
          <TouchableOpacity
            style={styles.button}
            onPress={() => {addproduct()}}>
            <Text style={styles.buttonText}>ADD Product</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
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
    borderBottomWidth: 1,
    borderRadius: 50,
    padding: 10,
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 0,
    width: 327,
    textAlign: 'center',
  },
  button: {
    width: 250,
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
  updateTextInputs: {
    borderWidth: 1,
    borderColor: 'black',
    margin: 10,
    borderRadius: 50,
    paddingLeft: 20,
    height: 40,
    width: 350
  },
  
});
