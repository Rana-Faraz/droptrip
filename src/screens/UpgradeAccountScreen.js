import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BackButton from '../components/BackButton';

const UpgradeAccountScreen = ({ navigation }) => {
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
          Upgrade Account to Agent
        </Text>
        <Image
          source={require('../assets/img/upgrade.png')}
          style={{ width: '90%', height: 300, alignSelf: 'center' }}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          marginTop: 20,
          marginLeft: 20,
        }}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: 'green',
              marginRight: 10,
            }}
          />
          <Text style={{ color: 'black', fontSize: 16 }}>
            Publish your trips
          </Text>
        </View>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: 'green',
              marginRight: 10,
            }}
          />
          <Text style={{ color: 'black', fontSize: 16 }}>
            Grow your business
          </Text>
        </View>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: 'green',
              marginRight: 10,
            }}
          />
          <Text style={{ color: 'black', fontSize: 16 }}>
            Get more bookings
          </Text>
        </View>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: 'green',
              marginRight: 10,
            }}
          />
          <Text style={{ color: 'black', fontSize: 16 }}>Earn more money</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Agent Info')}
        style={{
          backgroundColor: '#013237',
          paddingVertical: 20,
          borderRadius: 5,
          marginTop: 20,
          position: 'absolute',
          bottom: 20,
          width: '90%',
          alignSelf: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Upgrade Now
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpgradeAccountScreen;

const styles = StyleSheet.create({});
