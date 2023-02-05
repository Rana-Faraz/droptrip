import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';
import { Feather } from '../../assets/Icons/FeatherIcons';
import { AntDesign } from '../../assets/Icons/AntDesign';
import { FontAwesome5 } from '../../assets/Icons/FontAwesome5';
import { Ionicons } from '../../assets/Icons/Ionicons';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userState } from '../../store/AppState';
import { useHookstate } from '@hookstate/core';

const AdminHome = ({ navigation }) => {
  const user = useHookstate(userState);

  const logout = () => {
    AsyncStorage.removeItem('user');
    auth().signOut();
    user.set(null);
  };
  return (
    <View>
      <Text
        style={{
          color: 'black',
          fontSize: 24,
          fontWeight: 'bold',
          marginTop: 20,
          textAlign: 'center',
        }}>
        Admin Portal
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('All Trips')}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#ececec',
          marginTop: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <Feather name="map-pin" size={24} color="black" />
          <Text
            variant="titleMedium"
            style={{
              marginLeft: 34,
            }}>
            All Trips
          </Text>
        </View>
        <View
          style={{
            paddingRight: 20,
          }}>
          <AntDesign name="right" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Agents Screen')}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#ececec',
          marginTop: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <FontAwesome5 name="user-secret" size={24} color="black" />
          <Text
            variant="titleMedium"
            style={{
              marginLeft: 34,
            }}>
            All Agents
          </Text>
        </View>
        <View
          style={{
            paddingRight: 20,
          }}>
          <AntDesign name="right" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('All Users')}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#ececec',
          marginTop: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <Feather name="user" size={24} color="black" />
          <Text
            variant="titleMedium"
            style={{
              marginLeft: 34,
            }}>
            All Users
          </Text>
        </View>
        <View
          style={{
            paddingRight: 20,
          }}>
          <AntDesign name="right" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => logout()}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#ececec',
          marginTop: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <Ionicons name="exit-outline" size={24} color="black" />
          <Text
            variant="titleMedium"
            style={{
              marginLeft: 34,
            }}>
            Logout
          </Text>
        </View>
        <View
          style={{
            paddingRight: 20,
          }}></View>
      </TouchableOpacity>
    </View>
  );
};

export default AdminHome;
