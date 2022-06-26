import React from 'react';
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
  Alert
} from 'react-native';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

export default function ProductDetail({route, navigation}) {

  return (
    <View>
      <ImageBackground
        source={require('../images/images.jpg')}
        style={{width: '100%', height: '100%'}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
              source={{
                uri: route.params.url,
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
              {'  ' + route.params.title}
            </Text>
            <Text style={{fontSize: 18, textAlign: 'center', color: 'black'}}>
              Description: {' ' + route.params.desc}
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontSize: 18,
                textAlign: 'center',
                color: 'green',
              }}>
              Price: {' ' + route.params.price}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('UpdateProduct',route.params)}>
            <Text style={styles.buttonText}>Update Product</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 327,
              height: 50,
              borderRadius: 50,
              backgroundColor: 'orange',
              padding: 10,
              marginBottom: 15,
            }}
            onPress={() => Alert.alert(
                "Confirm Delete",
                "This Product will be permanently deleted",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "Delete", style:"destructive",onPress: () => {console.log("OK Pressed")} }
                ]
              )}>
            <Text style={styles.buttonText}>Delete Product</Text>
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
