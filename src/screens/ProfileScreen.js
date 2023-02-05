import { useHookstate } from '@hookstate/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BackButton from '../components/BackButton';
import SettingsRowItem from '../components/SettingsRowItem';
import UserIcon from '../components/UserIcon';
import { userState } from '../store/AppState';

const ProfileScreen = ({ navigation }) => {
  const user = useHookstate(userState);
  const logout = () => {
    AsyncStorage.removeItem('user');
    auth().signOut();
    user.set(null);
  };
  return (
    <View style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 10 }}>
      <BackButton />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <UserIcon
          name={user.get().username}
          size={100}
          image={user.get().image}
        />
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 32,
            marginTop: 10,
          }}>
          {user.get().username}
        </Text>
      </View>
      <View>
        <SettingsRowItem
          name={'Favorite Trips'}
          icon={'heart'}
          onPress={() => navigation.navigate('Favorites Screen')}
        />
        {/* <SettingsRowItem
          name={'Payment'}
          icon={'creditcard'}
          onPress={() => navigation.navigate('')}
        /> */}
        {/* <SettingsRowItem
          name={'Help'}
          icon={'questioncircle'}
          onPress={() => navigation.navigate('')}
        /> */}
        {user.get().isAgent === false && (
          <SettingsRowItem
            name={'Switch to Agent'}
            icon={'solution1'}
            onPress={() => navigation.navigate('Upgrade')}
          />
        )}
        {/* <SettingsRowItem
          name={'Settings'}
          icon={'setting'}
          onPress={() => navigation.navigate('Settings')}
        /> */}
      </View>
      <View style={{ bottom: 20, position: 'absolute' }}>
        <SettingsRowItem
          name={'Logout'}
          icon={'logout'}
          onPress={() => logout()}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
