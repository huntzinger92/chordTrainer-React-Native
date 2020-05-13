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
import {PracticalTest} from './practicalTestComponent.js';
import {Explanation} from './explanationComponent.js';

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

const App: () => React$Node = (props) => {
  //four possible options: 'home', 'explanation', 'test', 'practicalTest'
  const [displayComponent, setDisplayComponent] = useState('home');
  return (
    <ScrollView style={styles.appWrapper}>
      <StatusBar barStyle="dark-content" />
      {displayComponent === 'home' &&
        <View style={styles.homeWrapper}>
          <View style={styles.titleWrapper}>
            <Text style={styles.titleHeader}>A Comprehensive Chord Progression Ear Trainer</Text>
          </View>
          <TouchableOpacity
            onPress={() => setDisplayComponent('explanation')}
            style={styles.navigationButtons}
          >
            <Text style={styles.navigationText}>New to chord progressions?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setDisplayComponent('test')}
            style={styles.navigationButtons}
          >
            <Text style={styles.navigationText}>Take the test</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setDisplayComponent('practicalTest')}
            style={styles.navigationButtons}
          >
            <Text style={styles.navigationText}>Practical Examples</Text>
          </TouchableOpacity>
        </View>
      }
      {displayComponent === 'explanation' &&
        <View>
          <TouchableOpacity
            onPress={() => setDisplayComponent('home')}
            style={styles.navigationButtons}
          >
            <Text style={styles.navigationText}>Back icon goes here</Text>
          </TouchableOpacity>
          <Explanation/>
          <TouchableOpacity
            onPress={() => setDisplayComponent('test')}
            style={styles.navigationButtons}
          >
            <Text style={styles.navigationText}>Try the quiz!</Text>
          </TouchableOpacity>
        </View>
      }
      {displayComponent === 'test' &&
        <View>
          <TouchableOpacity
            onPress={() => setDisplayComponent('home')}
            style={styles.navigationButtons}
          >
            <Text style={styles.navigationText}>Back icon goes here</Text>
          </TouchableOpacity>
          <Test/>
        </View>
      }
      {displayComponent === 'practicalTest' &&
        <View>
          <TouchableOpacity
            onPress={() => setDisplayComponent('home')}
            style={styles.navigationButtons}
          >
            <Text style={styles.navigationText}>Back icon goes here</Text>
          </TouchableOpacity>
          <PracticalTest/>
        </View>
      }
    </ScrollView>
  );
};

export default App;
