import { useHookstate } from '@hookstate/core';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Entypo } from '../assets/Icons/Entypo';
import { Feather } from '../assets/Icons/FeatherIcons';
import BackButton from '../components/BackButton';
import { userState } from '../store/AppState';

const AdminTrips = ({ navigation }) => {
  const user = useHookstate(userState);
  const [item, setItem] = React.useState([]);

  useEffect(() => {
    firestore()
      .collection('Trips')
      .where('postedBy.username', '==', user.get().username)
      .where('isDeleted', '==', false)
      .onSnapshot(querySnapshot => {
        const list = [];
        querySnapshot.forEach(doc => {
          list.push({ ...doc.data(), id: doc.id });
        });
        setItem(list);
      });
  }, []);

  const onDelete = id => {
    firestore()
      .collection('Trips')
      .doc(id)
      .update({
        isDeleted: true,
      })
      .then(() => {
        console.log('Trip deleted!');
      });
  };

  const onActivate = id => {
    firestore()
      .collection('Trips')
      .doc(id)
      .update({
        isDeactivated: false,
      })
      .then(() => {
        console.log('Trip activated!');
      });
  };
  const onDeactivate = id => {
    firestore()
      .collection('Trips')
      .doc(id)
      .update({
        isDeactivated: true,
      })
      .then(() => {
        console.log('Trip deactivated!');
      });
  };
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
          Manage your trips
        </Text>
      </View>
      {item.length > 0 ? (
        <FlatList
          data={item}
          keyExtractor={item => item.coverImage.toString()}
          style={{ marginTop: 20 }}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  marginHorizontal: 20,
                  marginVertical: 5,
                  borderRadius: 12,
                  // borderColor: '#666',
                  // borderWidth: 1,
                  elevation: 5,
                  backgroundColor: 'white',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('TripDetails', { item: item })
                  }>
                  <View>
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
                        <View
                          style={{ flexDirection: 'row', marginBottom: 10 }}>
                          <View
                            style={{ flexDirection: 'row', marginLeft: 10 }}>
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
                          <View
                            style={{ flexDirection: 'row', marginLeft: 10 }}>
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
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <TouchableOpacity
                    onPress={() => onDelete(item.id)}
                    style={{
                      backgroundColor: '#e2252b',
                      paddingVertical: 10,
                      alignItems: 'center',
                      borderRadius: 5,
                      justifyContent: 'center',
                      marginVertical: 10,
                      marginHorizontal: 10,
                      width: '40%',
                    }}>
                    <Text
                      variant="titleMedium"
                      style={{
                        fontSize: 16,
                        color: 'white',
                      }}>
                      Delete Trip
                    </Text>
                  </TouchableOpacity>
                  {item.isDeactivated ? (
                    <TouchableOpacity
                      onPress={() => onActivate(item.id)}
                      style={{
                        backgroundColor: '#013237',
                        paddingVertical: 10,
                        alignItems: 'center',
                        borderRadius: 5,
                        justifyContent: 'center',
                        marginVertical: 10,
                        marginHorizontal: 10,
                        width: '40%',
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'white',
                        }}>
                        Activate
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => onDeactivate(item.id)}
                      style={{
                        backgroundColor: '#013237',
                        paddingVertical: 10,
                        alignItems: 'center',
                        borderRadius: 5,
                        justifyContent: 'center',
                        marginVertical: 10,
                        marginHorizontal: 10,
                        width: '40%',
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'white',
                        }}>
                        Deactivate
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          }}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: '#666' }}>
            You have not posted any trips yet.
          </Text>
        </View>
      )}
    </View>
  );
};

export default AdminTrips;
