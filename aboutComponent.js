import React, {useState} from 'react';
//toggle sliders (replacing checkboxes from web app - checkboxes are difficult to style)
import {styles} from './styles.js';

import {
  SafeAreaView,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Picker,
  Linking
} from 'react-native';

export function About() {
  return (
    <View style={styles.explanationWrapper}>
      <Text style={styles.explanationHeader}>About</Text>
      <Text style={styles.explanationIntroText}>
        This app is designed to help you practice identifying a wide variety of chord progressions by ear.
      </Text>
      <Text style={styles.explanationIntroText}>
        To get the most of out
        practicing with this tool, it's best to already have a basic understanding of the different types of chords. You can find a beginner friendly explanation of them <Text style={{textDecorationLine: 'underline'}} onPress={() => Linking.openURL('https://www.musictheory.net/lessons/40')}>here</Text>.
      </Text>
      <Text style={styles.explanationIntroText}>
        Want to report a bug or just say hello?
      </Text>
      <Text style={[styles.explanationIntroText, {textAlign: 'center', fontSize: 24}]} onPress={() => Linking.openURL('https://trevorspheresmith.com/contact')}>Contact me!</Text>
    </View>
  );
};
