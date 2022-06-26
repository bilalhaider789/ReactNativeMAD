import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

export default function Test({navigation}) {
  const [imageUri, setimageUri] = useState(null);
  const [uploading, setuploading] = useState(false);
  const [getimage, setgetimage] = useState(null);
  
  const chooseFile = () => {
    let options = {
        mediaType: 'photo',
        quality: 1,

    };
    ImagePicker.launchImageLibrary(options, (response) => {
        console.log('Response = ', response);
        setimageUri(response.assets[0].uri);
    });
};


const uploadimage= async()=>{
    const uploaduri= imageUri;
    let filename= uploaduri.substring(uploaduri.lastIndexOf('/')+1)
    console.log(filename)

    try{
        setuploading(true)
        await storage().ref('images/abc.png').putFile(imageUri);
        setuploading(false)
        Alert.alert(
          "Image uploaded"
        )
    }
    catch(e){
      console.log(e)
    }

}

const getimaage=async(i)=>{

  try{
    console.log("images/"+i)
    const url = await storage().ref('images/rn_image_picker_lib_temp_e092c8ab-d796-4932-97eb-9287be64ee85.jpg').getDownloadURL();
    console.log (url)
    setgetimage(url)
    console.log("stop")

  }
  catch(e){
    console.log(e)
  }
}
  // const ab= getimaage("abc.png")
  return (
    <SafeAreaView style={styles.container}>
      <View>
        { imageUri ==null ? <Text> Upload Image</Text> : <Image
          source={{uri: getimage}}
          style={{
            height: 300,
            width: 300,
            borderColor: 'black',
            borderWidth: 2,
            marginHorizontal: 20
          }}
        />}
        {
          uploading? <ActivityIndicator size="large" color= "red" />: null
        }
        <Button onPress={() => {chooseFile()}} title="Select Image" />
        <Button onPress={() => {uploadimage()}} title="Upload Image" />
        { getimage ==null ? <Text> no image</Text> : <Image
          source={{uri: getimage}}
          style={{
            height: 300,
            width: 300,
            borderColor: 'black',
            borderWidth: 2,
            marginHorizontal: 20
          }}
        />}
        <Button onPress={() => {getimaage("abc.png")}} title="downlaod Image" />
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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
