import { useHookstate } from '@hookstate/core';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import { userState } from '../store/AppState';

const UserIcon = ({ name, size, image, onPress }) => {
  const user = useHookstate(userState);
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity onPress={onPress} disabled={!onPress}>
        <UserAvatar
          size={size}
          name={name}
          style={{ width: size }}
          src={image}
        />
      </TouchableOpacity>
    </>
  );
};

export default UserIcon;
