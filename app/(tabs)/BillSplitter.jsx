import { StyleSheet, View, Text, ScrollView, Button } from 'react-native';
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

  const scanDocument = async () => {
    // start the document scanner
    const { scannedImages } = await DocumentScanner.scanDocument();
  
    // get back an array with scanned image file paths
    if (scannedImages.length > 0) {
      console.log(scannedImages[0]);
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
    console.log(imageResult);
    console.log(asset);
    console.log(currentImage);
    setScannedImage(currentImage);
    extractText(currentImage.path);
  };


  const extractText = async (image) => {
    try {
      const result = await TextRecognition.recognize(image);
      setImageText(result.text);
      console.log(result.text);
    } catch (error) {
      console.log(error);
    }
  };

  const takePhotoButton = () => {
    scanDocument();
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <Text style={styles.title}>Bill Splitter</Text>
            <Text style={styles.subTitle}>
              If your friends don't know how to read
              a receipt then just scan your receipt and it will create line items each person
              can claim.
            </Text>
            <Text style={styles.subTitle}>{imageText}</Text>

            <View style={styles.buttonContainer}>
              <Button onPress={scanDocument} title="Take Photo" color="#841584" />
            </View>

            <Image
              resizeMode="contain"
              style={{ width: '100%', height: '100%' }}
              source={{ uri: scannedImage }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'blue',
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
  scrollView: {
    backgroundColor: 'pink',
  },
  buttonContainer: {
    margin: 20,
  },
});
