import { useHookstate } from '@hookstate/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import BackButton from '../components/BackButton';
import { loadingState, userState } from '../store/AppState';
import { handleError } from './SignUpScreen';

const AgentInfoScreen = ({ navigation }) => {
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const usersCollection = firestore().collection('Users');
  const user = useHookstate(userState);
  const loading = useHookstate(loadingState);

  const onApply = () => {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
    );
    if (companyName.length < 3) {
      const error = 'Please enter a valid company name!';
      handleError(error, 'error');
      return false;
    }
    if (companyAddress.length < 10) {
      const error = 'Please enter a valid company address!';
      handleError(error, 'error');
      return false;
    }
    if (companyPhone.length < 11) {
      const error = 'Please enter a valid company phone number!';
      handleError(error, 'error');
      return false;
    }
    if (!pattern.test(companyEmail)) {
      const error = 'Please enter a valid company email!';
      handleError(error, 'error');
      return false;
    }
    const userId = auth().currentUser;
    loading.set(true);
    usersCollection
      .doc(userId.uid)
      .update({
        'company.name': companyName,
        'company.address': companyAddress,
        'company.phone': companyPhone,
        'company.email': companyEmail,
      })
      .then(() => {
        usersCollection
          .doc(userId.uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              const data = doc.data();
              user.set(data);
              AsyncStorage.setItem('user', JSON.stringify(data));
              console.log(data);
            }
          });
        loading.set(false);
        navigation.navigate('Owner Info');
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
            Company Information
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              marginTop: 20,
              textAlign: 'center',
            }}>
            Please fill in the following information to complete your agent
            account.
          </Text>
        </View>
        <TextInput
          disabled={loading.get()}
          mode="outlined"
          label="Company Name"
          value={companyName}
          keyboardType={'default'}
          style={{ marginTop: 20, backgroundColor: 'rgb(205, 231, 235)' }}
          activeOutlineColor="#013237"
          onChangeText={text => setCompanyName(text)}
        />
        <TextInput
          disabled={loading.get()}
          mode="outlined"
          label="Company Address"
          value={companyAddress}
          style={{ marginTop: 20, backgroundColor: 'rgb(205, 231, 235)' }}
          activeOutlineColor="#013237"
          keyboardType={'default'}
          onChangeText={text => setCompanyAddress(text)}
        />
        <TextInput
          disabled={loading.get()}
          mode="outlined"
          label="Company Phone"
          value={companyPhone}
          style={{ marginTop: 20, backgroundColor: 'rgb(205, 231, 235)' }}
          activeOutlineColor="#013237"
          keyboardType={'phone-pad'}
          onChangeText={text => setCompanyPhone(text)}
        />
        <TextInput
          disabled={loading.get()}
          mode="outlined"
          label="Company Email"
          autoComplete="email"
          value={companyEmail}
          style={{ marginTop: 20, backgroundColor: 'rgb(205, 231, 235)' }}
          activeOutlineColor="#013237"
          keyboardType={'email-address'}
          onChangeText={text => setCompanyEmail(text)}
        />
        <TouchableOpacity
          onPress={() => onApply()}
          disabled={
            companyName === '' ||
            companyAddress === '' ||
            companyPhone === '' ||
            companyEmail === '' ||
            loading.get()
          }
          style={{
            backgroundColor: '#013237',
            paddingVertical: 20,
            borderRadius: 5,
            marginTop: 20,
            width: '90%',
            alignSelf: 'center',
            opacity:
              companyName === '' ||
              companyAddress === '' ||
              companyPhone === '' ||
              companyEmail === ''
                ? 0.5
                : 1,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AgentInfoScreen;

const styles = StyleSheet.create({});
