import React, {useState} from 'react';
//toggle sliders (replacing checkboxes from web app - checkboxes are difficult to style)
import ToggleSwitch from 'toggle-switch-react-native';

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

export function Explanation() {
  return (
    <View style={styles.explanationWrapper}>
      <Text style={styles.explanationIntroText}>This app helps you practice identifying a wide variety of chord progressions by ear. It quizzes you on randomized
      chord progressions, generated from settings you have a high degree of control over. Being able to quickly identify chord progressions by ear is an essential skill for
      any musician!
      </Text>
      <Text style={[styles.explanationIntroText, {borderBottomWidth: 1, paddingBottom: 12,}]}>To get the most of out your practice, it's best to already have a basic understanding of the different
      types of chords. You can find a beginner friendly explanation of them <Text style={{textDecorationLine: 'underline'}} onPress={() => Linking.openURL('https://www.musictheory.net/lessons/40')}>here</Text>.
      </Text>
      <Text style={styles.explanationHeader}>A Quick Overview</Text>
      <Text style={styles.explanationText}>In any given key or mode (such as C major or D minor), there are seven chords you can make, each one based off of one note of the scale. The names of these chords
      come from which note of the scale they are based on, known as "scale degrees". These chords are written as the roman numeral of whatever scale degree they are based on.
      </Text>
      <Text style={styles.explanationText}>These chords come in many different types - the most simple of which are major and minor. The quality of the chord determines whether or not the
      roman numeral is written uppercase or lowercase, as well as any symbols that need to be added. For example, if a chord is major, its roman numeral will be capitalized;
      if it's minor, its roman numeral will be lowercase.
      </Text>
      <Text style={styles.explanationText}>Here is a simple chord chart that shows you the notes of the C major scale, each chord produced from them, and how that chord would be written as a roman numeral:
      </Text>
      <View style={styles.exampleGrid}>
        <View style={styles.exampleRowGrid}>
          <View style={styles.exampleRowTitle}>
            <Text style={[styles.exampleRowTitleText, styles.exampleGridText]}>Scale:</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>C</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>D</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>E</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>F</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>G</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>A</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>B</Text>
          </View>
        </View>
        <View style={styles.exampleRowGrid}>
          <View style={styles.exampleRowTitle}>
            <Text style={[styles.exampleRowTitleText, styles.exampleGridText]}>Chord:</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>C</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>Dm</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>Em</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>F</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>G</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>Am</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>Bdim</Text>
          </View>
        </View>
        <View style={styles.exampleRowGrid}>
          <View style={styles.exampleRowTitle}>
            <Text style={[styles.exampleRowTitleText, styles.exampleGridText]}>Roman Numeral:</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>I</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>ii</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>iii</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>IV</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>V</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>vi</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>vii°</Text>
          </View>
        </View>
      </View>
      <Text style={styles.explanationText}>Note that every chord is major or minor except for the seven chord, which is diminished, written lowercase and with a degree
      symbol. These chords are all triads, which mean they only use three notes. The notation gets a little more complex, however, for seventh chords (which use four, and
      have more types). Let's make a chart of the all the seventh chords of the C major scale:
      </Text>
      <View style={styles.exampleGrid}>
        <View style={styles.exampleRowGrid}>
          <View style={styles.exampleRowTitle}>
            <Text style={[styles.exampleRowTitleText, styles.exampleGridText]}>Scale: </Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>C</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>D</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>E</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>F</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>G</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>A</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>B</Text>
          </View>
        </View>
        <View style={styles.exampleRowGrid}>
          <View style={styles.exampleRowTitle}>
            <Text style={[styles.exampleRowTitleText, styles.exampleGridText]}>Chord: </Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>Cmaj7</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>Dm7</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>Em7</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>Fmaj7</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>G7</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>Am7</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>Bø7</Text>
          </View>
        </View>
        <View style={styles.exampleRowGrid}>
          <View style={styles.exampleRowTitle}>
            <Text style={[styles.exampleRowTitleText, styles.exampleGridText]}>Roman Numeral: </Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>IM7</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>iim7</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>iiim7</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>IVM7</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>V7</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>vim7</Text>
          </View>
          <View style={styles.exampleViewGrid}>
            <Text style={styles.exampleGridText}>viiø7</Text>
          </View>
        </View>
      </View>
      <Text style={styles.explanationText}>There are four types of seventh chords present - major seventh chords ("IM7"), minor seventh chords ("iim7"), dominant seventh chords ("V7"), and half
      diminished seventh chords (viiø7). Like triads, each chord type has a distinctive sound quality from the others. There are more rules for roman numeral notation not
      covered here, but you can find a comprehensive list <Text style={{textDecorationLine: 'underline'}} onPress={() => Linking.openURL('https://en.wikipedia.org/wiki/Roman_numeral_analysis')}>here</Text>.
      </Text>
    </View>
  );
};
