
import React, {useState, useEffect} from 'react';
import {
  Button,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions
} from 'react-native';
// import {launchCamera, launchImageLibrary, ImagePicker,} from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const Test2 = ({navigation}) => {
    const [imageTab, setImageTab] = useState([]);
    const [urls, seturls]= useState(["ab"])

    const getall=async()=>{
         storage()
        .ref("images/")
        .listAll()
        .then(function(result) {
            result.items.forEach(function(imageRef) {
                imageRef.getDownloadURL().then(function(url) {
                    setImageTab((prev)=>[...prev,url])
                    // var a=url.split('%2F').pop().split('?')[0];
                    // console.log(a)
                    // seturls([...urls,a])
                    console.log("horah")
                }).catch(function(error) {
                    // Handle any errors
                });
            });
        //    console.log(urls)
        }
        
        ).catch((e) => console.log('Errors while downloading => ', e));

        console.log(imageTab+"abc")

       

    }
    useEffect(()=>{
         getall()
    },[])
  
    const load=()=>{
        seturls(imageTab)
        
    }

    const renderItem = ({ item }) => (

        <TouchableOpacity onPress={() => navigation.navigate('ProductDetail2', item)}>
          <View
            style={{
              padding: 10,
              margin: 10,
              backgroundColor: "white",
              width: w*0.45,
              height: 150
            }}>
            <Image
              style={{
                width: w * 0.4,
                height: 100,
              }}
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

    return (<View>
        <View> 
            <Text>hfjdsafkjl</Text>
            <Button title="press" onPress={()=>getall()}></Button>
            </View>
      {/* {imageTab.map(i=> (<Image style={{height: 200, width: 200}} source={{uri: i}} />) */}
      <FlatList
        data={imageTab}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
      />
        
      
    




      {/* {imageTab.map(i=> (<Text>{i.split('%2F').pop().split('?')[0]}</Text>))}
      {load}
      <Button title= "load" onPress={load}></Button>
      {urls.map(i=> (<Text>{i}</Text>))} */}
        
        
    </View>);
  }
  
  export default Test2;
  