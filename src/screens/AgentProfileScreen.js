import { useHookstate } from '@hookstate/core';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Entypo } from '../assets/Icons/Entypo';
import { Feather } from '../assets/Icons/FeatherIcons';
import BackButton from '../components/BackButton';
import UserIcon from '../components/UserIcon';
import { userState } from '../store/AppState';

const AgentProfileScreen = ({ navigation }) => {
  const user = useHookstate(userState);
  const route = useRoute();
  const { agent } = route.params;
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    firestore()
      .collection('Trips')
      .where('postedBy.id', '==', agent.id)
      .get()
      .then(snapshot => {
        const trips = snapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setTrips(trips);
      })
      .catch(err => {
        console.log(err);
      });
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
          Profile
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            marginTop: 20,
            textAlign: 'center',
          }}>
          Trips from {agent.company.name}
        </Text>
      </View>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <UserIcon
          name={agent.company.name}
          size={100}
          image={agent.image}
          onPress={false}
        />
      </View>
      {trips.length > 0 ? (
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
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, color: '#555' }}>
            No trips available
          </Text>
        </View>
      )}
    </View>
  );
};

export default AgentProfileScreen;
