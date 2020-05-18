import React, {useState} from 'react';
//replace with practicalSoundbank.js
import {practicalSoundbank} from './practicalSoundbank.js';
//expo av library
import {Audio} from 'expo-av';
//toggle sliders (replacing checkboxes from web app - checkboxes are difficult to style)
import {practicalStyles} from './practicalStyles.js';
//icons
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

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

import {CorrectButton} from './correctButtonComponent.js';
import {IncorrectButton} from './incorrectButtonComponent.js';

//will be importing same buttons from other quiz, you need to make sure that you set them up in exactly the same way, with makeClicked and buttonArray tracking clicked

export class PracticalTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'electronica', //which level of difficulty, and thus which bank of sounds to pull from
      stop: false, //
      init: true, //if init is true, get chords and butttons, else, just play sound,
      clicked: {}, //object with boolean for each button element's clicked state (key is trivial integer value unique to button), passed to button components as prop
    };
    this.handleModeChange = this.handleModeChange.bind(this);
    this.makeClicked = this.makeClicked.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleGetNewChords = this.handleGetNewChords.bind(this);
    this.getSelection = this.getSelection.bind(this);
    this.generateButtons = this.generateButtons.bind(this);

    //to be treated as immutable, generate false answers by filtering out correct answers on each generation of buttons
    this.allElectronicaChords = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];
    this.allFunkChords = ['im7', 'bIIM7', 'iiø7', 'IIIM7', 'ivm7', 'IV7', 'V7', 'V7alt', 'VIM7', 'viø7', 'VII7', 'viiø7',];
    this.allJazzChords = ['IM7', 'I7', 'bIIM7', 'iiø7', 'bIIIM7', 'iiim7', 'ivm7', 'IV7', 'IVM7', 'vm7', 'V7', 'V7alt', 'bVI7', 'bVIM7', 'vim7', 'bVII7', 'viiø7', 'vii°7'];
    //all possible chords, assigned from handleModeChange (initalized with electronica chords)
    this.allPossibleChords = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];
    //array of correct chords used to generate right answers
    this.correctAnswers = [];
    //array of button information, each button row is a sublist containing objects of information for each button
    this.buttonArray = [];
    //holds the playback sound, rewritten on each selection, expected to be automatically looped
    this.playbackObject = new Audio.Sound();
    //holds the selection object (src and correct chords)
    this.selection = {};

    this.clicked = {}; //will be an object that indicates whether each button has been clicked or not, temp hold in processing, passed to state on completion
  };

  componentDidUpdate() {
    if (this.state.stop) {
      this.playbackObject.setStatusAsync({ isLooping: false });
      this.setState({stop: false});
    };
  };

  makeClicked(buttonValue) {
    this.clicked[buttonValue] = true;
    this.setState({clicked: this.clicked});
  };

  handleModeChange(selectedMode) {
    this.setState({
      mode: selectedMode,
      stop: true,
      init: true,
    });

    if (selectedMode === 'electronica') {
      this.allPossibleChords = this.allElectronicaChords;
    } else if (selectedMode === 'funk') {
      this.allPossibleChords = this.allFunkChords;
    } else {
      this.allPossibleChords = this.allJazzChords;
    };
  };

  handlePlay() {
    if (this.state.init) {
      this.getSelection();
    } else {
      this.playSound();
    };
  };

  handleStop() {
    this.setState({
      stop: true
    });
  };

  handleGetNewChords() {
    this.setState({
      init: false,
      stop: false,
    });
    this.buttonArray = [];
    this.clicked = {};
    this.selection = {};
    this.correctAnswers = [];

    this.getSelection();
  };

  getSelection() {
    //select random chord progression from mode of practicalSoundbank here
    var selectionListLength = practicalSoundbank[this.state.mode].length;
    Object.assign(this.selection, practicalSoundbank[this.state.mode][Math.floor(Math.random() * selectionListLength)]);
    this.generateButtons();
    this.playSound();
  };

  generateButtons() {
    this.correctAnswers = this.selection.correctChords;
    //lose access to this inside for loops, so copy this.correctAnswers
    var correctChords = this.correctAnswers;
    var allPossibleChordsList = this.allPossibleChords;

    //generate correct and incorrect answers, list of button rows and sublist of button info objects, also add booleans to this.clicked
    for (var i = 0; i < 4; i++) {
      var tempButtonList = [];

      //electronica and funk modes always start on the 1, disabled button with no wrong answers
      if (i === 0) {
        if (this.state.mode !== 'jazz') {
          //this.clicked[0] = false;
          tempButtonList.push({chordName: correctChords[i], correct: true, value: 0});
          this.buttonArray.push(tempButtonList);
          continue;
        };
      };
      //create a tempList of all possible answers except the correct one
      var wrongAnswersList = allPossibleChordsList.filter((chord) => chord != correctChords[i]);
      //add correct answer
      this.clicked[i + 1] = false;
      tempButtonList.push({chordName: correctChords[i], correct: true, value: (i + 1)});
      //generate three incorrect answers
      for (var j = 2; j < 5; j++) {
        this.clicked[10 * i + j] = false;
        var random = Math.floor(Math.random() * wrongAnswersList.length); //index of random chord
        tempButtonList.push({chordName: wrongAnswersList[random], correct: false, value: (100 * i + 10 * j)});
        wrongAnswersList.splice(random, 1);
      };
      //tempButtonList now contains a list of objects that make up a row of buttons
      //shuffle this list:
      var shuffledArray = [];
      while (tempButtonList.length !== 0) {
        var randIndex = Math.floor(Math.random() * tempButtonList.length);
        shuffledArray.push(tempButtonList[randIndex]);
        tempButtonList.splice(randIndex, 1);
      };
      //push row to "master" list of buttons
      this.buttonArray.push(shuffledArray);
    };
    //note: this is essential to cause re-render on creation of buttons, won't happen for class variables
    this.setState({
      clicked: this.clicked
    });
    //console.log('this.buttonArray:');
    //console.log(this.buttonArray);
  };

  async playSound() {
    //load and play sound (function probably needs to be async to use await keyword)
    //console.log(this.selection);
    try {
      await this.playbackObject.unloadAsync();
    } catch(error) {
      console.log("couldn't unload sound because: " + error);
    };
    try {
      await this.playbackObject.loadAsync(this.selection.src, {isLooping: true});
    } catch(error) {
      console.log('could not play sound because: ' + error);
    }
    try {
      await this.playbackObject.playAsync();
    } catch (error) {
      console.log("sound didn't play because" + error);
    };
    //make sure that status is set to loop
  };

  render() {
    //will eventually include the buttonRow map stuff below to create button rows
    return (
      <View style={practicalStyles.practicalWrapper}>
        <View style={practicalStyles.settingsAndSoundRow}>
          <TouchableOpacity
            style={practicalStyles.soundButton}
            onPress={() => this.handlePlay()}
            >
            <AntDesign name='caretright' size={25}/>
          </TouchableOpacity>
          <TouchableOpacity
            style={practicalStyles.soundButton}
            onPress={() => this.handleStop()}
            >
            <FontAwesome name="stop" size={22} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={practicalStyles.soundButton}
            onPress={() => this.handleGetNewChords()}
            >
            <FontAwesome name="refresh" size={24} color="black" />
          </TouchableOpacity>
          <View style={practicalStyles.modeDropdownWrapper}>
            <Picker
              onValueChange={(selectedMode) => this.handleModeChange(selectedMode)}
              selectedValue={this.state.mode}
              style={practicalStyles.modeDropdown}
            >
              <Picker.Item label='Electronica (easy)' value={'electronica'} />
              <Picker.Item label='Funk (medium)' value={'funk'} />
              <Picker.Item label='Jazz (hard)' value={'jazz'} />
            </Picker>
          </View>
        </View>
        <View style={practicalStyles.buttonAreaWrapper}>
        {
          this.buttonArray.map(row =>
            <View style={practicalStyles.buttonRow}>
              <Text style={practicalStyles.rowBullet}>{'\u2B24'}</Text>
              {row.map(chord => chord.correct ?
                <CorrectButton key={chord.value} value={chord.value} clicked={this.clicked[chord.value]} makeClicked={this.makeClicked} chordName={chord.chordName}/> :
                <IncorrectButton key={chord.value} value={chord.value} clicked={this.clicked[chord.value]} makeClicked={this.makeClicked} chordName={chord.chordName}/>
              )}
              {row.length === 1 &&
                <View style={{flex: 3}}>
                </View>
              }
            </View>
          )
        }
        </View>
      </View>
    );
  };
};
