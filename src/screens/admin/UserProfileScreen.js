import { View } from 'react-native';
import React from 'react';
import BackButton from '../../components/BackButton';
import firestore from '@react-native-firebase/firestore';
import { Text } from 'react-native-paper';
import UserIcon from '../../components/UserIcon';

const UserProfileScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    firestore()
      .collection('Users')
      .doc(id)
      .get()
      .then(doc => {
        setUser(doc.data());
        setLoading(false);
      });
  }, []);
  return (
    <>
      <View
        style={{
          padding: 20,
        }}>
        <BackButton />
      </View>
      <View>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}>
              <UserIcon size={100} name={user.name} image={user.image} />
            </View>
            <View
              style={{
                padding: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <Text variant="titleMedium">Name:</Text>
                <Text
                  variant="titleMedium"
                  style={{
                    marginLeft: 10,
                    color: '#9e9e9e',
                  }}>
                  {user.name}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <Text variant="titleMedium">Email:</Text>
                <Text
                  variant="titleMedium"
                  style={{
                    marginLeft: 10,
                    color: '#9e9e9e',
                  }}>
                  {user.email}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <Text variant="titleMedium">Phone:</Text>
                <Text
                  variant="titleMedium"
                  style={{
                    marginLeft: 10,
                    color: '#9e9e9e',
                  }}>
                  {user.phone}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <Text variant="titleMedium">CNIC:</Text>
                <Text
                  variant="titleMedium"
                  style={{
                    marginLeft: 10,
                    color: '#9e9e9e',
                  }}>
                  {user.cnic}
                </Text>
              </View>
            </View>
          </>
        )}
      </View>
    </>
  );
};

export default UserProfileScreen;
