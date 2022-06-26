
import React, {useState, useEffect} from 'react';
import { View, Text, Button, ImageBackground,Image, StyleSheet, TextInput} from 'react-native';


import firestore from '@react-native-firebase/firestore';

export default function Search({navigation}){

    const [data,setData] = useState([])
    const [filteredData,setFilteredData] = useState([]);
    const [search,setSearch] = useState('')

    useEffect(()=>{
        if(search.length == 0){
            setFilteredData(data)
        }
        const DUMMY = data.filter(item => item.title.includes(search));     
        setFilteredData(DUMMY);
    },[search])

const getdata=async()=>{
    const arr = []
    const usersCollection = await firestore().collection('products').get();
    usersCollection.docs.forEach(item =>{
        console.log(item._data);
        arr.push(item);
    })
    setData(arr);
    console.log(data);

}
    return(
        <ImageBackground
        source={require('../images/images.jpg')}
        style={{width: '100%', height: '100%'}}>
        <View style={{justifyContent:"center", alignItems: "center", marginTop: 30}}>

            <View style={styles.sectionStyle}>
            <TextInput
              style={{paddingLeft: 15, width: 170, padding: 5}}
              placeholder="Search Item"
              onChangeText={setSearch}
            />
            {/* <MaterialIcons name="search" size={30} /> */}
          </View>
        </View>
        <Button title="abc" onPress={()=>getdata()}></Button>
        {filteredData.map((filteredItem) => {
            <View>
                <Text>{filteredItem.title}</Text>
                <Text>{filteredItem.price}</Text>
                <Text>{filteredItem.desc}</Text>
            </View>
        })}
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
sectionStyle: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 350,
    height:50,
    // borderWidth: 1,
    backgroundColor: 'lightgray',
    borderRadius: 50,
    marginBottom: 15,
    // padding: 5,
    fontSize: 14,
  }
})