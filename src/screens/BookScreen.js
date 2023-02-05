import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { Entypo } from '../assets/Icons/Entypo';
import { Feather } from '../assets/Icons/FeatherIcons';
import { TextInput } from 'react-native-paper';

const BookScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const [members, setMembers] = React.useState(0);
  const [pricePer, setPricePer] = React.useState(item.price);
  const [price, setPrice] = React.useState(0);

  useEffect(() => {
    if (members < item.pricing[0].people) {
      setPricePer(item.price);
      return;
    } else if (
      members >= item.pricing[0].people &&
      members < item.pricing[1].people
    ) {
      setPricePer(item.pricing[0].price);
      return;
    } else if (
      members >= item.pricing[1].people &&
      members < item.pricing[2].people
    ) {
      setPricePer(item.pricing[1].price);
      return;
    } else if (members >= item.pricing[2].people) {
      setPricePer(item.pricing[2].price);
      return;
    }
  }, [members]);

  useEffect(() => {
    setPrice(pricePer * members);
  }, [pricePer]);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Text
        style={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: 28,
          paddingVertical: 10,
          alignSelf: 'center',
        }}>
        Book Trip
      </Text>
      <Text
        style={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: 24,
          paddingVertical: 10,
          marginLeft: 10,
        }}>
        Trip Details
      </Text>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100,
        }}>
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
                  }}>{`\u2B24  ${point}`}</Text>
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
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 10,
                    marginVertical: 10,
                  }}>
                  <Entypo name="controller-play" size={20} color="black" />
                  <Text style={{ color: '#555', fontSize: 16, marginLeft: 5 }}>
                    {item.leavingDate}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 10,
                    marginRight: 20,
                  }}>
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
            </View>
          </View>
        </View>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 24,
            paddingVertical: 10,
            marginLeft: 10,
          }}>
          Members
        </Text>
        <TextInput
          mode="outlined"
          label="Members"
          style={{ marginHorizontal: 20, marginVertical: 5 }}
          value={members}
          onChangeText={text => {
            Number(text) > item.seatsLeft
              ? setMembers(item.seatsLeft.toString())
              : setMembers(text);
          }}
          placeholderTextColor="#555"
          placeholder="Enter number of members"
          keyboardType="numeric"
        />
        <View
          style={{ width: '100%', alignItems: 'flex-end', paddingRight: 20 }}>
          <Text style={{ color: 'black' }}>
            Price per person:{' '}
            <Text style={{ color: 'black', fontWeight: 'bold' }}>
              {pricePer}
            </Text>
          </Text>
          <Text style={{ color: 'black' }}>
            Total Price:{' '}
            <Text style={{ color: 'black', fontWeight: 'bold' }}>{price}</Text>
          </Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('Members', { members, item })}
        disabled={members < 1 ? true : false}
        style={{
          backgroundColor: '#013237',
          paddingVertical: 20,
          borderRadius: 5,
          marginTop: 20,
          position: 'absolute',
          bottom: 20,
          width: '90%',
          alignSelf: 'center',
          opacity: members < 1 ? 0.5 : 1,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'white',
            fontSize: 16,
            textAlign: 'center',
          }}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookScreen;

const styles = StyleSheet.create({});
