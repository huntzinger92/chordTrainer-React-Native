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
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  BackHandler,
  Image,
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

  //called from test and practical components when question is answered complete
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

  const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    if (displayComponent !== 'home') {
      setDisplayComponent('home');
      return true;
    } else {
      BackHandler.exitApp();
    };
  });

  //<FontAwesome name="home" size={38} color="black"/>
  return (
    <ImageBackground source={require('./assets/whiteTexture.jpg')} style={styles.backgroundImage}>
    <View style={styles.appWrapper}>
      <StatusBar barStyle='default'/>
      <View style={styles.titleWrapper}>
        <TouchableOpacity
          onPress={() => setDisplayComponent('home')}
          style={styles.homeButton}
        >
          <Image
            source={require('./assets/iconPale.png')}
            resizeMode='contain'
            style={{width: 50, height: 50}}
          />
        </TouchableOpacity>
        <Text style={[styles.titleHeader, {marginLeft: 8, marginTop: 8}]}>A Chord Progression Ear Trainer</Text>
      </View>
      <ScrollView>
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

          <About/>
        </View>
      }
      {displayComponent === 'explanation' &&
        <View>

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
      </ScrollView>
      <View style={{marginTop: 'auto', borderWidth: 1}}>
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-5478603993874180/3789389088"
          servePersonalizedAds={true}
        />
      </View>
    </View>
    </ImageBackground>
  );
};

export default App;
