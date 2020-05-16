import React, {useState} from 'react';
//icons
import { FontAwesome } from '@expo/vector-icons';
//custon components
import {Test} from './testComponent.js';
import {PracticalTest} from './practicalTestComponent.js';
import {Explanation} from './explanationComponent.js';

//stylesheet
import {styles} from './styles.js';

//regular components
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
      <View style={styles.titleWrapper}>
        {displayComponent !== 'home' && <TouchableOpacity
          onPress={() => setDisplayComponent('home')}
          style={styles.homeButton}
        >
          <FontAwesome name="home" size={38} color="black"/>
        </TouchableOpacity>}
        <Text style={[styles.titleHeader, displayComponent !== 'home' ? {marginLeft: 8, marginTop: 8} : {fontSize: 24}]}>Chord Progression Ear Trainer</Text>
      </View>
      {displayComponent === 'home' &&
        <View style={styles.homeWrapper}>
          <TouchableOpacity
            onPress={() => setDisplayComponent('explanation')}
            style={[styles.navigationButtons, {marginTop: 40}]}
          >
            <Text style={styles.navigationText}>Review the Theory</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setDisplayComponent('test')}
            style={styles.navigationButtons}
          >
            <Text style={styles.navigationText}>Take the Test</Text>
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
          <Explanation/>
          <TouchableOpacity
            onPress={() => setDisplayComponent('test')}
            style={[styles.navigationButtons, {width: 185, marginTop: 7}]}
          >
            <Text style={styles.navigationText}>Try the quiz!</Text>
          </TouchableOpacity>
        </View>
      }
      {displayComponent === 'test' &&
        <View>
          <Test/>
        </View>
      }
      {displayComponent === 'practicalTest' &&
        <View>
          <PracticalTest/>
        </View>
      }
    </ScrollView>
  );
};

export default App;
