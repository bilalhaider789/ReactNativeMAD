import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ImageBackground,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
export default function Login({navigation}) {
  const [hidePassword, setHidePassword] = useState(true);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [doclist, setdoclist] = useState([]);
  const [usertype, setusertype] = useState(false);

  const firelogin = () => {
    if ((email.length != 0) & (password.length != 0)) {
      auth()
        .signInWithEmailAndPassword("m@gmail.com", "123456")
        .then(() => {
          firestore()
            .collection('users')
            .where('email', '==', email)
            .get()
            .then(querySnapshot => {
              console.log(querySnapshot.docs[0].id);
              console.log(querySnapshot.docs[0]["_data"].admin);
              setusertype(querySnapshot.docs[0]["_data"].admin)
              if(usertype){
                navigation.navigate('AllProducts');
              }
              else{
                navigation.navigate('ViewProducts');
              }

            });

          console.log('User account signed in!');
          
          
        })
        .catch(error => {
          if (error.code === 'auth/wrong-password') {
            Alert.alert(
              'Login Failed',
              'The password is invalid or the user does not have a password',
              [
                {
                  text: 'OK',
                  style: 'cancel',
                },
              ],
            );
          } else if (error.code === 'auth/user-not-found') {
            Alert.alert(
              'Login Failed',
              'There is no user record corresponding to this Email',
              [
                {
                  text: 'OK',
                  style: 'cancel',
                },
              ],
            );
          } else if (error.code === 'auth/invalid-email') {
            console.log("error")
            Alert.alert('Login Failed', 'Invalid Email', [
              {
                text: 'OK',
                style: 'cancel',
              },
            ]);
          } else {
            Alert.alert(
              'Login Failed',
              'Check Your Internet Connection or try again',
              [
                {
                  text: 'OK',
                  style: 'cancel',
                },
              ],
            );
          }

          console.error(error);
        });
    } else {
      Alert.alert('Login Failed', 'Enter Email & Password', [
        {
          text: 'OK',
          style: 'cancel',
        },
      ]);
    }
  };

  const gettype=()=>{
    
    firestore()
            .collection('users')
            .where('email', '==', email)
            .get()
            .then(querySnapshot => {
              console.log(querySnapshot.docs[0].id);
              console.log(querySnapshot.docs[0]["_data"].admin);
            });
  }

  return (
    <View>
      <ImageBackground
        source={require('../images/images.jpg')}
        style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <View style={{height: 60}}></View>
          <Image
            source={require('../images/logo.png')}
            style={{width: 200, height: 200, marginLeft: '25%'}}
          />

          <Text
            style={{
              fontSize: 30,
              color: 'white',
              textAlign: 'center',
              marginBottom: 30,
            }}>
            WELCOME TO Login
          </Text>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Email"
              onChangeText={setemail}
            />
            <View style={{height: 15}}></View>
            <View style={styles.sectionStyle}>
              <TextInput
                style={{paddingLeft: 15, paddingRight: 80}}
                placeholder="Enter your password"
                secureTextEntry={hidePassword}
                onChangeText={setpassword}
              />
              <TouchableOpacity
                onPress={() => {
                  setHidePassword(!hidePassword);
                }}>
                <Image
                  source={{
                    uri: 'https://freeiconshop.com/wp-content/uploads/edd/eye-outline.png',
                  }}
                  style={styles.imageStyle}
                />
              </TouchableOpacity>
            </View>
            <View style={{height: 15}}></View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                firelogin();
              }}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
          </View>

          <Text style={{marginTop: 20, textAlign: 'center', fontSize: 16}}>
            Dont have an account.{' '}
            <Text
              style={{color: '#E83151'}}
              onPress={ () => {
                navigation.push('Signup');
              

                // const ab= firestore().collection('user').doc('abc').get().then(documentSnapshot =>{
                //   if(documentSnapshot.exists)
                //   console.log(documentSnapshot.data["name"])
                // })
                // console.log(ab)
                // let docs = [];
                // firestore()
                //   .collection('user')
                //   .get()
                //   .then(querySnapshot => {
                //     console.log('Total users: ', querySnapshot.size);
                //     querySnapshot.forEach(documentSnapshot => {
                //       console.log(documentSnapshot.data()['name']);
                //       docs.push({...documentSnapshot.data(),id: documentSnapshot.id,
                //       });
                //     });
                //   });
                // console.log(docs[0]);
                // setdoclist(docs);
                // console.log(doclist);
              }}>
              Sign Up
            </Text>
          </Text>
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
    marginBottom: 15,
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
    marginBottom: 15,
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
