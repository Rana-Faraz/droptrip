import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Text, TextInput } from 'react-native-paper';
import { AntDesign } from '../assets/Icons/AntDesign';
import BackButton from '../components/BackButton';

const PostTripScreen = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Khyber Pakhtunkhwa', value: 'Khyber Pakhtunkhwa' },
    { label: 'Gilgit Baltistan', value: 'Gilgit Baltistan' },
    { label: 'Punjab', value: 'Punjab' },
  ]);
  const [keyI, setKeyI] = useState(1);
  const [keyPoints, setKeyPoints] = useState(['']);

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
      }}>
      <BackButton />
      <View>
        <Text
          style={{
            color: 'black',
            fontSize: 24,
            fontWeight: 'bold',
            marginTop: 20,
            textAlign: 'center',
          }}>
          Post a Trip
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            marginTop: 20,
            textAlign: 'center',
          }}>
          Post a trip for your customers to book.
        </Text>
      </View>
      <ScrollView>
        <DropDownPicker
          placeholder="Select a province"
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={{
            backgroundColor: '#fafafa',
            zIndex: 1000,
          }}
          containerStyle={{
            marginTop: 20,
          }}
        />
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            marginTop: 20,
            textAlign: 'center',
          }}>
          Add Key Points of your trip
        </Text>
        {Array.from({ length: keyI }, (v, k) => k).map(i => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TextInput
              label={`Key Point ${i + 1}`}
              placeholder='Eg. "Islamabad, Murree, Nathiagali, etc."'
              mode="outlined"
              value={keyPoints[i]}
              onChangeText={text => {
                const newKeyPoints = [...keyPoints];
                newKeyPoints[i] = text;
                setKeyPoints(newKeyPoints);
              }}
              style={{
                marginTop: 20,
                backgroundColor: '#fafafa',
                width: i > 0 ? '84%' : '100%',
              }}
              outlineColor="#000"
              activeOutlineColor="#000"
            />
            {i > 0 && (
              <TouchableOpacity
                onPress={() => {
                  const newKeyPoints = [...keyPoints];
                  newKeyPoints.splice(i, 1);
                  setKeyPoints(newKeyPoints);
                  setKeyI(keyI - 1);
                }}
                style={{
                  marginTop: 20,
                  backgroundColor: '#013237',
                  padding: 10,
                  borderRadius: 50,
                  width: 50,
                  height: 50,
                  alignItems: 'center',
                  alignSelf: 'flex-end',
                  justifyContent: 'center',
                }}>
                <AntDesign name="delete" size={20} color="white" />
              </TouchableOpacity>
            )}
          </View>
        ))}
        <TouchableOpacity
          onPress={() => setKeyI(keyI + 1)}
          style={{
            marginTop: 20,
            backgroundColor: '#013237',
            padding: 10,
            borderRadius: 50,
            width: 50,
            height: 50,
            alignItems: 'center',
            alignSelf: 'flex-end',
            justifyContent: 'center',
            marginBottom: 80,
          }}>
          <AntDesign name="plus" size={24} color="white" />
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity
        disabled={keyPoints.length === 0 || value === null}
        onPress={() => navigation.replace('Trip Images', { value, keyPoints })}
        style={{
          backgroundColor: '#013237',
          paddingVertical: 20,
          borderRadius: 5,
          marginTop: 20,
          position: 'absolute',
          bottom: 20,
          width: '90%',
          alignSelf: 'center',
          opacity: keyPoints[0].length === 0 || value === null ? 0.5 : 1,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostTripScreen;
