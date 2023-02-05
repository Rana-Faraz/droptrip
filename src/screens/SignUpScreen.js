import { useHookstate } from '@hookstate/core';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect } from 'react';
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
import ImagePicker from 'react-native-image-crop-picker';
import UserAvatar from 'react-native-user-avatar';
import { loadingState, userImageState, usernameState } from '../store/AppState';

export const handleError = (text, type) => {
  ToasterHelper.show({
    text: text,
    type: type,
    timeout: 5000,
  });
};

const SignUpScreen = ({ navigation }) => {
  const user = useHookstate(usernameState);
  const userImage = useHookstate(userImageState);
  const loading = useHookstate(loadingState);
  const usersCollection = firestore().collection('Users');

  const handleUsername = async () => {
    let username = false;
    loading.set(true);

    const re = /^[0-9a-zA-Z._]*$/;
    if (user.get().length < 3) {
      const error = 'Username must be greater than 3!';
      handleError(error, 'error');
      loading.set(false);
      return false;
    }

    if (!re.test(user.get())) {
      const error = 'No Special Charechters except `. _ `';
      handleError(error, 'error');
      loading.set(false);
      return false;
    }

    await usersCollection.get().then(querySnapshot => {
      querySnapshot.forEach(docSnapshot => {
        if (
          docSnapshot.data().username.toLowerCase() == user.get().toLowerCase()
        ) {
          username = true;
        }
      });
    });

    console.log('username exists: ' + username);

    if (username) {
      const error = 'username: ' + user.get() + ' already exists!';
      handleError(error, 'error');
      loading.set(false);
      return false;
    } else {
      loading.set(false);
      navigation.navigate('Email');
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleImagePicker = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
      multiple: false,
    })
      .then(image => {
        userImage.set(image);
        console.log(userImage.get().path);
      })
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/img/LogoSmall.png')}
        style={{ alignSelf: 'center', marginTop: 30 }}
      />
      <View style={styles.imageContainer}>
        {userImage.get().path ? (
          <Image
            source={{ uri: userImage.get().path }}
            style={{ height: 100, width: 100, borderRadius: 50 }}
          />
        ) : (
          <UserAvatar size={100} name={user.get()} style={{ width: 100 }} />
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '50%',
          }}>
          <TouchableOpacity onPress={handleImagePicker}>
            <Text style={{ color: 'black' }}>
              {userImage.get() == '' ? 'Upload Image' : 'Change Image'}
            </Text>
          </TouchableOpacity>
          {userImage.get() != '' && (
            <TouchableOpacity onPress={() => userImage.set('')}>
              <Text style={{ color: 'black' }}>Remove Image</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          placeholderTextColor={'black'}
          value={user.get()}
          onChangeText={text => user.set(text)}
        />
        <TouchableOpacity
          style={[
            styles.button,
            { opacity: user.get() == '' || loading.get() ? 0.5 : 1 },
          ]}
          disabled={user.get() == '' || loading.get()}
          onPress={() => handleUsername()}>
          {loading.get() ? (
            <ActivityIndicator size={18} color={'white'} />
          ) : (
            <Text style={{ color: 'white' }}>Continue</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;

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
  },
  button: {
    backgroundColor: '#013237',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    padding: 20,
    borderRadius: 12,
  },
  imageContainer: {
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    alignItems: 'center',
  },
});
