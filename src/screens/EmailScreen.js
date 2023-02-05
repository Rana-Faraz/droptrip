import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useHookstate } from '@hookstate/core';
import {
  emailState,
  loadingState,
  passwordState,
  userImageState,
  usernameState,
  userState,
} from '../store/AppState';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ToasterHelper } from 'react-native-customizable-toast';
import { Ionicons } from '../assets/Icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';

const EmailScreen = ({ navigation }) => {
  const email = useHookstate(emailState);
  const password = useHookstate(passwordState);
  const username = useHookstate(usernameState);
  const loading = useHookstate(loadingState);
  const user = useHookstate(userState);
  const image = useHookstate(userImageState);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const usersCollection = firestore().collection('Users');

  const handleError = (text, type) => {
    ToasterHelper.show({
      text: text,
      type: type,
      timeout: 5000,
    });
  };

  const handleSignup = async () => {
    loading.set(true);
    let url;
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
    );
    if (!pattern.test(email.get())) {
      const error = 'Please enter a valid email address!';
      handleError(error, 'error');
      loading.set(false);
      return false;
    }

    if (password.get().length < 8) {
      const error = `Password must be 8 digits or more!`;
      handleError(error, 'error');
      loading.set(false);
      return false;
    }

    auth()
      .createUserWithEmailAndPassword(email.get(), password.get())
      .then(async () => {
        if (image.get() != '') {
          const pathToFile = `${email.get()}/images/${image
            .get()
            .path.split('/')
            .pop()}`;
          const imageRef = storage().ref(pathToFile);
          console.log(image.get().path);
          await imageRef
            .putFile(image.get().path)
            .then(() => {
              console.log('Done!!!!!!!!!');
            })
            .catch(err => console.log(err.code));

          url = await imageRef.getDownloadURL().catch(err => console.log(err));

          console.log(url);
        }

        console.log('User account created & signed in!');
        usersCollection.doc(auth().currentUser.uid).set({
          name: '',
          image: url ? url : '',
          username: username.get(),
          email: email.get(),
          dateCreated: new Date(),
          isAdmin: false,
          isAgent: false,
          isVerified: false,
          favorites: [],
          company: {
            name: '',
            address: '',
            phone: '',
            email: '',
          },
          owner: {
            name: '',
            phone: '',
            cnic: '',
          },
        });
      })
      .then(async () => {
        let userInfo;
        await usersCollection.get().then(querySnapshot => {
          querySnapshot.forEach(docSnapshot => {
            if (
              docSnapshot.data().email.toLowerCase() ==
              email.get().toLowerCase()
            ) {
              userInfo = { ...docSnapshot.data(), id: docSnapshot.id };
            }
            console.log(userInfo);
          });
        });
        await AsyncStorage.setItem('user', JSON.stringify(userInfo));
        loading.set(false);
        user.set(userInfo);
      })
      .catch(error => {
        loading.set(false);
        if (error.code === 'auth/email-already-in-use') {
          const error = 'This email address is already in use!';
          handleError(error, 'error');
          return false;
        }

        if (error.code === 'auth/invalid-email') {
          const error = 'This email address is invalid!';
          handleError(error, 'error');
          return false;
        }

        handleError(error, 'error');
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
          value={email.get()}
          keyboardType={'email-address'}
          textContentType={'emailAddress'}
          onChangeText={text => email.set(text)}
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
            value={password.get()}
            onChangeText={text => password.set(text)}
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
          disabled={loading.get()}
          onPress={() => {
            console.log('email: ', email.get(), 'password: ', password.get());
            handleSignup();
          }}>
          {loading.get() ? (
            <ActivityIndicator size={18} color={'white'} />
          ) : (
            <Text style={{ color: 'white' }}>Sign Up</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    flex: 1,
  },
  inputContainer: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
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
  icon: {
    position: 'absolute',
    right: 10,
    alignSelf: 'center',
  },
});
