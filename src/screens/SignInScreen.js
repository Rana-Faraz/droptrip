import { useHookstate } from '@hookstate/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ToasterHelper } from 'react-native-customizable-toast';
import { Ionicons } from '../assets/Icons/Ionicons';
import { loadingState, userState } from '../store/AppState';

const SignInScreen = () => {
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const loading = useHookstate(loadingState);

  const user = useHookstate(userState);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const usersCollection = firestore().collection('Users');

  const handleError = (text, type) => {
    ToasterHelper.show({
      text: text,
      type: type,
      timeout: 5000,
    });
  };

  const handleSignIn = () => {
    loading.set(true);
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
    );
    if (!pattern.test(email)) {
      const error = 'Please enter a valid email address!';
      handleError(error, 'error');
      loading.set(false);
      return false;
    }

    if (pass.length < 8) {
      const error = `Password must be 8 digits or more!`;
      handleError(error, 'error');
      loading.set(false);
      return false;
    }

    auth()
      .signInWithEmailAndPassword(email, pass)
      .then(async () => {
        console.log('Logged in!');
        usersCollection
          .doc(auth().currentUser.uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              const data = { ...doc.data(), id: doc.id };
              user.set(data);
              AsyncStorage.setItem('user', JSON.stringify(data));
              console.log(data);
            }
          })
          .then(() => {
            loading.set(false);
          });
      })
      .catch(err => {
        loading.set(false);
        console.log(err.code);
        if (err.code == 'auth/wrong-password') {
          const error = 'The password you entered is wrong!';
          handleError(error, 'error');
          return false;
        }
        if (err.code == 'auth/user-not-found') {
          const error = 'Email not found!';
          handleError(error, 'error');
          return false;
        } else {
          handleError(err.code, 'error');
          console.log(err);
          return false;
        }
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/img/LogoSmall.png')}
        style={{ alignSelf: 'center', marginTop: 30 }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          placeholderTextColor={'black'}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <View style={styles.textInput}>
          <TextInput
            style={{
              alignSelf: 'center',
              width: '90%',
              textAlign: 'center',
              paddingHorizontal: 25,
              color: 'black',
            }}
            placeholder="Password"
            placeholderTextColor={'black'}
            value={pass}
            onChangeText={text => setPass(text)}
            textContentType={'password'}
            keyboardType={'default'}
            enablesReturnKeyAutomatically
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setPasswordVisible(!passwordVisible)}>
            {passwordVisible ? (
              <Ionicons name={'eye-outline'} color={'black'} size={24} />
            ) : (
              <Ionicons name={'eye-off-outline'} color={'black'} size={24} />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          disabled={email == '' || loading.get()}
          onPress={() => handleSignIn()}>
          {loading.get() ? (
            <ActivityIndicator size={18} color={'white'} />
          ) : (
            <Text style={{ color: 'white' }}>Log In</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    flex: 1,
  },
  textInput: {
    backgroundColor: '#E9F8E7',
    width: '70%',
    textAlign: 'center',
    color: 'black',
    borderRadius: 12,
    marginBottom: 20,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#013237',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    padding: 20,
    borderRadius: 12,
  },
  inputContainer: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    right: 10,
    alignSelf: 'center',
  },
});
