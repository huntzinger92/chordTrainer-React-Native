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
      buttonArray: [],
      showAllPossible: true,
    };
    this.handleModeChange = this.handleModeChange.bind(this);
    this.makeClicked = this.makeClicked.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleGetNewChords = this.handleGetNewChords.bind(this);
    this.getSelection = this.getSelection.bind(this);
    this.generateButtons = this.generateButtons.bind(this);
    this.togglePossibleDisplay = this.togglePossibleDisplay.bind(this);

    //to be treated as immutable, generate false answers by filtering out correct answers on each generation of buttons
    this.allElectronicaChords = [['I', 'C, E, and G'], ['ii', 'D, F, and A'], ['iii', 'E, G, and B'], ['IV', 'F, A, and C'], ['V', 'G, B, and D'], ['vi', 'A, C, and E'], ['vii°', 'B, D, and F']];
    this.allFunkChords = [['im7', 'C, Eb, G, and Bb'], ['bIIM7', 'Db, F, Ab, and C'], ['iiø7', 'D, F, Ab, and C'], ['IIIM7', 'Eb, G, Bb, D'], ['ivm7', 'F, Ab, C, Eb'], ['IV7', 'F, A, C, Eb'], ['V7', 'G, B, D, and F'], ['V7alt', 'G, B, D#, F, and A#'], ['VIM7', 'Ab, C, Eb, and G'], ['viø7', 'A, C, Eb, and G'], ['VII7', 'Bb, D, F, Ab'], ['viiø7', 'B, D, F, Ab']];
    this.allJazzChords = [['IM7', 'C, E, G, and B'], ['I7', 'C, E, G, and Bb'], ['bIIM7', 'Db, F, Ab, and C'], ['iiø7', 'D, F, Ab, and C'], ['bIIIM7', 'Eb, G, Bb, and D'], ['iiim7', 'E, G, B, and D'], ['ivm7', 'F, Ab, C, and Eb'], ['IV7', 'F, A, C, and Eb'], ['IVM7', 'F, A, C, and E'], ['vm7', 'G, Bb, D, and F'], ['V7', 'G, B, D, and F'], ['V7alt', 'G, B, D#, F, and A#'], ['bVI7', 'Ab, C, Eb, and Gb'], ['bVIM7', 'Ab, C, Eb, and G'], ['vim7', 'A, C, E, and G'], ['bVII7', 'Bb, D, F, and Ab'], ['viiø7', 'B, D, F, and A'], ['vii°7', 'B, D, F, and Ab']];
    //all possible chords, assigned from handleModeChange (initalized with electronica chords)
    this.allPossibleChords = [['I', 'C, E, and G'], ['ii', 'D, F, and A'], ['iii', 'E, G, and B'], ['IV', 'F, A, and C'], ['V', 'G, B, and D'], ['vi', 'A, C, and E'], ['vii°', 'B, D, and F']];
    //array of correct chords used to generate right answers
    this.correctAnswers = [];
    //array of button information, each button row is a sublist containing objects of information for each button
    //this.buttonArray = [];
    //holds the playback sound, rewritten on each selection, expected to be automatically looped
    this.playbackObject = new Audio.Sound();
    //holds the selection object (src and correct chords)
    this.selection = {};

    this.clicked = {}; //will be an object that indicates whether each button has been clicked or not, temp hold in processing, passed to state on completion

    this.possibleChordButtonStyle = {fontSize: 24, fontFamily: 'serif', marginLeft: 'auto', marginRight: 'auto'};
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

  togglePossibleDisplay() {
    this.setState({
      showAllPossible: !this.state.showAllPossible
    });
  };

  handleModeChange(selectedMode) {
    this.setState({
      mode: selectedMode,
      stop: true,
      init: true,
      buttonArray: [],
    });

    this.clicked = {};

    if (selectedMode === 'electronica') {
      this.allPossibleChords = this.allElectronicaChords;
      this.possibleChordButtonStyle = {fontSize: 20, fontFamily: 'serif', marginLeft: 'auto', marginRight: 'auto'};
    } else if (selectedMode === 'funk') {
      this.allPossibleChords = this.allFunkChords;
      this.possibleChordButtonStyle = {fontSize: 19, fontFamily: 'serif', marginLeft: 'auto', marginRight: 'auto'};
    } else {
      this.allPossibleChords = this.allJazzChords;
      this.possibleChordButtonStyle = {fontSize: 16, fontFamily: 'serif', marginLeft: 'auto', marginRight: 'auto'};
    };
  };

  handlePlay() {
    //if app in initialized state (i.e., no selection chosen), get selection
    if (this.state.init) {
      this.getSelection();
    } else {
      //play the selection already chosen
      this.playSound();
    };
  };

  handleStop() {
    this.setState({
      stop: true,
    });
  };

  handleGetNewChords() {
    this.getSelection();
  };

  getSelection() {
    //clear out button and previous sound information:
    this.setState({
      init: false,
      stop: false,
      buttonArray: [],
    })
    //this.buttonArray = [];
    this.clicked = {};
    this.selection = {};
    this.correctAnswers = [];
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
    var tempButtonArray = [];

    //generate correct and incorrect answers, list of button rows and sublist of button info objects, also add booleans to this.clicked
    for (var i = 0; i < 4; i++) {
      var tempButtonList = [];

      //electronica and funk modes always start on the 1, disabled button with no wrong answers
      if (i === 0) {
        if (this.state.mode !== 'jazz') {
          //this.clicked[0] = false;
          tempButtonList.push({chordName: correctChords[i], correct: true, value: 0});
          tempButtonArray.push(tempButtonList);
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

        tempButtonList.push({chordName: wrongAnswersList[random][0], correct: false, value: (100 * i + 10 * j)});
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
      tempButtonArray.push(shuffledArray);
    };
    //note: this is essential to cause re-render on creation of buttons, won't happen for class variables
    this.setState({
      clicked: this.clicked,
      buttonArray: tempButtonArray
    });
    //console.log('this.buttonArray:');
    //console.log(this.buttonArray);
  };

  async playOneChord() {
    var playbackObject = new Audio.Sound();
    await playbackObject.loadAsync(practicalSoundbank.givenOneChord);
    await playbackObject.playAsync();
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

  showChordNames(chordNoteNameText) {
    alert('The notes for this chord (in root position) are ' + chordNoteNameText);
  };

  render() {
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
        <TouchableOpacity
          style={[practicalStyles.allPossibleWrapper, {marginLeft: this.state.showAllPossible ? 20 : 55, marginRight: this.state.showAllPossible ? 20 : 55}]}
          onPress={this.state.showAllPossible ? undefined : () => this.togglePossibleDisplay()}
          disabled={this.state.showAllPossible ? true : false}
        >
          <TouchableOpacity
            onPress={() => this.togglePossibleDisplay()}
            style={{marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', borderWidth: this.state.showAllPossible ? 1 : 0, borderRadius: this.state.showAllPossible ? 5 : 0, padding: this.state.showAllPossible ? 10 : 0}}
          >
            <Text style={{fontSize: 20}}>{this.state.showAllPossible ? 'Hide' : 'Show All Possible Chords'}</Text>
          </TouchableOpacity>
          {this.state.showAllPossible && <View>
            <Text style={{fontSize: 16, marginLeft: 'auto', marginRight: 'auto', marginBottom: 8}}>(click to see notes)</Text>
            <View style={practicalStyles.possibleChordsWrapper}>
            {this.allPossibleChords.map(chordName =>
              <TouchableOpacity
                style={practicalStyles.chordNameButton}
                onPress={() => this.showChordNames(chordName[1])}
              >
                <Text style={this.possibleChordButtonStyle}>{chordName[0]}</Text>
              </TouchableOpacity>
              )
            }
            </View>
          </View>
          }
        </TouchableOpacity>
        {this.state.mode === 'jazz' && <View style={{flexDirection: 'row', marginTop: 5, backgroundColor: 'white', borderWidth: 1, borderRadius: 5, marginLeft: 55, marginRight: 55,}}>
          <TouchableOpacity
            style={{marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', padding: 7}}
            onPress={() => this.playOneChord()}
          >
            <Text style={practicalStyles.oneChordLabel}>Hear the tonic:</Text>
            <Text style={{fontSize: 21, fontWeight: 'bold', fontFamily: 'serif', alignSelf: 'center'}}>IM7</Text>
          </TouchableOpacity>
        </View>
        }
        <View style={practicalStyles.buttonAreaWrapper}>
        {
          this.state.buttonArray.map(row =>
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
