import React, {useState} from 'react';
//toggle sliders (replacing checkboxes from web app - checkboxes are difficult to style)
import {styles} from './styles.js';

import AwesomeAlert from 'react-native-awesome-alerts';

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

export class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showAlert: false};

    this.showAlert = this.showAlert.bind(this);
    this.hideAlert = this.hideAlert.bind(this);

    this.privacyPolicy = "This app is ad supported. It is free and intended for use as is.\n\nBy using this app, you consent to collection of user data as defined here.\n\nI do not personally track your data, but this app uses three third party services that may do so: Google Play Services, AdMob, and Expo.\n\nThis app will never intentionally collect data on children below the age of 13. If it does so accidentally, the information will be deleted from servers immediately.\n\nThis privacy policy is effective as of 06/03/20 and current. Please contact me if you have any questions.";
  };

  showAlert() {
    this.setState({showAlert: true});
  };

 hideAlert() {
   this.setState({showAlert: false});
 };

  render() {
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
        <View style={{marginRight: 'auto', marginLeft: 'auto', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 7}}>
          <TouchableOpacity style={{width: 160, height: 50, borderWidth: 1, borderRadius: 10, padding: 8, backgroundColor: 'white', marginRight: 7}} onPress={() => Linking.openURL('https://trevorspheresmith.com/contact')}>
            <Text style={[styles.explanationIntroText, {textAlign: 'center', marginTop: 'auto', marginBottom: 'auto', fontSize: 20}]}>Contact me!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{textAlign: 'center', width: 160, height: 50, borderWidth: 1, borderRadius: 10, padding: 8, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginLeft: 7}} onPress={() => this.showAlert()}>
            <Text style={{fontSize: 20}}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
        <AwesomeAlert
          overlayStyle={{backgroundColor: '#ebf1fa', opacity: 0.1, elevation: 10}}
          contentContainerStyle={{borderWidth: 1, borderRadius: 5, elevation: 10, minWidth: 100,}}
          show={this.state.showAlert}
          showProgress={false}
          title="Privacy Policy"
          message={this.privacyPolicy}
          titleStyle={{fontSize: 18, fontWeight: 'bold', color: 'black'}}
          messageStyle={{fontSize: 15, color: 'black'}}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="  OK  "
          confirmButtonColor="#32a852"
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
      </View>
    );
  };
};
