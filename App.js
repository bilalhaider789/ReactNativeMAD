import React, {useState, useEffect} from 'react';
import { View, Text, Button, ImageBackground,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import auth from '@react-native-firebase/auth';
import Signup from './screens/Signup'
import Login from './screens/Login';
import AllProducts from './screens/AllProducts';
import Test from './screens/test';
import Test2 from './screens/test2';
import ProductDetail from './screens/ProductDetail';
import UpdateProduct from './screens/UpdateProduct';
import AddProduct from './screens/AddProduct';
import Show from './screens/Show';
import ProductDetail2 from './screens/ProductDetail2';
import Search from './screens/Search';
import ViewProducts from './screens/ViewProducts';
import ViewDetails from './screens/ViewDetails';





const Stack = createNativeStackNavigator();

function App() {

  const [status, setstatus]= useState('')
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName= { !user? "Login": "AllProducts"}>
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
      <Stack.Screen name="Signup" component={Signup} options={{headerShown:false}} />
      <Stack.Screen name="AllProducts" component={AllProducts} 
      options={({navigation}) => ({
        headerTitle: () => <Text style={{fontWeight: 'bold', fontSize: 18}}>All Products</Text>,
        headerRight: () => <Button title="Logout"  style={{ }} color="red" 
        onPress={() => {
          navigation.navigate('Login');
          auth().signOut().then(() => console.log('User signed out!'));}} />,
      })} />
        <Stack.Screen name="UpdateProduct" component={UpdateProduct}   options={({navigation}) => ({
        headerTitle: () => <Text style={{fontWeight: 'bold', fontSize: 18}}></Text>
  
      })}/>
      <Stack.Screen name="AddProduct" component={AddProduct}   options={({navigation}) => ({
        headerTitle: () => <Text style={{fontWeight: 'bold', fontSize: 18}}></Text>
  
      })}/>
      <Stack.Screen name="Test" component={Test} options={{headerShown:false}} />
      <Stack.Screen name="Test2" component={Test2} options={{headerShown:false}} />
      <Stack.Screen name="Show" component={Show} options={{headerShown:false}} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} options={{headerShown:false}} />
      <Stack.Screen name="ProductDetail2" component={ProductDetail2} options={({navigation}) => ({
        headerTitle: () => <Text style={{fontWeight: 'bold', fontSize: 18}}>Product Details</Text>})} />
      <Stack.Screen name="Search" component={Search} options={({navigation}) => ({
        headerTitle: () => <Text style={{fontWeight: 'bold', fontSize: 18}}> Search</Text>})} />
      
      <Stack.Screen name="ViewProducts" component={ViewProducts} 
      options={({navigation}) => ({
        headerTitle: () => <Text style={{fontWeight: 'bold', fontSize: 18}}>All Products</Text>,
        headerRight: () => <Button title="Logout"  style={{ }} color="red" 
        onPress={() => {
          navigation.navigate('Login');
          auth().signOut().then(() => console.log('User signed out!'));
        }} />,  
      })}/>
      <Stack.Screen name="ViewDetails" component={ViewDetails} options={{headerShown: false}} />
      
      
    </Stack.Navigator>
  </NavigationContainer>
  );

}
export default App;





// const Drawer = createDrawerNavigator();

// function Drawerroutes() {
//   return (
//       <Drawer.Navigator initialRouteName="Home">
//         <Drawer.Screen name="Home" component={Home} options={{ headerShown: false }} />
//       </Drawer.Navigator>
//   );
// }


// function DetailsScreen({ navigation, route }) {
  
//   const  abc  = route.params;
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text> {abc[0]} </Text>
//       <Button
//         title="Go etails... again"
//         onPress={() => navigation.goBack()}
//       />
//       <Text> </Text>
//     </View>
//   );
// }

{/* <Stack.Screen name="DetailsScreen" component={DetailsScreen} options={{ title: 'cren 2', headerTintColor: 'blue',
          headerTitleStyle: {
            fontWeight: 'bold',
          },headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="Info"
              color="red"
            />
          ), }}/> */}