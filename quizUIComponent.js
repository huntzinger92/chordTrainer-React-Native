import React, {useState} from 'react';
//soundbank is a constant list of chord objects, to be treated as immutable
//import {soundbank} from './soundbank.js';
//function that receives chord object as parameter and, depending on its prop values, returns the chord in notation, i.e. (Imaj7, iv, V7, etc.)
import {intToChordName} from './int-to-chord-name.js';
//expo av library
import {Audio} from 'expo-av';
import AwesomeAlert from 'react-native-awesome-alerts';
//toggle sliders (replacing checkboxes from web app - checkboxes are difficult to style)
import ToggleSwitch from 'toggle-switch-react-native';

import {styles} from './styles.js';

import {CorrectButton} from './correctButtonComponent.js';
import {IncorrectButton} from './incorrectButtonComponent.js';

import {
  SafeAreaView,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert
} from 'react-native';

import { CheckBox } from 'native-base';

export class QuizUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: {}, //object with boolean for each button element's clicked state (key is trivial integer value unique to button), passed to button components as prop
    };
    this.makeClicked = this.makeClicked.bind(this);
    this.getButtons = this.getButtons.bind(this);
    this.cleanChordNameData = this.cleanChordNameData.bind(this);
    this.correctCounter = this.correctCounter.bind(this);
    //variables
    this.newAllowedList = this.props.chordsAllowed; //do not want to alter original list to keep stuff from getting more complicated and co-dependent

    this.possibleChordNames = []; //names of possible chords, used to generate false answers

    this.actualChordNames = []; //names of sounded, correct chords

    this.buttonArray = []; //stores all buttons as object where each row of buttons is a sublist, object rendered as html with map in render() below

    this.clicked = {}; //will be an object that indicates whether each button has been clicked or not, temp hold in processing, passed to state on completion

    this.incorrectAmount = ''; //tracks the amount of incorrect chords to generate, used for spacing purposes in the first row (so given one chord size is responsive)

    this.correctCount = 0;
  };

  componentDidUpdate() {

    if (this.props.init) { //if init from parent component, clear out buttons, correct count, and clicked object
      this.clicked = {};
      this.buttonArray = [];
      this.correctCount = 0;
      this.cleanChordNameData();
    };

    if (this.props.chords.length > 0 && this.buttonArray.length < 1) { //if we have chords, but not buttons
      this.cleanChordNameData();
      this.getButtons();
    };
  };

  componentWillMount() {
    this.cleanChordNameData();
  };

  correctCounter() {
    // === this.props.amount - 2 because we need to take away one for the given one chord and one because we only increment if this isn't the final correct answer (handled in else)
    if (this.correctCount === this.props.amount - 2) {
      this.correctCount = 0;
      //this.props.handleStop();
      this.props.showAlert();
    } else {
      this.correctCount++;
    };
  };

  makeClicked(buttonValue) {
    this.clicked[buttonValue] = true;
    this.setState({clicked: this.clicked});
  };

  cleanChordNameData() {
    this.newAllowedList = this.props.chordsAllowed; //likely redundant, but ensures that this.newAllowedList is always tracking changing prop
    this.newAllowedList.sort(function(a,b) { //always list possible chords in ascending order
      return a.name - b.name;
    });

    var minor = this.props.minor; //for each callback loses access to this
    var chordClass = this.props.chordClass;
    this.newAllowedList.forEach(function(chord) { //make sure each entry's quality prop is assigned (should already be, but redundancy just in case)
      if (minor && chord[chordClass].qualityMinor) {
        chord.quality = chord[chordClass].qualityMinor;
      } else {
        chord.quality = chord[chordClass].quality;
      };
    });

    this.possibleChordNames = this.newAllowedList.map(function(a) {
      //console.log('generating new incorrect button names...');
      //console.log(intToChordName(a));
      return intToChordName(a);
    });

    this.actualChordNames = this.props.chords.map(function(a) {
      //console.log('generating new correct button names...');
      //console.log(intToChordName(a));
      return intToChordName(a);
    });
  };

  getButtons() {
    this.clicked = {};
    //only generate buttons if we have chords and not buttons (likely redundant, but trying to be safe)
    if (this.props.chords.length > 0 && Object.keys(this.buttonArray).length < 1) {
      var actualChordNames = this.actualChordNames; //loses access to this inside callbacks
      for (var i = 0; i <this.actualChordNames.length; i++) {
        //will hold a list of objects where each object is a button with an integer value representing position and two props, chordName, and a boolean indicating whether or not answer is correct, and value, used for element key and for style reference
        var tempButtonList = [];
        this.clicked[i] = false;
        //console.log('correct chord button name: ' + actualChordNames[i]);
        tempButtonList.push({chordName: actualChordNames[i], correct: true, value: (i)}); //generate correct answers, value should always be single digit

        var answerlessAllowed = this.possibleChordNames.filter(function(a) { //create list without correct answer from all possible chords to generate wrong answers from
          return a !== actualChordNames[i];
        });
        //var incorrectAmount;
        var random;

        if (this.possibleChordNames.length > 4) { //if 2 allowed chords, 1 wrong answer, if 3, then 2, if 4+, then 3
          this.incorrectAmount = 3;
        } else {
          this.incorrectAmount = this.possibleChordNames.length - 1;
        };

        if (i > 0) {
          for (var j = 0; j < this.incorrectAmount; j++) { //generate incorrect answers, only after first row (which will be single button displaying one chord)
            this.clicked[10 * i + j] = false;
            random = Math.floor(Math.random() * answerlessAllowed.length); //index of random chord
            //console.log('incorrect button chordname: ' + answerlessAllowed[random]);
            tempButtonList.push({chordName: answerlessAllowed[random], correct: false, value: (10 * i + j)});
            answerlessAllowed.splice(random, 1);
          };
        };

      //randomize row before pushing
      var shuffledArray = [];
      while (tempButtonList.length !== 0) {
        var randIndex = Math.floor(Math.random() * tempButtonList.length);
        shuffledArray.push(tempButtonList[randIndex]);
        tempButtonList.splice(randIndex, 1);
      };
      this.buttonArray.push(shuffledArray); //each list of objects represents a row and will be rendered wrapped in a View to ensure proper line breaks
      };
    };
  };

  render() {
    return (
      <ScrollView style={styles.quizUIWrapper}>
        {this.props.displayPossible &&
        <View style={styles.possibleChordsWrapper}>
          <Text style={styles.possibleChordsHeader}>Possible chords:</Text>
        <View style={styles.possibleChordsNameWrapper}>
        {this.possibleChordNames.map(function(a, index) {
          return <Text style={styles.possibleChordsName} key={index}>{a}</Text>
          })}
        </View>
      </View>}
      <View>
          {
            this.buttonArray.map(row =>
              <View style={styles.buttonRow}>
                <Text style={styles.rowBullet}>{'\u2B24'}</Text>
                {row.map(chord => chord.correct ?
                  <CorrectButton key={chord.value} value={chord.value} clicked={this.clicked[chord.value]} makeClicked={this.makeClicked} correctCounter={this.correctCounter} chordName={chord.chordName}/> :
                  <IncorrectButton key={chord.value} value={chord.value} clicked={this.clicked[chord.value]} makeClicked={this.makeClicked} chordName={chord.chordName}/>
                )}
                {row.length === 1 &&
                  <View style={{flex: this.incorrectAmount}}>
                  </View>
                }
              </View>
            )
          }
      </View>
    </ScrollView>
    );
  };
};

//will generate a clickable Button with chord name displayed, will become red when clicked
