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
      <View style={styles.explanationHeaderWrapper}>
        <Text style={styles.explanationHeader}>About</Text>
      </View>
      <Text style={styles.explanationIntroText}>
        This app is designed to help you practice identifying a wide variety of chord progressions by ear.
      </Text>
      <Text style={styles.explanationIntroText}>
        You can test over chord progressions (randomly generated from
        settings you have a very fine degree of control over) in the "Take the Test" portion. If you want to practice hearing them in musical contexts, check out the
        "Practical Examples" section, which quizzes you on common chord progressions in multiple genres.
      </Text>
      <Text style={styles.explanationIntroText}>
        If you need to brush up on your understanding of chords and their
        different types, just click "Review the Theory" on the home page and I'll walk you through it!
      </Text>
      <Text style={styles.explanationIntroText}>
        To get the most of out practicing with this tool, it's best to already have a basic understanding of music theory, intervals and scales in particular. If you still need
        to learn that stuff, no problem! You can find a beginner friendly explanation of them <Text style={{textDecorationLine: 'underline'}} onPress={() => Linking.openURL('https://www.musictheory.net/lessons')}>here</Text>.
      </Text>
      <Text style={styles.explanationIntroText}>
        Want to report a bug or just say hello?
      </Text>
      <Text style={[styles.explanationIntroText, {textAlign: 'center', fontSize: 24, width: 250, borderWidth: 1, marginLeft: 'auto', marginRight: 'auto', borderRadius: 10, padding: 8, }]} onPress={() => Linking.openURL('https://trevorspheresmith.com/contact')}>Contact me!</Text>
    </View>
  );
};
