import { useHookstate } from '@hookstate/core';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Text } from 'react-native-paper';
import BackButton from '../components/BackButton';
import { userState } from '../store/AppState';

const AddTripDatesScreen = ({ navigation, route }) => {
  const { height, width } = Dimensions.get('window');
  const { docId } = route.params;
  const user = useHookstate(userState);
  const tripsCollection = firestore().collection('Trips');

  const [date, setDate] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);
  const [days, setDays] = useState(0);
  const [nights, setNights] = useState(0);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const calculateDays = () => {
    if (startDate && endDate) {
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDays(diffDays);
      setNights(diffDays - 1);
      console.log(diffDays);
    }
  };

  const handleUpload = () => {
    tripsCollection
      .doc(docId)
      .update({
        startDate: startDate,
        endDate: endDate,
        totalDays: days,
        totalNights: nights,
        leavingDate: `${startDate.getDate().toString()} ${
          months[startDate.getMonth()]
        }`,
        returningDate: `${endDate.getDate().toString()} ${
          months[endDate.getMonth()]
        }`,
      })
      .then(() => {
        navigation.replace('Trip Desc', { docId: docId });
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    calculateDays();
  }, [startDate, endDate]);

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
          Add Dates
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            marginTop: 20,
            textAlign: 'center',
          }}>
          Add dates for your trip.
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Text variant="titleMedium" style={{ marginTop: 20 }}>
            Start Date
          </Text>
          <TouchableOpacity
            onPress={() => setOpenStart(true)}
            style={{
              backgroundColor: '#fafafa',
              zIndex: 1000,
              borderWidth: 0.8,
              borderColor: '#000',
              borderRadius: 5,
              padding: 10,
              width: width / 2 - 20,
              justifyContent: 'center',
              marginTop: 10,
              height: 50,
            }}>
            <Text
              style={{
                textAlign: 'center',
              }}>
              {startDate
                ? `${startDate.getDate().toString()} - ${
                    months[startDate.getMonth()]
                  } - ${startDate.getFullYear().toString()}`
                : 'Select Date'}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text variant="titleMedium" style={{ marginTop: 20 }}>
            End Date
          </Text>
          <TouchableOpacity
            onPress={() => setOpenEnd(true)}
            style={{
              backgroundColor: '#fafafa',
              zIndex: 1000,
              borderWidth: 0.8,
              borderColor: '#000',
              borderRadius: 5,
              width: width / 2 - 20,
              padding: 10,
              height: 50,
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
              }}>
              {endDate
                ? `${endDate.getDate().toString()} - ${
                    months[endDate.getMonth()]
                  } - ${endDate.getFullYear().toString()}`
                : 'Select Date'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Text variant="titleMedium" style={{ marginTop: 20 }}>
            Total Days
          </Text>
          <View
            style={{
              backgroundColor: '#fafafa',
              zIndex: 1000,
              borderWidth: 0.8,
              borderColor: '#000',
              borderRadius: 5,
              width: width / 2 - 20,
              padding: 10,
              height: 50,
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
              }}>
              {days}
            </Text>
          </View>
        </View>
        <View>
          <Text variant="titleMedium" style={{ marginTop: 20 }}>
            Total Nights
          </Text>
          <View
            style={{
              backgroundColor: '#fafafa',
              zIndex: 1000,
              borderWidth: 0.8,
              borderColor: '#000',
              borderRadius: 5,
              width: width / 2 - 20,
              padding: 10,
              height: 50,
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
              }}>
              {nights}
            </Text>
          </View>
        </View>
      </View>
      <DatePicker
        modal
        mode="date"
        open={openStart}
        date={new Date()}
        onConfirm={date => {
          setOpenStart(false);
          setStartDate(date);
        }}
        onCancel={() => {
          setOpenStart(false);
        }}
      />
      <DatePicker
        mode="date"
        modal
        minimumDate={startDate}
        open={openEnd}
        date={new Date()}
        onConfirm={date => {
          setOpenEnd(false);
          setEndDate(date);
        }}
        onCancel={() => {
          setOpenEnd(false);
        }}
      />
      <TouchableOpacity
        disabled={startDate === null || endDate === null}
        onPress={() => handleUpload()}
        style={{
          backgroundColor: '#013237',
          paddingVertical: 20,
          borderRadius: 5,
          marginTop: 20,
          position: 'absolute',
          bottom: 20,
          width: '90%',
          alignSelf: 'center',
          opacity: startDate === null || endDate === null ? 0.5 : 1,
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

export default AddTripDatesScreen;
