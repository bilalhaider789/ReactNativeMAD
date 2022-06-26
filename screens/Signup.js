import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';

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

import firestore from '@react-native-firebase/firestore';

export default function Signup({navigation}) {
  const [hidePassword, setHidePassword] = useState(true);
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [cpassword, setcpassword] = useState('');

  const firesignup = () => {
    console.log(132);
    if (
      (name.length != 0) &
      (email.length != 0) &
      (password.length != 0) &
      (cpassword.length != 0)
    ) {
      if (password == cpassword) {
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            console.log('User account created & signed in!');
            navigation.navigate('AllProducts');
            const dummy = {
              email: email,
              name: name,
              admin: false
            };
            firestore()
              .collection('users')
              .add(dummy)
              .then(() => {
                console.log('added');
              });
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }

            console.error(error);
          });
      } else {
        Alert.alert(
          'SignUp Failed',
          'Password & Confirm Password are not same',
          [
            {
              text: 'OK',
              style: 'cancel',
            },
          ],
        );
      }
    } else {
      Alert.alert('SignUp Failed', 'Fill All Fields', [
        {
          text: 'OK',
          style: 'cancel',
        },
      ]);
    }
  };

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
              marginHorizontal: '35%',
              marginBottom: 30,
            }}>
            SIGNUP
          </Text>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Name"
              onChangeText={setname}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Your Email"
              onChangeText={setemail}
            />
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
            <View style={styles.sectionStyle}>
              <TextInput
                style={{paddingLeft: 15, paddingRight: 80}}
                placeholder="Confirm password"
                secureTextEntry={hidePassword}
                onChangeText={setcpassword}
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
              onPress={() => firesignup()}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <Text style={{marginTop: 20, textAlign: 'center', fontSize: 16}}>
            Already have an account.
            <Text
              style={{color: '#E83151'}}
              onPress={() => navigation.push('Login')}>
              Login
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
