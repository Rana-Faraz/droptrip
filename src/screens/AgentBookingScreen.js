import { useHookstate } from '@hookstate/core';
import firestore from '@react-native-firebase/firestore';
import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Entypo } from '../assets/Icons/Entypo';
import { Feather } from '../assets/Icons/FeatherIcons';
import BackButton from '../components/BackButton';
import { userState } from '../store/AppState';

const AgentBookingScreen = ({ navigation }) => {
  const user = useHookstate(userState);
  const [item, setItem] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = firestore()
      .collection('bookings')
      .where('trip.isDeleted', '==', false)
      .where('trip.isDeactivated', '==', false)
      .where('trip.postedBy.id', '==', user.get().id)
      .onSnapshot(querySnapshot => {
        const list = [];
        querySnapshot.forEach(doc => {
          list.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setItem(list);
        setLoading(false);
      });
    return () => unsubscribe();
  }, []);

  const onDelete = id => {
    firestore().collection('bookings').doc(id).update({
      status: 'cancelled',
    });
  };

  const onApprove = id => {
    firestore().collection('bookings').doc(id).update({
      status: 'confirmed',
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
          Manage your trips Bookings
        </Text>
      </View>
      {item.length > 0 ? (
        <FlatList
          data={item}
          keyExtractor={item => item.trip.coverImage.toString()}
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
                  disabled={true}
                  onPress={() =>
                    navigation.navigate('TripDetails', {
                      item: item.trip,
                      data: item,
                    })
                  }>
                  <View
                    style={{
                      position: 'relative',
                    }}>
                    <View
                      style={{
                        backgroundColor: '#2c2c2c',
                        padding: 10,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        // position: 'absolute',
                        // top: 10,
                        // left: 10,
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
                          backgroundColor:
                            item.status === 'confirmed'
                              ? 'green'
                              : item.status === 'pending'
                              ? 'orange'
                              : 'red',
                        }}
                      />
                      <Text
                        style={{
                          color: 'white',
                          textTransform: 'capitalize',
                        }}>
                        {item.status}
                      </Text>
                    </View>

                    <Text
                      style={{
                        color: 'black',
                        fontWeight: '400',
                        fontSize: 20,
                        paddingLeft: 10,
                        paddingVertical: 10,
                        textTransform: 'capitalize',
                      }}>
                      {item.trip.keyPoints[0]}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                        paddingHorizontal: 20,
                        alignItems: 'center',
                        alignSelf: 'center',
                        flexWrap: 'wrap',
                      }}>
                      {item.trip.keyPoints?.map((point, index) => (
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
                            {item.trip.leavingDate}
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
                              {`${item.trip.totalDays} ${
                                item.trip.totalDays > 1 ? 'Days' : 'Day'
                              }`}
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
                              {`${item.trip.totalNights} ${
                                item.trip.totalNights > 1 ? 'Nights' : 'Night'
                              }`}
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
                            {`Rs. ${item.trip.price}`}
                          </Text>
                        </View>
                        <Text
                          style={{
                            color: 'black',
                            alignSelf: 'center',
                          }}>{`${item.trip.seatsLeft} seats left`}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <View>
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                      fontSize: 20,
                      paddingLeft: 10,
                      paddingVertical: 10,
                    }}>
                    Booking Details
                  </Text>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      width: '100%',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          marginLeft: 10,
                          fontWeight: 'bold',
                        }}>
                        Booked By:
                      </Text>
                      <Text
                        style={{
                          color: '#555',
                          fontSize: 16,
                          marginLeft: 5,
                        }}>
                        {item.bookedBy.leaderName}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          marginLeft: 10,
                          fontWeight: 'bold',
                        }}>
                        Phone Number:
                      </Text>
                      <Text
                        style={{
                          color: '#555',
                          fontSize: 16,
                          marginLeft: 5,
                        }}>
                        {item.bookedBy.leaderPhone}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      width: '100%',
                      marginBottom: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          marginLeft: 10,
                          fontWeight: 'bold',
                        }}>
                        Email:
                      </Text>
                      <Text
                        style={{
                          color: '#555',
                          fontSize: 16,
                          marginLeft: 5,
                        }}>
                        {item.bookedBy.leaderEmail}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          marginLeft: 10,
                          fontWeight: 'bold',
                        }}>
                        CNIC:
                      </Text>
                      <Text
                        style={{
                          color: '#555',
                          fontSize: 16,
                          marginLeft: 5,
                        }}>
                        {item.bookedBy.leaderCNIC}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  {item.status == 'pending' && (
                    <TouchableOpacity
                      onPress={() => onApprove(item.id)}
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
                        Approve
                      </Text>
                    </TouchableOpacity>
                  )}
                  {item.status == 'pending' && (
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
                        Deny
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
            You have no booked trips yet.
          </Text>
        </View>
      )}
    </View>
  );
};

export default AgentBookingScreen;
