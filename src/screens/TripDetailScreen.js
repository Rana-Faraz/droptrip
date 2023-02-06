import { useHookstate } from '@hookstate/core';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ExpandingDot } from 'react-native-animated-pagination-dots';
import Carousel from 'react-native-reanimated-carousel';
import UserAvatar from 'react-native-user-avatar';
import { AntDesign } from '../assets/Icons/AntDesign';
import { Feather } from '../assets/Icons/FeatherIcons';
import { FontAwesome5 } from '../assets/Icons/FontAwesome5';
import { userState } from '../store/AppState';
import { handleError } from './SignUpScreen';

const TripDetailScreen = ({ route, navigation }) => {
  const user = useHookstate(userState);

  const { item, data } = route.params;
  const { height, width } = Dimensions.get('window');
  const [i, setI] = React.useState(0);
  const [favs, setFavs] = React.useState(item.favs);
  const [favorite, setFavorite] = React.useState(false);
  const tripsCollection = firestore().collection('Trips');

  const onAddToFav = async id => {
    console.log(id);
    const trip = await tripsCollection.doc(id).get();
    const data = trip.data();
    const favs = data.favs;
    if (favs.includes(user.get().id)) {
      const index = favs.indexOf(user.get().id);
      favs.splice(index, 1);
      setFavorite(false);
      handleError('Removed from favorites', 'success');
    } else {
      favs.push(user.get().id);
      setFavorite(true);
      handleError('Added to favorites', 'success');
    }
    await tripsCollection
      .doc(id)
      .update({ favs })
      .catch(error => {
        handleError(error.message, 'error');
        console.log(error.message);
      });
  };

  useEffect(() => {
    if (favs.includes(user.get().id)) {
      setFavorite(true);
    }
  }, []);

  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <View>
          <Carousel
            width={width}
            height={200}
            autoPlay={false}
            data={item.images}
            showPagination={true}
            pagingEnabled
            mode="parallel"
            onSnapToItem={index => setI(index)}
            onProgressChange={(_, absoluteProgress) => {
              scrollX.setValue(absoluteProgress * 400);
            }}
            renderItem={({ index, item }) => (
              <Image
                key={index}
                source={{ uri: item }}
                resizeMode="cover"
                style={{ height: 200, width: '100%' }}
              />
            )}
          />
          <ExpandingDot
            data={item.images}
            expandingDotWidth={30}
            scrollX={scrollX}
            inActiveDotOpacity={0.6}
            dotStyle={{
              width: 10,
              height: 10,
              backgroundColor: '#347af0',
              borderRadius: 5,
              marginHorizontal: 5,
            }}
            containerStyle={{
              bottom: 20,
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: 'white',
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            elevation: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: 28,
                  paddingVertical: 10,
                  marginLeft: 20,
                  textTransform: 'capitalize',
                }}>
                {item.keyPoints[0]}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 20,
                }}>
                <AntDesign name="calendar" size={16} color="black" />
                <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                    paddingVertical: 10,
                    marginLeft: 10,
                  }}>
                  {`${item.leavingDate} - ${item.returningDate}`}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                  <Feather name="sun" size={20} color="black" />
                  <Text
                    style={{
                      color: '#555',
                      fontSize: 16,
                      marginLeft: 5,
                    }}>
                    {`${item.totalDays} ${item.totalDays > 1 ? 'Days' : 'Day'}`}
                  </Text>
                </View>
                {item.totalNights != 0 && (
                  <View style={{ flexDirection: 'row', marginLeft: 10 }}>
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
            <View
              style={{
                zIndex: 999,
                backgroundColor: '#2c2c2c',
                padding: 10,
                borderRadius: 50,
                height: 45,
                width: 45,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
              }}>
              <TouchableOpacity onPress={() => onAddToFav(item.id)}>
                <AntDesign
                  name="heart"
                  size={20}
                  color={favorite ? 'red' : 'white'}
                />
              </TouchableOpacity>
            </View>
          </View>
          {data ? (
            <View
              style={{
                backgroundColor: '#2c2c2c',
                padding: 10,

                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  textTransform: 'capitalize',
                }}>
                Booking Status:
              </Text>
              <View
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: 5,
                  marginHorizontal: 5,
                  backgroundColor:
                    data.status === 'confirmed'
                      ? 'green'
                      : data.status === 'pending'
                      ? 'orange'
                      : 'red',
                }}
              />
              <Text
                style={{
                  color: 'white',
                  textTransform: 'capitalize',
                }}>
                {data.status == 'pending'
                  ? 'Waiting for approval'
                  : data.status == 'confirmed'
                  ? 'Confirmed'
                  : 'Rejected'}
              </Text>
            </View>
          ) : null}
        </View>
        <View
          style={{
            backgroundColor: 'white',
            marginTop: 10,
            borderRadius: 12,

            elevation: 5,
          }}>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 28,
              paddingVertical: 5,
              marginLeft: 20,
            }}>
            Pricing
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              marginLeft: 20,
            }}>
            Prices are per person and are subject to change without notice.
          </Text>
          <View>
            <FlatList
              data={item.pricing}
              keyExtractor={item => item.id}
              horizontal
              style={{ width: '100%' }}
              contentContainerStyle={{
                padding: 20,
                justifyContent: 'space-between',
                width: '100%',
              }}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      height: 100,
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 100,
                      borderWidth: 1,
                      borderColor: 'black',
                      borderRadius: 10,
                    }}>
                    {item.people > 1 ? (
                      <FontAwesome5 name="users" size={24} color="black" />
                    ) : (
                      <FontAwesome5 name="user-alt" size={24} color="black" />
                    )}
                    <Text
                      style={{ color: 'black', fontSize: 16, marginTop: 5 }}>
                      {`Rs. ${item.price}`}
                    </Text>
                    <Text
                      style={{ color: 'black', fontSize: 16, marginTop: 5 }}>
                      {item.people > 1 ? `${item.people}+ People` : 'Single'}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            marginTop: 10,
            borderRadius: 12,

            elevation: 5,
          }}>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 28,
              paddingVertical: 5,
              marginLeft: 20,
            }}>
            Locations
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 30,
              marginBottom: 10,
              justifyContent: 'space-between',
            }}>
            {item.keyPoints?.map((point, index) => (
              <Text
                style={{
                  color: '#555',
                  fontSize: 16,
                }}>{`\u2B24 ${point}`}</Text>
            ))}
          </View>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            marginTop: 10,
            borderRadius: 12,
            marginBottom: 20,
            elevation: 5,
          }}>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 28,
              paddingVertical: 5,
              marginLeft: 20,
            }}>
            Description
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              marginLeft: 20,
              marginBottom: 10,
            }}>
            {item.description}
          </Text>
        </View>
      </ScrollView>
      <View
        style={{
          borderTopWidth: 0.8,
          borderColor: '#909090',
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              padding: 10,
            }}>
            <UserAvatar
              size={50}
              name={item.postedBy.company.name}
              src={item.postedBy.image}
              style={{ width: 50 }}
            />
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold',
                marginLeft: 10,
              }}>
              {item.postedBy.company.name}
            </Text>
          </TouchableOpacity>
          <View>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 20,
                paddingVertical: 10,
                marginRight: 20,
              }}>{`Rs. ${item.price}`}</Text>
          </View>
        </View>
        <View
          style={{
            height: 1,
            width: '90%',
            alignSelf: 'center',
            backgroundColor: '#666',
            opacity: 0.5,
            marginVertical: 10,
          }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                marginLeft: 20,
                marginBottom: 10,
              }}>
              <Text style={{ fontWeight: 'bold' }}>Max Seats: </Text>

              {item.totalSeats}
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                marginLeft: 20,
                marginBottom: 10,
              }}>
              <Text style={{ fontWeight: 'bold' }}>Available Seats: </Text>

              {item.seatsLeft}
            </Text>
          </View>
          <View>
            <View
              style={{
                width: 1,
                // height: '90%',
                backgroundColor: '#666',
                opacity: 0.5,
                // marginVertical: 10,
                marginRight: 50,
              }}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('Book', { item })}
              disabled={item.postedBy.id === user.get().id}
              style={{
                backgroundColor: '#013237',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                paddingHorizontal: 30,
                paddingVertical: 10,
                marginRight: 20,
                opacity: item.postedBy.id === user.get().id ? 0.5 : 1,
              }}>
              <Text
                style={{ fontWeight: 'bold', color: 'white', fontSize: 16 }}>
                Book
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default TripDetailScreen;
