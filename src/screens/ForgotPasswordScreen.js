import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Text } from 'react-native-paper';
import BackButton from '../components/BackButton';
import { Feather } from '../assets/Icons/FeatherIcons';
import { ToasterHelper } from 'react-native-customizable-toast';
import auth from '@react-native-firebase/auth';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState();
  const [emailActive, setEmailActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleError = (text, type) => {
    ToasterHelper.show({
      text: text,
      type: type,
      timeout: 5000,
    });
  };

  const handleReset = () => {
    Keyboard.dismiss();
    setLoading(true);
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
    );

    if (!pattern.test(email)) {
      const error = 'Please enter a valid email address!';
      handleError(error, 'error');
      setLoading(false);
      return false;
    }
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setLoading(false);
        console.log('Password reset email sent!');
        handleError('Password reset email sent!', 'success');
      })
      .catch(err => {
        setLoading(false);
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
          Reset Password
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            marginTop: 20,
            textAlign: 'center',
          }}>
          Enter your email address to recieve a link to reset your password.
        </Text>
      </View>
      <View style={styles.textInput}>
        <View
          style={{
            padding: 10,
            opacity: emailActive ? 1 : 0.5,
          }}>
          <Feather name="mail" size={24} color="black" />
        </View>
        <TextInput
          editable={!loading}
          style={{ width: '100%', color: 'black' }}
          placeholder="Email"
          placeholderTextColor={'black'}
          value={email}
          onChangeText={text => setEmail(text)}
          textContentType={'emailAddress'}
          keyboardType={'email-address'}
          enablesReturnKeyAutomatically
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={() => setEmailActive(true)}
          onBlur={() => setEmailActive(false)}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        disabled={email == '' || loading}
        onPress={() => handleReset()}>
        {loading ? (
          <ActivityIndicator size={18} color={'white'} />
        ) : (
          <Text style={{ color: 'white' }}>Send Link</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#E9F8E7',
    width: '70%',
    textAlign: 'center',
    color: 'black',
    borderRadius: 12,
    marginBottom: 20,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: 90,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#013237',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    padding: 20,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 20,
  },
});
