import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Entypo } from '../../assets/Icons/Entypo';
import { Feather } from '../../assets/Icons/FeatherIcons';
import { useHookstate } from '@hookstate/core';
import { userState } from '../../store/AppState';
import BackButton from '../../components/BackButton';

const AllTripsScreen = ({ navigation }) => {
  const user = useHookstate(userState);
  const [trips, setTrips] = React.useState([]);
  const tripsCollection = firestore()
    .collection('Trips')
    .where('price', '!=', '');

  useEffect(() => {
    const unsubscribe = tripsCollection.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { id } = doc;
        list.push({ id, ...doc.data() });
      });
      setTrips(list);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    console.log(trips[1]?.bookings);
  }, [trips]);

  return (
    <View>
      <View
        style={{
          padding: 20,
        }}>
        <BackButton />
      </View>
      {trips ? (
        <FlatList
          data={trips}
          keyExtractor={item => item.coverImage.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Trips Details', { item: item })
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
                  <View
                    style={{
                      backgroundColor: '#2c2c2c',
                      padding: 10,
                      borderRadius: 10,
                      position: 'absolute',
                      top: 10,
                      left: 10,
                      zIndex: 999,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        height: 10,
                        width: 10,
                        borderRadius: 5,
                        marginRight: 5,
                        backgroundColor: item.isDeactivated ? 'red' : 'green',
                      }}
                    />
                    <Text
                      style={{
                        color: 'white',
                        textTransform: 'capitalize',
                      }}>
                      {item.isDeactivated ? 'Not Active' : 'Active'}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#2c2c2c',
                      padding: 10,
                      borderRadius: 10,
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      zIndex: 999,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        height: 10,
                        width: 10,
                        borderRadius: 5,
                        marginRight: 5,
                        backgroundColor: !item.featured ? 'red' : 'green',
                      }}
                    />
                    <Text
                      style={{
                        color: 'white',
                        textTransform: 'capitalize',
                      }}>
                      {!item.featured ? 'Not Featured' : 'Featured'}
                    </Text>
                  </View>

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
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: '400',
                        fontSize: 20,
                        paddingLeft: 10,
                        paddingVertical: 10,
                      }}>
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: '400',
                        fontSize: 20,
                        paddingRight: 10,
                        paddingVertical: 10,
                      }}>
                      Bookings: {item.bookings?.length}
                    </Text>
                  </View>
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
                            {`${item.totalDays} Days`}
                          </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                          <Feather name="moon" size={18} color="black" />
                          <Text
                            style={{
                              color: '#555',
                              fontSize: 16,
                              marginLeft: 5,
                            }}>
                            {`${item.totalNights} Nights`}
                          </Text>
                        </View>
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

export default AllTripsScreen;
