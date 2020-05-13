import React, {useState} from 'react';
//soundbank is a constant list of chord objects, to be treated as immutable
import {soundbank} from './soundbank.js';
//function that receives chord object as parameter and, depending on its prop values, returns the chord in notation, i.e. (Imaj7, iv, V7, etc.)
import {intToChordName} from './int-to-chord-name.js';
//expo av library
import {Audio} from 'expo-av';
//toggle sliders (replacing checkboxes from web app - checkboxes are difficult to style)
import ToggleSwitch from 'toggle-switch-react-native';

import {Test} from './testComponent.js';

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
  Picker
} from 'react-native';

import { CheckBox } from 'native-base';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export class PracticalTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: ''
    };
  };
  render() {
    return (
      <Text>Practical Portion goes here</Text>
    );
  };
};
