import { useHookstate } from '@hookstate/core';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';
import { AntDesign } from '../assets/Icons/AntDesign';
import { Entypo } from '../assets/Icons/Entypo';
import { FontAwesome5 } from '../assets/Icons/FontAwesome5';
import { MaterialCommunityIcons } from '../assets/Icons/MaterialCommunityIcons';
import UserIcon from '../components/UserIcon';
import { usernameState, userState } from '../store/AppState';

const HomeScreen = ({ navigation }) => {
  const { height, width } = Dimensions.get('window');
  const username = useHookstate(usernameState);
  const user = useHookstate(userState);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const unsub = firestore()
      .collection('Trips')
      .where('featured', '==', true)
      .where('isDeleted', '==', false)
      .where('isDeactivated', '==', false)
      .onSnapshot(querySnapshot => {
        const list = [];
        querySnapshot.forEach(doc => {
          list.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setFeatured(list);
      });
    return unsub;
  }, []);

  useEffect(() => {
    console.log(featured);
  }, [featured]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 24,
            color: 'black',
          }}>
          Welcome
          <Text style={{ fontWeight: 'bold' }}>{` ${
            user.get().username
          }`}</Text>
        </Text>
        <UserIcon
          name={user.get().username}
          size={50}
          image={user.get().image}
          onPress={() => navigation.navigate('Profile')}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Locations')}>
          <FontAwesome5 name={'map-marked-alt'} size={30} color={'white'} />
          <Text style={{ color: 'white', marginTop: 30 }}>Locations</Text>
        </TouchableOpacity>
        {user.get().isAgent ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Admin Trips')}>
            <MaterialCommunityIcons
              name={'road-variant'}
              size={30}
              color={'white'}
            />
            <Text style={{ color: 'white', marginTop: 30 }}>Your Trips</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Trips History')}>
            <AntDesign name="book" size={30} color={'white'} />
            <Text style={{ color: 'white', marginTop: 30 }}>My Bookings</Text>
          </TouchableOpacity>
        )}
        {user.get().isAgent ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Agent Booking')}>
            <FontAwesome5 name={'book'} size={30} color={'white'} />
            <Text style={{ color: 'white', marginTop: 30 }}>
              Your Booked Trips
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Agents')}>
            <FontAwesome5 name={'user-secret'} size={30} color={'white'} />
            <Text style={{ color: 'white', marginTop: 30 }}>Agents</Text>
          </TouchableOpacity>
        )}
        {user.get().isAgent ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Post Trip')}>
            <MaterialCommunityIcons
              name={'map-plus'}
              size={40}
              color={'white'}
            />
            <Text style={{ color: 'white', marginTop: 30 }}>Post Trip</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Request Trip')}>
            <FontAwesome5 name={'map'} size={30} color={'white'} />
            <Text style={{ color: 'white', marginTop: 30 }}>Request Trip</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.heading}>Featured</Text>
      <FlatList
        data={featured}
        horizontal
        style={{ marginTop: 10 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('TripDetails', { item })}
            style={{
              height: height * 0.3,
              width: width * 0.8,
              backgroundColor: '#f2f2f2',
              borderRadius: 12,
              marginHorizontal: 10,
              marginTop: 10,
              elevation: 5,
            }}>
            <Image
              source={{ uri: item.coverImage }}
              style={{
                height: height * 0.2,
                width: width * 0.8,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              }}
              resizeMode={'cover'}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 10,
                marginTop: 10,
              }}>
              <View>
                <Text style={{ color: 'black', fontSize: 18 }}>
                  {item.keyPoints[0]}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 10,
                  }}>
                  <Entypo name="controller-play" size={20} color="black" />
                  <Text
                    style={{
                      color: '#555',
                      fontSize: 16,
                      marginLeft: 5,
                    }}>
                    {item.leavingDate}
                  </Text>
                </View>
              </View>
              <View>
                <View
                  style={{
                    paddingVertical: 3,
                    paddingHorizontal: 20,
                    backgroundColor: '#013237',
                    alignItems: 'center',
                    borderRadius: 5,
                    justifyContent: 'center',
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'white',
                    }}>
                    {`Rs. ${item.price}`}
                  </Text>
                </View>
                <Text
                  style={{
                    color: 'black',
                    alignSelf: 'center',
                  }}>{`${item.seatsLeft} seats left`}</Text>
              </View>
            </View>
          </TouchableOpacity>
          // <TouchableOpacity
          //   style={{
          //     height: 100,
          //     width: width * 0.8,
          //     backgroundColor: '#013237',
          //     borderRadius: 12,
          //     alignSelf: 'center',
          //     flexDirection: 'row',
          //     alignItems: 'center',
          //     margin: '5%',
          //   }}
          //   onPress={() =>
          //     navigation.navigate('Trip Details', { id: item.id })
          //   }>
          //   <View
          //     style={{
          //       height: 80,
          //       width: 80,
          //       borderRadius: 12,
          //       overflow: 'hidden',
          //       margin: '5%',
          //     }}>
          //     <Image
          //       source={{ uri: item.coverImage }}
          //       style={{ height: '100%', width: '100%' }}
          //     />
          //   </View>
          //   <View>
          //     <Text style={{ color: 'white', fontSize: 18 }}>{item.title}</Text>
          //     <Text style={{ color: 'white', fontSize: 14 }}>
          //       {item.location}
          //     </Text>
          //     <Text style={{ color: 'white', fontSize: 14 }}>{item.price}</Text>
          //   </View>
          // </TouchableOpacity>
        )}
        // keyExtractor={item => item.id}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    flex: 1,
  },
  header: {
    height: '10%',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  button: {
    height: 170,
    width: '40%',
    backgroundColor: '#013237',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5%',
  },
  heading: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    width: '90%',
    alignSelf: 'center',
  },
});
