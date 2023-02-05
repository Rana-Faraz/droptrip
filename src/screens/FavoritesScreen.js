import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import React from 'react';
import BackButton from '../components/BackButton';
import { Text } from 'react-native-paper';
import { useHookstate } from '@hookstate/core';
import { userState } from '../store/AppState';
import { Entypo } from '../assets/Icons/Entypo';
import { Feather } from '../assets/Icons/FeatherIcons';
import firestore from '@react-native-firebase/firestore';

const FavoritesScreen = ({ navigation }) => {
  const user = useHookstate(userState);
  const [trips, setTrips] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = firestore()
      .collection('Trips')
      .where('isDeleted', '==', false)
      .where('isDeactivated', '==', false)
      .where('favs', 'array-contains', user.get().id)
      .onSnapshot(querySnapshot => {
        const list = [];
        querySnapshot.forEach(doc => {
          list.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setTrips(list);
      });
    return () => unsubscribe();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 20,
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          paddingHorizontal: 10,
        }}>
        <BackButton />
        <Text
          style={{
            color: 'black',
            fontSize: 24,
            fontWeight: 'bold',
            marginTop: 20,
            textAlign: 'center',
          }}>
          Favorite Trips
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            marginTop: 20,
            textAlign: 'center',
          }}>
          The trips that you add to your Favorites will appear here.
        </Text>
      </View>
      {trips.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: '#666' }}>
            You have no favorite trips yet.
          </Text>
        </View>
      ) : (
        <FlatList
          data={trips}
          keyExtractor={item => item.coverImage.toString()}
          style={{ marginTop: 20 }}
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
                  {item?.postedBy.id === user.get().id && (
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
                      <Text
                        style={{
                          color: 'white',
                        }}>
                        Your Trip
                      </Text>
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
                    }}>
                    {item.title}
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
      )}
    </View>
  );
};

export default FavoritesScreen;
