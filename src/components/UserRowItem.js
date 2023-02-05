import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import UserIcon from './UserIcon';

const UserRowItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      disabled={true}
      style={{
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        elevation: 5,
        // justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View style={{ flexDirection: 'row' }}>
        <UserIcon name={item.username} size={50} image={item.image} />
        <View
          style={{
            justifyContent: 'space-between',
            marginLeft: 10,
          }}>
          <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>
            {item.username}
          </Text>
          <Text style={{ color: 'black', fontSize: 16 }}>{item.email}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserRowItem;
