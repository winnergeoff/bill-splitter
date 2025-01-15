import { StyleSheet, View, Text, ScrollView, Button, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  SafeAreaProvider
} from 'react-native-safe-area-context';

import { Image } from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import * as ImagePicker from 'expo-image-picker';


export default function TabTwoScreen() {
  const [scannedImage, setScannedImage] = useState();
  const [imageText, setImageText] = useState();
  const [imageBlocks, setImageBlocks ] = useState([]);

  const scanDocument = async () => {
    // start the document scanner
    const { scannedImages } = await DocumentScanner.scanDocument();
  
    // get back an array with scanned image file paths
    if (scannedImages.length > 0) {
      // set the img src, so we can view the first scanned image
      setScannedImage(scannedImages[0]);
      extractText(scannedImages[0]);
    }
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const imageResult = await ImagePicker.launchImageLibraryAsync();
    if (imageResult.canceled) {
      return;
    }

    const asset = imageResult.assets[0];
    const currentImage = {
      path: asset.uri,
      width: asset.width,
      height: asset.height,
    };
    setScannedImage(currentImage.path);
    extractText(currentImage.path);
  };

  const extractText = async (image) => {
    try {
      const result = await TextRecognition.recognize(image);
      setImageText(result.text);
      let newBlocks = [];
      newBlocks = result.blocks.map((block, blockId) => {
        return newBlocks = {text: block.text, id: blockId};
      })
      setImageBlocks(newBlocks);
    } catch (error) {
      console.log(error);
    }
  };

  const takePhotoButton = () => {
    scanDocument();
  };

  const useSavedPhoto = () => {
    pickImage();
  };

  useEffect(() => console.log(imageBlocks));

  return (
    <SafeAreaProvider style={styles.outerContainer}>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.title}>Bill Splitter</Text>
          <Text style={styles.subTitle}>
            If your friends don't know how to read
            a receipt then just scan your receipt and it will create line items each person
            can claim.
          </Text>
          {/* <Text style={styles.subTitle}>{imageText}</Text> */}
          
          <FlatList
            data={imageBlocks}
            renderItem={(item) => (<Text style={styles.subTitle}>{item.id}</Text>)}
            keyExtractor={item => item.id}
            style={styles.flatList}
          />

          <View style={styles.buttonContainer}>
            <Button onPress={takePhotoButton} title="Scan with your camera" color="#03bafc" />
          </View>

          <View style={styles.buttonContainer}>
            <Button onPress={useSavedPhoto} title="Use a saved photo" color="#03bafc" />
          </View>
          
          <Image
            // resizeMode="contain"
            // style={{ width: '100%', height: '100%' }}
            source={{ uri: scannedImage }}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
    fontSize: 50,
    // backgroundColor: 'red',
  },
  subTitle: {
    textAlign: 'center',
    fontSize: 20,
  },
  buttonContainer: {
    margin: 20,
    backgroundColor: 'blue',
    text: 'white'
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  flatList: {
    flex: 1,
    borderColor: 'red',
    borderWidth: 1,
  }
});
