import { useHookstate } from '@hookstate/core';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { ToasterHelper } from 'react-native-customizable-toast';
import DatePicker from 'react-native-date-picker';
import { ActivityIndicator, Text, TextInput } from 'react-native-paper';
import BackButton from '../components/BackButton';
import { userState } from '../store/AppState';

const RequestTripScreen = ({ navigation }) => {
  const { height, width } = Dimensions.get('window');
  const user = useHookstate(userState);
  const [destination, setDestination] = React.useState('');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);
  const [days, setDays] = useState(0);
  const [nights, setNights] = useState(0);
  const [adults, setAdults] = React.useState('');
  const [children, setChildren] = React.useState('');
  const [budget, setBudget] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleError = (text, type) => {
    ToasterHelper.show({
      text: text,
      type: type,
      timeout: 5000,
    });
  };

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

  useEffect(() => {
    calculateDays();
  }, [startDate, endDate]);

  const onRequest = async () => {
    Keyboard.dismiss();
    setLoading(true);
    const data = {
      destination,
      startDate,
      endDate,
      days,
      nights,
      adults,
      children,
      budget,
      description,
      status: 'pending',
      createdAt: firestore.Timestamp.now(),
      createdBy: user.get(),
    };
    await firestore()
      .collection('requests')
      .add(data)
      .then(() => {
        setLoading(false);
        handleError('Request sent successfully', 'success');
        navigation.goBack();
      });
  };
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
          Request Trip
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            marginTop: 20,
            textAlign: 'center',
          }}>
          Request a custom trip and get quotations from agents.
        </Text>
      </View>
      {loading ? (
        <View
          style={{
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={{ color: '#000', fontSize: 16, marginTop: 10 }}>
            Sending Request...
          </Text>
        </View>
      ) : (
        <>
          <ScrollView>
            <TextInput
              disabled={loading}
              label="Destination"
              style={{
                backgroundColor: '#fafafa',
                marginTop: 20,
              }}
              mode="outlined"
              value={destination}
              onChangeText={text => setDestination(text)}
              placeholder="Enter destination"
            />
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
                  disabled={loading}
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
                  disabled={loading}
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
              minimumDate={new Date()}
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
            <TextInput
              disabled={loading}
              label="Number of Adults"
              style={{
                backgroundColor: '#fafafa',
                marginTop: 20,
              }}
              mode="outlined"
              value={adults}
              onChangeText={text => setAdults(text)}
              placeholder="Enter number of adults"
            />
            <TextInput
              disabled={loading}
              label="Number of Children"
              style={{
                backgroundColor: '#fafafa',
                marginTop: 20,
              }}
              mode="outlined"
              value={children}
              onChangeText={text => setChildren(text)}
              placeholder="Enter number of children"
            />
            <TextInput
              disabled={loading}
              label="Budget"
              style={{
                backgroundColor: '#fafafa',
                marginVertical: 20,
              }}
              mode="outlined"
              value={budget}
              onChangeText={text => setBudget(text)}
              placeholder="Enter budget"
            />
          </ScrollView>
          <TouchableOpacity
            disabled={loading}
            onPress={() => onRequest()}
            style={{
              backgroundColor: '#000',
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              width: width - 20,
              borderRadius: 5,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Request Trip
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default RequestTripScreen;
