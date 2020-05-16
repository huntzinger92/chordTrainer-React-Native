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
    this.allElectronicaChords = [];
    this.allFunkChords = [];
    this.allJazzChords = [];
    //array of correct chords used to generate right answers
    this.CorrectAnswers = [];
    //array of incorrect chords used to generate wrong answers
    this.incorrectAnswers = [];
    //holds the playback sound, rewritten on each selection, expected to be automatically looped
    this.playbackObject = new Audio.Sound();
    this.clicked = {}; //will be an object that indicates whether each button has been clicked or not, temp hold in processing, passed to state on completion
  };

  handleModeChange(selectedMode) {
    this.setState({
      mode: selectedMode,
      stop: true,
      init: true,
    });
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
    this.getSelection();
  };

  getSelection() {
    //select random chord progression from mode of practicalSoundbank here
    this.generateButtons();
  };

  generateButtons() {
    //generate correct and incorrect answers information
    this.playSound();
  };

  playSound() {
    //load and play sound (function probably needs to be async to use await keyword)
    //make sure that status is set to loop
  };

  makeClicked() {
    //copy from quizUIComponent.js
  }

  render() {
    //will eventually include the buttonRow map stuff below to create button rows
    return (
      <View style={practicalStyles.practicalWrapper}>
        <View style={practicalStyles.settingsAndSoundRow}>
          <TouchableOpacity style={practicalStyles.soundButton}>
            <AntDesign name='caretright' size={25}/>
          </TouchableOpacity>
          <TouchableOpacity style={practicalStyles.soundButton}>
            <FontAwesome name="stop" size={22} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={practicalStyles.soundButton}>
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
      </View>
    );
  };
};
