import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import BackButton from '../../components/BackButton';
import UserRowItem from '../../components/UserRowItem';

const AllUsersScreen = ({ navigation }) => {
  const [agents, setAgents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const usersCollection = firestore().collection('Users');

  const searchResults = agents.filter(agent => {
    return agent.username.toLowerCase().includes(searchQuery.toLowerCase());
  });

  useEffect(() => {
    usersCollection
      .where('isAgent', '==', false)
      .where('isAdmin', '==', false)
      .get()
      .then(snapshot => {
        const agents = snapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setAgents(agents);
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
        paddingHorizontal: 10,
      }}>
      <BackButton />
      <Searchbar
        placeholder="Search"
        onChangeText={query => setSearchQuery(query)}
        value={searchQuery}
        style={{ marginVertical: 10 }}
      />
      <FlatList
        data={searchResults}
        renderItem={({ item }) => (
          <UserRowItem item={item} navigation={navigation} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default AllUsersScreen;
