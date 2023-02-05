import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import AgentRowItem from '../components/AgentRowItem';
import BackButton from '../components/BackButton';

const AgentsScreen = ({ navigation }) => {
  const [agents, setAgents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const usersCollection = firestore().collection('Users');

  const searchResults = agents.filter(agent => {
    return agent.company.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  useEffect(() => {
    usersCollection
      .where('isAgent', '==', true)
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
          <AgentRowItem item={item} navigation={navigation} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default AgentsScreen;
