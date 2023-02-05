import { useHookstate } from '@hookstate/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { userState } from '../store/AppState';

const SplashScreen = ({ navigation }) => {
  const usersCollection = firestore().collection('Users');
  const user = useHookstate(userState);
  useEffect(async () => {
    const userAsync = await AsyncStorage.getItem('user');
    // let userInfo;
    // await usersCollection.get().then(querySnapshot => {
    //   querySnapshot.forEach(docSnapshot => {
    //     if (docSnapshot.data().email == user.email) {
    //       userInfo = {
    //         email: docSnapshot.data().email,
    //         username: docSnapshot.data().username,
    //       };
    //     }
    //   });
    // });
    user.set(JSON.parse(userAsync));
    setTimeout(() => {
      navigation.navigate('Homescreen');
    }, 3000);
  }, []);
  return (
    <>
      <Image
        source={require('../assets/img/BackgroundImg.png')}
        resizeMode={'cover'}
        style={StyleSheet.absoluteFillObject}
      />
      <View
        style={{
          height: '100%',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../assets/img/Logo.png')}
          resizeMode={'contain'}
          style={{ alignSelf: 'center' }}
        />
      </View>
      <Text
        style={{
          position: 'absolute',
          top: 40,
          left: 20,
          fontSize: 36,
          color: 'white',
        }}>
        Let's make
        <Text style={{ fontWeight: 'bold' }}>{`\nYour Dream \nVacation.`}</Text>
      </Text>
    </>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
