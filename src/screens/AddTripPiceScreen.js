import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Text, TextInput } from 'react-native-paper';
import BackButton from '../components/BackButton';
import { handleError } from './SignUpScreen';
import firestore from '@react-native-firebase/firestore';

const AddTripPiceScreen = ({ route, navigation }) => {
  const { docId } = route.params;
  const { width, height } = Dimensions.get('window');
  const [loading, setLoading] = React.useState(false);
  const [price, setPrice] = React.useState('');
  const [seats, setSeats] = React.useState('');
  const [people1, setPeople1] = React.useState(0);
  const [people2, setPeople2] = React.useState(0);
  const [people3, setPeople3] = React.useState(0);
  const [discount1, setDiscount1] = React.useState(0);
  const [discount2, setDiscount2] = React.useState(0);
  const [discount3, setDiscount3] = React.useState(0);
  const tripsCollection = firestore().collection('Trips');

  const handleUpload = () => {
    setLoading(true);
    tripsCollection
      .doc(docId)
      .update({
        price: Number(price),
        totalSeats: Number(seats),
        seatsLeft: Number(seats),
        pricing: [
          {
            people: people1 < 1 ? 1 : Number(people1),
            price: discount1 < 1 ? Number(price) : Number(discount1),
            id: 1,
          },
          {
            people: people2 < 1 ? 1 : Number(people2),
            price: discount2 < 1 ? Number(price) : Number(discount2),
            id: 2,
          },
          {
            people: people3 < 1 ? 1 : Number(people3),
            price: discount3 < 1 ? Number(price) : Number(discount3),
            id: 3,
          },
        ],
        isDeactivated: false,
        isDeleted: false,
        favs: [],
        featured: false,
        bookings: [],
      })
      .then(() => {
        handleError('Trip Posted Successfully', 'success');
        setLoading(false);
        navigation.navigate('Trip Posted', { docId: docId });
      })
      .catch(error => {
        handleError(error.message, 'error');
        setLoading(false);
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
          Add Description
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            marginTop: 20,
            textAlign: 'center',
          }}>
          Add a description for your trip.
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 100,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <View>
            <Text variant="titleMedium" style={{ marginTop: 20 }}>
              Starting Price
            </Text>
            <TextInput
              disabled={loading}
              style={{ marginTop: 10, width: width / 2 - 20 }}
              mode="outlined"
              label={'Price'}
              placeholder="In PKR"
              keyboardType="numeric"
              value={price}
              onChangeText={text => setPrice(text)}
            />
          </View>
          <View>
            <Text variant="titleMedium" style={{ marginTop: 20 }}>
              Total Seats
            </Text>
            <TextInput
              disabled={loading}
              style={{ marginTop: 10, width: width / 2 - 20 }}
              mode="outlined"
              label={'Seats'}
              keyboardType="numeric"
              value={seats}
              onChangeText={text => setSeats(text)}
            />
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: '#000',
            marginTop: 20,
            marginBottom: 20,
            opacity: 0.2,
          }}
        />
        <Text variant="titleLarge">Add Discounts</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <View>
            <Text variant="titleMedium">People</Text>
            <TextInput
              disabled={loading}
              style={{ marginTop: 10, width: width / 2 - 20 }}
              mode="outlined"
              label={'People'}
              keyboardType="numeric"
              value={people1}
              onChangeText={text => setPeople1(text)}
            />
          </View>
          <View>
            <Text variant="titleMedium">Price Per Person</Text>
            <TextInput
              disabled={loading}
              style={{ marginTop: 10, width: width / 2 - 20 }}
              mode="outlined"
              label={'Price'}
              keyboardType="numeric"
              value={discount1}
              onChangeText={text => setDiscount1(text)}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <View>
            <Text variant="titleMedium">People</Text>
            <TextInput
              disabled={loading}
              style={{ marginTop: 10, width: width / 2 - 20 }}
              mode="outlined"
              label={'People'}
              keyboardType="numeric"
              value={people2}
              onChangeText={text => setPeople2(text)}
            />
          </View>
          <View>
            <Text variant="titleMedium">Price Per Person</Text>
            <TextInput
              disabled={loading}
              style={{ marginTop: 10, width: width / 2 - 20 }}
              mode="outlined"
              label={'Price'}
              keyboardType="numeric"
              value={discount2}
              onChangeText={text => setDiscount2(text)}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <View>
            <Text variant="titleMedium">People</Text>
            <TextInput
              disabled={loading}
              style={{ marginTop: 10, width: width / 2 - 20 }}
              mode="outlined"
              label={'People'}
              keyboardType="numeric"
              value={people3}
              onChangeText={text => setPeople3(text)}
            />
          </View>
          <View>
            <Text variant="titleMedium">Price Per Person</Text>
            <TextInput
              disabled={loading}
              style={{ marginTop: 10, width: width / 2 - 20 }}
              mode="outlined"
              label={'Price'}
              keyboardType="numeric"
              value={discount3}
              onChangeText={text => setDiscount3(text)}
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        disabled={price === '' || seats === '' || loading}
        onPress={() => handleUpload()}
        style={{
          backgroundColor: '#013237',
          paddingVertical: 20,
          borderRadius: 5,
          marginTop: 20,
          position: 'absolute',
          bottom: 20,
          width: '90%',
          alignSelf: 'center',
          opacity: price === '' || seats === '' || loading ? 0.5 : 1,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTripPiceScreen;
