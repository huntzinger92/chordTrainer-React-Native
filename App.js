import React, {useState} from 'react';
//icons
import { FontAwesome } from '@expo/vector-icons';
//custon components
import {About} from './aboutComponent.js';
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
  Picker,
  ImageBackground
} from 'react-native';

import { CheckBox } from 'native-base';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';

// Set global test device ID
//await setTestDeviceIDAsync('EMULATOR');

const App: () => React$Node = (props) => {
  //five possible options: 'home', 'about', 'explanation', 'test', 'practicalTest'
  const [displayComponent, setDisplayComponent] = useState('home');
  const [correctCount, setCorrectCount] = useState(0);
  function incrementCorrectCount() {
    //users get 8 correct answers and then an interstitial loads
    if (correctCount === 7) {
      setCorrectCount(0);
      //request interstitial
      createInterstitial();
    } else {
      setCorrectCount(correctCount + 1);
    };
  };
  async function createInterstitial() {
    await AdMobInterstitial.setAdUnitID('ca-app-pub-5478603993874180/3114601666'); // Test ID, Replace with your-admob-unit-id
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
    await AdMobInterstitial.showAdAsync();
  };
  return (
    <ImageBackground source={require('./assets/whiteTexture.jpg')} style={styles.backgroundImage}>
    <ScrollView style={styles.appWrapper}>
      <StatusBar barStyle='default'/>
      <View style={styles.titleWrapper}>
        {displayComponent !== 'home' && <TouchableOpacity
          onPress={() => setDisplayComponent('home')}
          style={styles.homeButton}
        >
          <FontAwesome name="home" size={38} color="black"/>
        </TouchableOpacity>}
        <Text style={[styles.titleHeader, displayComponent !== 'home' ? {marginLeft: 8, marginTop: 8} : {fontSize: 27}]}>A Chord Progression Ear Trainer</Text>
      </View>
      {displayComponent === 'home' &&
        <View style={styles.homeWrapper}>
          <TouchableOpacity
            onPress={() => setDisplayComponent('about')}
            style={[styles.navigationButtons, {marginTop: 40}]}
          >
            <Text style={styles.navigationText}>About the App</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setDisplayComponent('explanation')}
            style={styles.navigationButtons}
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
      {displayComponent === 'about' &&
        <View>
          <View style={{marginTop: 0}}>
            <AdMobBanner
              bannerSize="fullBanner"
              adUnitID="ca-app-pub-5478603993874180/3789389088" // Test ID, Replace with your-admob-unit-id
              servePersonalizedAds // true or false
            />
          </View>
          <About/>
        </View>
      }
      {displayComponent === 'explanation' &&
        <View>
          <AdMobBanner
            bannerSize="fullBanner"
            adUnitID="ca-app-pub-5478603993874180/3789389088" // Test ID, Replace with your-admob-unit-id
            servePersonalizedAds // true or false
          />
          <Explanation/>
          <TouchableOpacity
            onPress={() => setDisplayComponent('test')}
            style={[styles.navigationButtons, {width: 185, marginTop: 0, marginBottom: 10}]}
          >
            <Text style={[styles.navigationText, {marginBottom: 0}]}>Try the Quiz!</Text>
          </TouchableOpacity>
        </View>
      }
      {displayComponent === 'test' &&
        <Test
          incrementCorrectCount={incrementCorrectCount}
        />
      }
      {displayComponent === 'practicalTest' &&
        <View>
          <PracticalTest
            incrementCorrectCount={incrementCorrectCount}
          />
        </View>
      }
      <View style={{marginBottom: 0}}>
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
          servePersonalizedAds // true or false
        />
      </View>
    </ScrollView>

    </ImageBackground>
  );
};

export default App;
