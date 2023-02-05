import { useHookstate } from '@hookstate/core';
import firestore from '@react-native-firebase/firestore';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import BackButton from '../components/BackButton';
import { userState } from '../store/AppState';

const MembersDetailScreen = ({ route, navigation }) => {
  const { members, item } = route.params;
  const user = useHookstate(userState);
  const [leaderName, setLeaderName] = React.useState('');
  const [leaderEmail, setLeaderEmail] = React.useState(user.get().email);
  const [leaderPhone, setLeaderPhone] = React.useState('');
  const [leaderCNIC, setLeaderCNIC] = React.useState('');

  const onBook = async () => {
    const data = {
      bookedBy: {
        leaderName,
        leaderEmail,
        leaderPhone,
        leaderCNIC,
      },
      members: Number(members),
      user: user.get().id,
      createdAt: new Date(),
      trip: item,
      status: 'pending',
    };
    firestore()
      .collection('bookings')
      .add(data)
      .then(() => {
        firestore()
          .collection('Users')
          .doc(user.get().id)
          .update({
            name: leaderName,
            phone: leaderPhone,
            cnic: leaderCNIC,
          })
          .then(() => {
            firestore()
              .collection('Trips')
              .doc(item.id)
              .update({
                bookings: firestore.FieldValue.arrayUnion(user.get().id),
                seatsLeft: item.seatsLeft - Number(members),
              })
              .then(() => {
                navigation.navigate('Booked');
              });
          });
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
          Add Your Details
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          marginHorizontal: 20,
          paddingBottom: 100,
        }}>
        <Text variant="titleMedium" style={{ marginTop: 20 }}>
          Leader Name
        </Text>
        <TextInput
          mode="outlined"
          value={leaderName}
          onChangeText={setLeaderName}
          placeholder="Leader Name"
          placeholderTextColor={'#666'}
        />
        <Text variant="titleMedium" style={{ marginTop: 20 }}>
          Leader Email
        </Text>
        <TextInput
          mode="outlined"
          value={leaderEmail}
          onChangeText={setLeaderEmail}
          placeholder="Leader Email"
          placeholderTextColor={'#666'}
          keyboardType="email-address"
        />
        <Text variant="titleMedium" style={{ marginTop: 20 }}>
          Leader Phone
        </Text>
        <TextInput
          mode="outlined"
          value={leaderPhone}
          onChangeText={setLeaderPhone}
          placeholder="Leader Phone"
          placeholderTextColor={'#666'}
          keyboardType="phone-pad"
        />
        <Text variant="titleMedium" style={{ marginTop: 20 }}>
          Leader CNIC
        </Text>
        <TextInput
          mode="outlined"
          value={leaderCNIC}
          onChangeText={setLeaderCNIC}
          placeholder="Leader CNIC"
          placeholderTextColor={'#666'}
          keyboardType="phone-pad"
        />
      </ScrollView>
      <TouchableOpacity
        onPress={() => onBook()}
        disabled={
          leaderName && leaderCNIC && leaderEmail && leaderPhone ? false : true
        }
        style={{
          backgroundColor: '#013237',
          paddingVertical: 20,
          borderRadius: 5,
          marginTop: 20,
          position: 'absolute',
          bottom: 20,
          width: '90%',
          alignSelf: 'center',
          opacity:
            leaderName && leaderCNIC && leaderEmail && leaderPhone ? 1 : 0.5,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Book
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MembersDetailScreen;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    color: 'black',
    elevation: 5,
  },
});
