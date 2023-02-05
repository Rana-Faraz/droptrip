import { ScrollView, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Text, TextInput } from 'react-native-paper';
import BackButton from '../components/BackButton';
import firestore from '@react-native-firebase/firestore';

const AddTripDescScreen = ({ navigation, route }) => {
  const { docId } = route.params;
  const [description, setDescription] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const tripsCollection = firestore().collection('Trips');

  const handleUpload = () => {
    setLoading(true);
    tripsCollection
      .doc(docId)
      .update({
        description: description,
      })
      .then(() => {
        setLoading(false);
        navigation.navigate('Trip Price', { docId: docId });
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
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
          Add Description
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            marginTop: 20,
            textAlign: 'center',
          }}>
          Add a description for your trip.
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 100,
        }}>
        <Text variant="titleMedium" style={{ marginTop: 20 }}>
          Description
        </Text>
        <TextInput
          disabled={loading}
          style={{ marginTop: 10 }}
          mode="outlined"
          label="Description"
          multiline={true}
          numberOfLines={4}
          onChangeText={text => setDescription(text)}
          value={description}
        />
      </ScrollView>
      <TouchableOpacity
        disabled={description === '' || loading}
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
          opacity: description === '' || loading ? 0.5 : 1,
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

export default AddTripDescScreen;
