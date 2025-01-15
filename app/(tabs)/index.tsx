import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import {
  SafeAreaView,
  SafeAreaProvider
} from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.title}>Bill Splitter</Text>
          <Text style={styles.subTitle}>
            If your friends don't know how to read
            a receipt then just scan your receipt and it will create line items each person
            can claim.
          </Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
    fontSize: 50,
  },
  subTitle: {
    textAlign: 'center',
    fontSize: 20,
  }
});
