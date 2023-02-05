import { useHookstate } from '@hookstate/core';
import React, { useEffect } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { ExpandingDot } from 'react-native-animated-pagination-dots';
import Carousel from 'react-native-reanimated-carousel';
import UserAvatar from 'react-native-user-avatar';

import firestore from '@react-native-firebase/firestore';
import { Text } from 'react-native-paper';
import BackButton from '../../components/BackButton';
import { userState } from '../../store/AppState';

const AdminTripDetails = ({ route, navigation }) => {
  const user = useHookstate(userState);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const { item } = route.params;
  const { height, width } = Dimensions.get('window');
  const [i, setI] = React.useState(0);
  const [users, setUsers] = React.useState([]);
  const [bookings, setBookings] = React.useState([]);
  const [featured, setFeatured] = React.useState(item.featured);
  const [active, setActive] = React.useState(!item.isDeactivated);
  const [loading, setLoading] = React.useState(false);
  const tripsCollection = firestore().collection('Trips');

  useEffect(() => {
    item.bookings.map(booking => {
      firestore()
        .collection('Users')
        .doc(booking)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            setBookings(bookings => [...bookings, documentSnapshot.id]);
          }
        })
        .catch(error => {
          console.log(error);
        });
    });
  }, []);
  useEffect(() => {
    bookings.map(user => {
      firestore()
        .collection('Users')
        .doc(user)
        .onSnapshot(documentSnapshot => {
          const data = { ...documentSnapshot.data(), id: documentSnapshot.id };
          setUsers(users => [...users, data]);
        });
    });
  }, [bookings]);

  const onActivate = () => {
    setLoading(true);
    tripsCollection
      .doc(item.id)
      .update({
        isDeactivated: false,
      })
      .then(() => {
        setLoading(false);
        console.log('Trip Updated!');
        setActive(true);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };
  const onDeactivate = () => {
    setLoading(true);
    tripsCollection
      .doc(item.id)
      .update({
        isDeactivated: true,
      })
      .then(() => {
        setLoading(false);
        console.log('Trip Updated!');
        setActive(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };
  const onDelete = () => {
    setLoading(true);
    tripsCollection
      .doc(item.id)
      .delete()
      .then(() => {
        setLoading(false);
        navigation.goBack();
        console.log('Trip Deleted!');
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };
  const onFeature = () => {
    setLoading(true);
    tripsCollection
      .doc(item.id)
      .update({
        featured: true,
      })
      .then(() => {
        setFeatured(true);
        setLoading(false);
        console.log('Trip Updated!');
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };
  const onUnfeature = () => {
    setLoading(true);
    tripsCollection
      .doc(item.id)
      .update({
        featured: false,
      })
      .then(() => {
        setFeatured(false);
        setLoading(false);
        console.log('Trip Updated!');
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <>
      <View
        style={{
          padding: 20,
        }}>
        <BackButton />
      </View>
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
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: '#e0e0e0',
          }}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10 }}>
              Posted By:
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
              }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                {item.postedBy.company.name}
              </Text>
              <Text style={{ fontSize: 14, color: '#9e9e9e' }}>
                {item.postedBy.email}
              </Text>
            </View>
          </View>
          {featured ? (
            <TouchableOpacity
              disabled={loading}
              onPress={onUnfeature}
              style={{
                margin: 10,
                padding: 10,
                width: width / 2 - 20,
                backgroundColor: '#a84b4b',
                borderRadius: 5,
                opacity: loading ? 0.5 : 1,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: 'white',
                }}>
                Remove Featured
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled={loading}
              onPress={onFeature}
              style={{
                margin: 10,
                padding: 10,
                width: width / 2 - 20,
                backgroundColor: '#5fa84c',
                borderRadius: 5,
                opacity: loading ? 0.5 : 1,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: 'white',
                }}>
                Feature Trip
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {!active ? (
            <TouchableOpacity
              onPress={onActivate}
              disabled={loading}
              style={{
                padding: 10,
                margin: 10,
                backgroundColor: '#5fa84c',
                borderRadius: 5,
                width: width / 2 - 20,
                opacity: loading ? 0.5 : 1,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: 'white',
                }}>
                Activate
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={onDeactivate}
              disabled={loading}
              style={{
                padding: 10,
                margin: 10,
                backgroundColor: '#a84b4b',
                borderRadius: 5,
                width: width / 2 - 20,
                opacity: loading ? 0.5 : 1,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: 'white',
                }}>
                Deactivate
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={onDelete}
            disabled={loading}
            style={{
              padding: 10,
              margin: 10,
              backgroundColor: '#a84b4b',
              borderRadius: 5,
              width: width / 2 - 20,
              opacity: loading ? 0.5 : 1,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'white',
              }}>
              Delete Trip
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10 }}>
          Trip Details:
        </Text>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
          <Text style={{ fontSize: 14, color: '#9e9e9e' }}>
            {item.description}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {item.keyPoints.length > 0 && (
            <View style={{ padding: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                Key Points:
              </Text>
              <FlatList
                data={item.keyPoints}
                keyExtractor={item => item.toString()}
                renderItem={({ item }) => (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#9e9e9e',
                        marginLeft: 10,
                      }}>
                      {item}
                    </Text>
                  </View>
                )}
              />
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
            }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Price:</Text>
            <Text style={{ fontSize: 14, color: '#9e9e9e', marginLeft: 10 }}>
              {item.price}
            </Text>
          </View>
          {item.pricing.length > 0 && (
            <View style={{ padding: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Pricing:</Text>
              <FlatList
                data={item.pricing}
                keyExtractor={item => item.price}
                renderItem={({ item }) => (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#9e9e9e',
                        marginLeft: 10,
                      }}>
                      {item.people}+
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#9e9e9e',
                        marginLeft: 10,
                      }}>
                      {item.price}
                    </Text>
                  </View>
                )}
              />
            </View>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
          }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            Leaving Date:
          </Text>
          <Text style={{ fontSize: 14, color: '#9e9e9e', marginLeft: 10 }}>
            {item.leavingDate}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
          }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            Returning Date:
          </Text>
          <Text style={{ fontSize: 14, color: '#9e9e9e', marginLeft: 10 }}>
            {item.returningDate}
          </Text>
        </View>
        {item.bookings.length > 0 && (
          <>
            <View
              style={{
                height: 1,
                backgroundColor: '#e0e0e0',
                marginVertical: 10,
              }}
            />
            <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10 }}>
              Booked By:
            </Text>
            <FlatList
              data={users}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('User Profile', { id: item.id })
                  }
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#e0e0e0',
                  }}>
                  <UserAvatar size={50} name={item.name} src={item.image} />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                      {item.name}
                    </Text>
                    <Text style={{ fontSize: 14, color: '#9e9e9e' }}>
                      {item.email}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </>
        )}
      </ScrollView>
    </>
  );
};

export default AdminTripDetails;
