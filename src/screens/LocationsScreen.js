import { useHookstate } from '@hookstate/core';
import React from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import BackButton from '../components/BackButton';
import UserIcon from '../components/UserIcon';
import { provinces } from '../data/provinces';
import { userState } from '../store/AppState';

const LocationsScreen = ({ navigation }) => {
  //Variable Definations
  const user = useHookstate(userState);
  const { width, height } = Dimensions.get('window');
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const SPACER_ITEM_SIZE = (width - width * 0.8) / 2;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.header}>
        <BackButton />

        <Text
          style={{
            fontSize: 24,
            color: 'black',
          }}>
          Where do
          <Text style={{ fontWeight: 'bold' }}>{`\nYou want to go?`}</Text>
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <UserIcon
            name={user.get().username}
            size={50}
            image={user.get().image}
            onPress={() => navigation.navigate('Profile')}
          />
        </TouchableOpacity>
      </View>
      <Animated.FlatList
        data={provinces}
        keyExtractor={item => item.id}
        horizontal
        snapToInterval={width * 0.8}
        decelerationRate={0}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 2) * width * 0.8,
            (index - 1) * width * 0.8,
            index * width * 0.8,
          ];
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -50, 0],
          });
          if (!item.image) {
            return <View style={{ width: SPACER_ITEM_SIZE }} />;
          }
          return (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('Trips', { item1: item })}>
              <Animated.View
                style={{
                  height: height,
                  width: width * 0.8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: [{ translateY }],
                }}>
                <Image
                  source={item.image}
                  style={{
                    width: width * 0.7,
                    height: height / 2,
                    resizeMode: 'cover',
                    borderRadius: 20,
                  }}
                />

                <View
                  style={{
                    width: width * 0.8,
                    alignItems: 'center',
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    padding: 20,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: '#333',
                      marginBottom: 10,
                    }}>
                    {item.title}
                  </Text>
                  <Text style={{ fontSize: 16, color: '#333' }}>
                    {item.description}
                  </Text>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          );
        }}
      />
    </View>
  );
};

export default LocationsScreen;

const styles = StyleSheet.create({
  header: {
    height: '10%',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
