import React, { useEffect } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useHookstate } from '@hookstate/core';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import { Entypo } from '../assets/Icons/Entypo';
import { Feather } from '../assets/Icons/FeatherIcons';
import { FontAwesome5 } from '../assets/Icons/FontAwesome5';
import { userState } from '../store/AppState';

const TripsScreen = props => {
  const navigation = useNavigation();
  const user = useHookstate(userState);
  const { item1 } = props.route.params;
  const [item, setItem] = React.useState([]);
  const tripsCollection = firestore().collection('Trips');

  useEffect(() => {
    tripsCollection
      .where('title', '==', item1.title)
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
        setItem(list);
      });
  }, []);

  const onAddToFav = async id => {
    const trip = await tripsCollection.doc(id).get();
    const data = trip.data();
    const favs = data.favs;
    if (favs.includes(user.value.uid)) {
      const index = favs.indexOf(user.value.uid);
      favs.splice(index, 1);
    } else {
      favs.push(user.value.uid);
    }
    await tripsCollection.doc(id).update({ favs });
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ width: '100%', height: 200 }}>
        <Image
          source={item1.image}
          resizeMode="cover"
          style={{ height: 200, alignSelf: 'center', width: '100%' }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 28,

            paddingVertical: 10,
          }}>
          {item1.title}
        </Text>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: '#555', fontSize: 16 }}>Filters</Text>
          <FontAwesome5 name="filter" size={16} color="#555" />
        </TouchableOpacity>
      </View>
      {item ? (
        <FlatList
          data={item}
          keyExtractor={item => item.coverImage.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('TripDetails', { item: item })
                }
                style={{
                  marginHorizontal: 20,
                  marginVertical: 5,
                  borderRadius: 12,
                  // borderColor: '#666',
                  // borderWidth: 1,
                  elevation: 5,
                  backgroundColor: 'white',
                }}>
                <View
                  style={{
                    position: 'relative',
                  }}>
                  {item.postedBy.id === user.get().id && (
                    <View
                      style={{
                        backgroundColor: '#2c2c2c',
                        padding: 10,
                        borderRadius: 10,
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        zIndex: 999,
                      }}>
                      <Text>Your Trip</Text>
                    </View>
                  )}

                  <Image
                    source={{ uri: item.coverImage }}
                    style={{
                      width: '100%',
                      height: 200,
                      resizeMode: 'cover',
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                    }}
                  />

                  <Text
                    style={{
                      color: 'black',
                      fontWeight: '400',
                      fontSize: 20,
                      paddingLeft: 10,
                      paddingVertical: 10,
                      textTransform: 'capitalize',
                    }}>
                    {item.keyPoints[0]}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                      paddingHorizontal: 20,
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}>
                    {item.keyPoints?.map((point, index) => (
                      <Text
                        style={{
                          color: '#555',
                          fontSize: 16,
                        }}>{`\u2B24 ${point}`}</Text>
                    ))}
                  </View>
                  <View
                    style={{
                      height: 1,
                      width: '90%',
                      backgroundColor: '#555',
                      opacity: 0.5,
                      marginTop: 10,
                      alignSelf: 'center',
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginLeft: 10,
                          marginVertical: 10,
                        }}>
                        <Entypo
                          name="controller-play"
                          size={20}
                          color="black"
                        />
                        <Text
                          style={{
                            color: '#555',
                            fontSize: 16,
                            marginLeft: 5,
                          }}>
                          {item.leavingDate}
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                          <Feather name="sun" size={20} color="black" />
                          <Text
                            style={{
                              color: '#555',
                              fontSize: 16,
                              marginLeft: 5,
                            }}>
                            {`${item.totalDays} ${
                              item.totalDays > 1 ? 'Days' : 'Day'
                            }`}
                          </Text>
                        </View>
                        {item.totalNights != 0 && (
                          <View
                            style={{ flexDirection: 'row', marginLeft: 10 }}>
                            <Feather name="moon" size={18} color="black" />
                            <Text
                              style={{
                                color: '#555',
                                fontSize: 16,
                                marginLeft: 5,
                              }}>
                              {`${item.totalNights} ${
                                item.totalNights > 1 ? 'Nights' : 'Night'
                              }`}
                            </Text>
                          </View>
                        )}
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
                          marginVertical: 10,
                          marginRight: 10,
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
                </View>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="black" />
        </View>
      )}
    </View>
  );
};

export default TripsScreen;

const styles = StyleSheet.create({});
