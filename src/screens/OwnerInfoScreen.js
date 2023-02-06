import { useHookstate } from '@hookstate/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { StackActions } from '@react-navigation/native';
import React from 'react';
import {
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import BackButton from '../components/BackButton';
import { loadingState, userState } from '../store/AppState';
import { handleError } from './SignUpScreen';

const OwnerInfoScreen = ({ navigation }) => {
  const [ownerName, setOwnerName] = React.useState('');
  const [ownerPhone, setOwnerPhone] = React.useState('');
  const [ownerCnic, setOwnerCnic] = React.useState('');
  const usersCollection = firestore().collection('Users');
  const user = useHookstate(userState);
  const loading = useHookstate(loadingState);

  const onApply = () => {
    if (ownerName.length < 3) {
      const error = 'Please enter a valid name!';
      handleError(error, 'error');
      return false;
    }
    if (ownerPhone.length < 11) {
      const error = 'Please enter a valid phone number!';
      handleError(error, 'error');
      return false;
    }
    if (ownerCnic.length < 13) {
      const error = 'Please enter a valid phone number!';
      handleError(error, 'error');
      return false;
    }
    const userId = user.get().id;
    loading.set(true);
    console.log('inside me!!!!!!!!', user.get());
    usersCollection
      .doc(userId)
      .update({
        'owner.name': ownerName,
        'owner.phone': ownerPhone,
        'owner.cnic': ownerCnic,
        isAgent: true,
      })
      .then(() => {
        console.log('updation done!!!!!!!!!!!!!!1');
        usersCollection
          .doc(userId)
          .get()
          .then(doc => {
            if (doc.exists) {
              const data = { ...doc.data(), id: doc.id };
              user.set(data);
              AsyncStorage.setItem('user', JSON.stringify(data));
              console.log(data);
            }
          });
        loading.set(false);
        handleError('Account switched to agent!', 'success');

        navigation.dispatch(StackActions.popToTop());
      })
      .catch(error => {
        handleError(error.code, 'error');
        console.log(error);
        loading.set(false);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={{
          flex: 1,
          paddingVertical: 20,
          paddingHorizontal: 10,
          backgroundColor: '#fff',
        }}>
        <BackButton />
        <View>
          <Text
            style={{
              color: 'black',
              fontSize: 24,
              fontWeight: 'bold',
              marginTop: 20,
              textAlign: 'center',
            }}>
            Company's Owner Information
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              marginTop: 20,
              textAlign: 'center',
            }}>
            Please fill in the following information to complete your account
            registration.
          </Text>
        </View>
        <TextInput
          disabled={loading.get()}
          mode="outlined"
          label="Owner Name"
          value={ownerName}
          keyboardType={'default'}
          style={{ marginTop: 20, backgroundColor: 'rgb(205, 231, 235)' }}
          activeOutlineColor="#013237"
          onChangeText={text => setOwnerName(text)}
        />
        <TextInput
          disabled={loading.get()}
          mode="outlined"
          label="Owner Phone"
          value={ownerPhone}
          keyboardType={'phone-pad'}
          style={{ marginTop: 20, backgroundColor: 'rgb(205, 231, 235)' }}
          activeOutlineColor="#013237"
          onChangeText={text => setOwnerPhone(text)}
          maxLength={11}
        />
        <TextInput
          disabled={loading.get()}
          mode="outlined"
          label="Owner CNIC"
          value={ownerCnic}
          keyboardType={'phone-pad'}
          style={{ marginTop: 20, backgroundColor: 'rgb(205, 231, 235)' }}
          activeOutlineColor="#013237"
          onChangeText={text => setOwnerCnic(text)}
          maxLength={13}
        />
        <TouchableOpacity
          disabled={loading.get()}
          onPress={onApply}
          style={{
            marginTop: 20,
            backgroundColor: '#013237',
            padding: 20,
            borderRadius: 5,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Switch to Agent
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default OwnerInfoScreen;
