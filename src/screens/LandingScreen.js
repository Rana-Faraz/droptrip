import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const LandingScreen = ({ navigation }) => {
  return (
    <>
      <Image
        source={require('../assets/img/BackgroundImg.png')}
        resizeMode={'cover'}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.container}>
        <View style={{ height: '50%', justifyContent: 'center' }}>
          <Image source={require('../assets/img/Logo.png')} />
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.buttonTxt}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonTrans}
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.buttonTxt}>Create An Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#013237',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 12,
  },
  buttonTrans: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
  },
  buttonTxt: {},
});
