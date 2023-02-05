import { Animated, Dimensions, Image, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text } from 'react-native-paper';
import BackButton from '../components/BackButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '../assets/Icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import { ExpandingDot } from 'react-native-animated-pagination-dots';
import Carousel from 'react-native-reanimated-carousel';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import { userImageState, userState } from '../store/AppState';
import { useHookstate } from '@hookstate/core';

const AddTripImagesScreen = ({ route, navigation }) => {
  const user = useHookstate(userState);
  const { value, keyPoints } = route.params;
  const { height, width } = Dimensions.get('window');
  const [images, setImages] = useState([]);
  const [i, setI] = React.useState(0);
  const tripsCollection = firestore().collection('Trips');
  const [urls, setUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [docId, setDocId] = useState();

  const uploadImage = async () => {
    setUploading(true);
    let url;
    images.map(async (image, index) => {
      const pathToFile = `${auth().currentUser.uid}/images/${index}`;
      const imageRef = storage().ref(pathToFile);
      console.log(image);
      await imageRef
        .putFile(image)
        .then(async () => {
          console.log('Done!!!!!!!!!');
          url = await imageRef.getDownloadURL().catch(err => {
            console.log(err);
            setUploading(false);
            setError(true);
          });
          setUrls(prev => [...prev, url]);
        })
        .catch(err => {
          console.log(err.code);
          setUploading(false);
          setError(true);
        });
    });
  };

  const handleNext = async () => {
    if (images.length === urls.length && images.length > 0) {
      console.log('Trip upladong');
      await tripsCollection
        .add({
          coverImage: urls[0],
          images: urls,
          title: value,
          keyPoints: keyPoints,
          leavingDate: '',
          totalDays: '',
          totalNights: '',
          price: '',
          seatsLeft: '',
          totalSeats: '',
          pricing: [],
          description: '',
          postedBy: user.get(),
        })
        .then(querySnapshot => {
          setDocId(querySnapshot.id);
          navigation.replace('Trip Dates', { docId: querySnapshot.id });
          console.log(querySnapshot.id);
          setUploading(false);
        })
        .catch(err => {
          console.log(err);
          setUploading(false);
          setError(true);
        });
    }
  };

  useEffect(() => {
    handleNext();
  }, [urls]);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const handleImagePicker = () => {
    ImagePicker.openPicker({
      height: 1080,
      width: 1920,
      cropping: true,
      cropperCircleOverlay: false,
      multiple: false,
    })
      .then(image => {
        setImages([...images, image.path]);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <View
      style={{
        height: height,
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
          Add Trip Images
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            marginTop: 20,
            textAlign: 'center',
          }}>
          Add images to make your trip more attractive.
        </Text>
      </View>
      {uploading ? (
        <View
          style={{
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={{ color: '#000', fontSize: 16, marginTop: 10 }}>
            Uploading...
          </Text>
        </View>
      ) : (
        <>
          <TouchableOpacity
            onPress={handleImagePicker}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#000',
              height: 100,
              width: width / 2 - 20,
              borderRadius: 10,
              marginTop: 20,
              alignSelf: 'center',
            }}>
            <AntDesign name="plus" size={24} color="black" />

            <Text
              style={{
                color: 'black',
                fontSize: 16,
                marginTop: 5,
                textAlign: 'center',
              }}>
              Add Image
            </Text>
          </TouchableOpacity>
          {images.length > 0 && (
            <>
              <View
                style={{
                  marginTop: 20,
                  position: 'relative',
                }}>
                <Carousel
                  width={width - 20}
                  height={280}
                  autoPlay={false}
                  data={images}
                  showPagination={true}
                  pagingEnabled
                  mode="parallel"
                  onSnapToItem={index => setI(index)}
                  onProgressChange={(_, absoluteProgress) => {
                    scrollX.setValue(absoluteProgress * 400);
                  }}
                  renderItem={({ index, item }) => (
                    <>
                      <Image
                        key={index}
                        source={{ uri: item }}
                        resizeMode="cover"
                        style={{
                          height: 200,
                          width: '100%',
                          borderRadius: 10,
                          zIndex: -1,
                        }}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          setImages(images.filter((_, i) => i !== index));
                        }}
                        style={{
                          zIndex: 1000,
                          height: 50,
                          width: 50,
                          borderRadius: 25,
                          backgroundColor: '#000',
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignSelf: 'flex-end',
                          marginTop: 10,
                        }}>
                        <AntDesign name="delete" size={20} color="white" />
                      </TouchableOpacity>
                    </>
                  )}
                />
                <ExpandingDot
                  data={images}
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
                    bottom: 100,
                  }}
                />
              </View>
              <TouchableOpacity
                disabled={images.length === 0}
                onPress={() => uploadImage()}
                style={{
                  backgroundColor: '#013237',
                  paddingVertical: 20,
                  borderRadius: 5,
                  marginTop: 180,
                  width: '90%',
                  alignSelf: 'center',
                  opacity: images.length === 0 ? 0.5 : 1,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Upload
                </Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}
    </View>
  );
};

export default AddTripImagesScreen;
