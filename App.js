import React, {useState} from 'react';
//soundbank is a constant list of chord objects, to be treated as immutable
import {soundbank} from './soundbank.js';
//function that receives chord object as parameter and, depending on its prop values, returns the chord in notation, i.e. (Imaj7, iv, V7, etc.)
import {intToChordName} from './int-to-chord-name.js'
import {Audio} from 'expo-av';

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
  //three possible options: 'home', 'explanation', 'test'
  const [displayComponent, setDisplayComponent] = useState('home');
  return (
    <>
      <StatusBar barStyle="dark-content" />
      {displayComponent === 'home' &&
        <View>
          <Button
            onPress={() => setDisplayComponent('explanation')}
            title='New to chord progressions?'
          />
          <Button
            onPress={() => setDisplayComponent('test')}
            title='Take the test'
          />
        </View>
      }
      {displayComponent === 'explanation' &&
        <View>
          <Button
            onPress={() => setDisplayComponent('home')}
            title='Back icon goes here'
          />
          <Text>Functional Explanation Component Goes Here</Text>
        </View>
      }
      {displayComponent === 'test' &&
        <View>
          <Button
            onPress={() => setDisplayComponent('home')}
            title='Back icon goes here'
          />
          <Test/>
        </View>
      }
    </>
  );
};

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chords: [], //list of chosen chords (objects from soundbank var)
      transpositions: false,
      inversions: false,
      chordClass: 'triad', //triad or seventh, see soundbank chord object props and relevant logic in getChords
      allowedList: [1,4,5], //keeps track of which chords are allowed, accomodating for mode change, used in handleTypeChange to recalculate allowed chords
      stop: false, //when this is true, stops any playback on next chord, set to true when chords are cleared out or stop button pressed, set to false when play
      loop: false,
      minor: false, //true only with tonal minor, not minor modes, indicates use of altered 5 and 7 chords
      modal: 0, //integer with which to rename chords (in Dorian, two becomes the one, etc.)
      modalTitle: 0, //unique integer associated with mode. Contrivance because aeolian and minor share same modal value for processing, but need to be kept distinct to render proper chords
      amount: 4, //amount of chords to be heard by user, selected with dropdown
      init: true, //if chords have not been gotten yet, useful to ensure "hear chord" button both generates chords on first click and replays them on second click
      displayPossible: false, //toggles display of all possible chords with current settings
      displaySettings: false, //toggles display of settings/quiz
    };
    this.renderMusic = this.renderMusic.bind(this);
    this.getChords = this.getChords.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleTranspositions = this.handleTranspositions.bind(this);
    this.handleInversions = this.handleInversions.bind(this);
    this.toggleChordClass = this.toggleChordClass.bind(this);
    this.handleLoop = this.handleLoop.bind(this);
    this.handleChordAllowedChange = this.handleChordAllowedChange.bind(this);
    this.playSound = this.playSound.bind(this);
    this.handleGetNewChords = this.handleGetNewChords.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleDisplayPossible = this.handleDisplayPossible.bind(this);
    this.playMusic = this.playMusic.bind(this);
    this.toggleDisplay = this.toggleDisplay.bind(this);
    //variables with "global" access (within component)
    this.timeout = 0; //id to hold timeout on playMusic calls, to be cleared on this.state.stop (note: just initialized with an integer, used as a timeout object)
    //three functions below
    //this.listener = new THREE.AudioListener();
    //this.audioLoader = new THREE.AudioLoader();
    this.playbackObject = new Audio.Sound(); //used to temporarily hold each chord to be played (need access within playMusic and componentDidUpdate)
    this.chordsToBePlayed = []; //used to temporarily hold a list of pre-loaded sound objects to avoid delay on playback. to be cleared out when this.state.chords is
    this.detuneValue = 0; //used to detune audio to enable transpositions
    this.count = 0; //count will be used to keep track of how many chords have played, function playMusic clears intervalID when count === this.state.amount
    this.chordsAllowed = [soundbank[0], soundbank[3], soundbank[4]]; //used to generate random chord progressions, to be initialized with 1,4,5 in major soundbank[3], soundbank[4]
  };

  componentDidUpdate() {
    //this is commented out as an experiment to get rid of laggy playback bug. this.renderMusic is called as a callback to setState at the end of this.getChords()
    //if (this.state.chords.length === Number(this.state.amount) && this.state.play) { //if there are the correct amount of generated chords and play is set to true
      //this.renderMusic();
    //};
    if (this.state.stop) {
      //when stopped, continue playback from first chord
      this.count = 0;
      try {
        this.playbackObject.stopAsync();
      }
      catch(err) {

      };

      if (this.timeout) {
        clearTimeout(this.timeout); //stops the playMusic cycle
      };

      this.setState({
        stop: false
      });
    };
  };

  componentDidMount() {
    //note: the below was just copied over from web app, probably not something you want to do in the mobile app
    //on initial component load, get chords and play sound, render buttons for first "question"
    //this.playSound();
  };

  toggleDisplay() {
    if (this.state.displaySettings) {
      //when going to quiz view (away from settings), play sound
      this.playSound();
    };
    this.setState({
      displaySettings: !this.state.displaySettings
    });
  };

  async loadAndPlaySound(chordObj) {
    try {
      await this.playbackObject.unloadAsync();
    } catch(error) {
      console.log("couldn't unload sound because: " + error);
    };
    try {
      await this.playbackObject.loadAsync(chordObj.src, {}, downloadFirst = true);
    } catch(error) {
      console.log('could not play sound because: ' + error);
    }
    if (this.state.transpositions) {
      console.log('this.detuneValue: ' + this.detuneValue);
      await this.playbackObject.setRateAsync(this.detuneValue, shouldCorrectPitch = false);
    };
    try {
      await this.playbackObject.playAsync();
    } catch (error) {
      console.log("sound didn't play because");
      console.log(error);
    };
  };

  //HANDLERS FOR SETTING CHANGES

  //handles major/minor/modal settings changes
  handleTypeChange(selectedMode) {
    //selected mode is a list ["ModeName", numeric value]
    var tempAllowedList = this.state.allowedList; //ensure global access within function
    var modal;
    if (selectedMode === 2.1) {
      this.setState({
        modal: 2,
        modalTitle: 2.1,
        minor: true,
        chords: [],
        init: true,
        stop: true
      });
      modal = 2;
    } else {
      this.setState({
        modal: selectedMode,
        modalTitle: selectedMode,
        minor: false,
        chords: [],
        init: true,
        stop: true
      });
      modal = Number(selectedMode);
    };
    this.chordsAllowed = []; //remove all previous chords and make new allowed list with respect to new mode

    for (var i = 0; i < tempAllowedList.length; i++) {
      var tempChord = {};
      Object.assign(tempChord, soundbank.find(function(obj) { //deep copy of object is necessary so you aren't altering the original soundbank
        var tempName = (tempAllowedList[i] + 7 - modal) % 7; //converts the number chord with respect to new tonic to the "originally named" chord as held in soundbank
        if (tempName === 0) {
          tempName = 7;
        };
        return obj.name === tempName;
      }));
      tempChord.name = tempAllowedList[i];
      this.chordsAllowed.push(tempChord);
    };
  };

  //amount of chords change
  handleAmountChange(amountOfChords) {
    this.setState({
      amount: amountOfChords,
      init: true,
      chords: [], //clearing out chords, note that this is important for the path of processing with playSound
      stop: true
    });
  };

  //transposition settings change
  handleTranspositions() {
    this.setState({
      transpositions: !this.state.transpositions
    });
  };

  //allow/disallow inversion
  handleInversions() {
    if (!this.state.inversions && (this.state.chords.length > 0)) { //if inversions have just been allowed and we already have chords
      var chordList = this.state.chords; //to avoid mutating state directly
      for (var i = 1; i < chordList.length; i++) { //redo chord list to accomodate inversions. Allows the user to hear same chord progression with different settings!
        if (Math.abs(chordList[i][this.state.chordClass].root.value - chordList[i-1].value) <= Math.abs(chordList[i][this.state.chordClass].inverted.value - chordList[i - 1].value)) {
          if (this.state.minor && (chordList[i].name === 7 || chordList[i].name === 5)) {
            chordList[i].src = chordList[i][this.state.chordClass].root.srcMinor;
            chordList[i].value = chordList[i][this.state.chordClass].root.value;
          } else {
            chordList[i].src = chordList[i][this.state.chordClass].root.src;
            chordList[i].value = chordList[i][this.state.chordClass].root.value;
          };
        } else {
          if (this.state.minor && (chordList[i].name === 7 || chordList[i].name === 5)) {
            chordList[i].src = chordList[i][this.state.chordClass].inverted.srcMinor;
            chordList[i].value = chordList[i][this.state.chordClass].inverted.value;
          } else {
            chordList[i].src = chordList[i][this.state.chordClass].inverted.src;
            chordList[i].value = chordList[i][this.state.chordClass].inverted.value;
          };
        };
      };
      this.setState({
        chords: chordList
      });
    } else if (this.state.inversions && (this.state.chords.length > 0)) { //if inversions have just been prohibited and we already have chords
      var chordList = this.state.chords;
      for (var i = 1; i < chordList.length; i++) { //chord list is remade with root position instead
        if (this.state.minor && (chordList[i].name === 7 || chordList[i].name === 5)) {
          chordList[i].src = chordList[i][this.state.chordClass].root.srcMinor;
          chordList[i].value = chordList[i][this.state.chordClass].root.value; //currently don't need to track value in the case of making all chords root position, but doing it just in case
        } else {
          chordList[i].src = chordList[i][this.state.chordClass].root.src;
          chordList[i].value = chordList[i][this.state.chordClass].root.value;
        };
      };
      this.setState({
        chords: chordList
      });
    };

    this.setState({
      inversions: !this.state.inversions,
    });
  };

  //allow/disallow seventh chords
  toggleChordClass(e) {
    if (this.state.chordClass === 'triad') {
      this.setState({
        chordClass: 'seventh',
        chords: [],
        init: true,
        stop: true
      });
    } else {
      this.setState({
        chordClass: 'triad',
        chords: [], //clear out chords, automatically create new set
        init: true,
        stop: true
      });
    };
  };

  //allow/disallow loop
  handleLoop() {
    this.setState({
      loop: !this.state.loop
    });
  };

  //allow/disallow inViewidual chords
  handleChordAllowedChange(chordNumber, alreadyAllowed) {
    this.setState({ //clear out chords because we need a new set, set init to true for processing purposes elsewhere
      chords: [],
      init: true,
      stop: true
    });
    var modal = this.state.modal;
    var tempChord = soundbank.find(function(obj) {
      var tempName = (obj.name + modal) % 7; //when users are using modes/minor, they will be selecting chord names with respect to a different one than how the names are saved in original soundbank
      if (tempName === 0) { //this code makes that adjustment (duplicated later in the getChords function)
        tempName = 7;
      };
      return tempName === Number(chordNumber);
    });

    var tempAllowedList = this.state.allowedList;

    if (!alreadyAllowed) { //if chord needs to be allowed, add it to the list of allowed chords
      tempAllowedList.push(Number(chordNumber));
      this.setState({
        allowedList: tempAllowedList
      });
      //var modal = this.state.modal;
      var tempChord = {};
      Object.assign(tempChord, soundbank.find(function(obj) { //deep copy, necessary to avoid mutating soundbank
        var tempName = (obj.name + modal) % 7; //when users are using modes/minor, they will be selecting chord names with respect to a different one than how the names are saved
        if (tempName === 0) {
          tempName = 7;
        };
        return tempName === Number(chordNumber);
      }));
      tempChord.name = Number(chordNumber); //chords in chordsAllowed are renamed with respect to mode - important for rendering correct name in QuizUI section
      this.chordsAllowed.push(tempChord);
    } else { //else if chord has been forbidden, remove chord from allowed chords
      var tempIndex = tempAllowedList.indexOf(Number(chordNumber));
      tempAllowedList.splice(tempIndex, 1);

      this.setState({
        allowedList: tempAllowedList
      });

      var tempChord = this.chordsAllowed.find(function(obj) {
        return obj.name === Number(chordNumber);
      });
      var index = this.chordsAllowed.indexOf(tempChord);
      //avoiding errors if the disallowed chord was not in allowed list (should never happen, but handling the supposedly impossible case to avoid crashing can't hurt)
      if (index !== -1) {
        this.chordsAllowed.splice(index, 1);
      };
    };
  };

  //display/hide all possible chords in the given key/mode (note that these are formatted for chord qaulity)
  handleDisplayPossible() {
    this.setState({
      displayPossible: !this.state.displayPossible
    });
  };

  //SOUND BUTTONS

  playSound() {
    this.setState({
      stop: false
    });
    if (this.state.chords.length > 0) {
      this.renderMusic();
    } else {
      this.getChords();
    };
  };

  handleGetNewChords() {
    this.setState({
      init: true,
      chords: [],
      stop: true
    }, () => this.playSound());
  };

  handleStop() {
    this.setState({
      stop: true
    });
  };

  getChords() {
    //clear out this.chordsToBePlayed
    //this.chordsToBePlayed = [];
    var tempChordHolder = [{}]; //this.state.chords will become tempChordHolder at the end of the function, just a list to hold onto chords as they are randomly chosen
    Object.assign(tempChordHolder[0], soundbank[(7 - this.state.modal) % 7]); //makes a deep copy to avoid mutating original soundbank
    tempChordHolder[0].name = 1; //initialize first chord with root position and value with name 1
    tempChordHolder[0].src = tempChordHolder[0][this.state.chordClass].root.src;
    tempChordHolder[0].value = tempChordHolder[0][this.state.chordClass].root.value;
    tempChordHolder[0].quality = tempChordHolder[0][this.state.chordClass].quality;
    //add sound object of first chord in sequence to this.chordsToBePlayed. Each subsequent chord will add its relevant sound object to list when chosen
    //this.chordsToBePlayed.push(new Sound(tempChordHolder[0].src, Sound.MAIN_BUNDLE));

    for (var i = 0; i < this.state.amount - 1; i++) {
      var rand = {};
      Object.assign(rand, this.chordsAllowed[Math.floor(Math.random() * this.chordsAllowed.length)]); //choose random chord from allowedChords, generated from handleChordAllowedChange
      if (this.state.inversions) { //following code finds out which inversion of rand chord is closest to the previous chord in list
        if (Math.abs(rand[this.state.chordClass].root.value - tempChordHolder[tempChordHolder.length - 1].value) <= Math.abs(rand[this.state.chordClass].inverted.value - tempChordHolder[tempChordHolder.length - 1].value)) {
          rand.value = rand[this.state.chordClass].root.value;
          if (this.state.minor && (rand.name === 7 || rand.name === 5)) {
            rand.quality = rand[this.state.chordClass].qualityMinor;
            rand.src = rand[this.state.chordClass].root.srcMinor;
          } else {
            rand.src = rand[this.state.chordClass].root.src;
            rand.quality = rand[this.state.chordClass].quality;
          };
        } else {
          rand.value = rand[this.state.chordClass].inverted.value;
          if (this.state.minor && (rand.name === 7 || rand.name === 5)) {
            rand.quality = rand[this.state.chordClass].qualityMinor;
            rand.src = rand[this.state.chordClass].inverted.srcMinor;
          } else {
            rand.src = rand[this.state.chordClass].inverted.src;
            rand.quality = rand[this.state.chordClass].quality;
          };
        };
      } else {
        rand.value = rand[this.state.chordClass].root.value;
        if (this.state.minor && (rand.name === 7 || rand.name === 5)) {
          rand.quality = rand[this.state.chordClass].qualityMinor;
          rand.src = rand[this.state.chordClass].root.srcMinor;
        } else {
          rand.quality = rand[this.state.chordClass].quality;
          rand.src = rand[this.state.chordClass].root.src;
        };
      };
      tempChordHolder.push(rand);
      //add sound object of chosen chord to list of chordsToBePlayed
      //this.chordsToBePlayed.push(new Sound(rand.src, Sound.MAIN_BUNDLE));
    };

    this.setState({
      chords: tempChordHolder
      }, () => this.renderMusic()
    );
  };

  //handles some state setting dependent on various conditions and then calls this.playMusic, which generates the sound of chosen chords directly
  renderMusic() {
    if (this.state.init) {
      //note: this needs to be written to accomodate the speed setting of react-native-sound library. Speed is set as an integer percentage (.9 = 90%)
      if (this.state.transpositions) {
        //1.0595 is the percent by which a frequency needs to be shifted to change by a half-step
        this.detuneValue = (((Math.floor(Math.random() * 6)) - 3) * .05333) + 1; //ranges from -3 to +2 half steps, or 1 - 3*.05333 to 1 + 2*1.05333
        //this.detuneValue = 0.84;
      };
      this.setState({
        init: false
      });
    };
    this.playMusic(this.state.amount);
  };

  //this function is responsible for initiating sound
  playMusic(totalChordsPlayed) {
    //console.log('this.state.chords:');
    //console.log(this.state.chords);
    //if (this.listener.context.state === 'suspended') {
      //this.listener.context.resume();
    //};

    if (this.count === Number(totalChordsPlayed)) {
      this.count = 0;
      if (this.state.loop) {
        this.playMusic(this.state.amount);
      };
    } else if (this.count >= 0 && !this.state.stop) {
      //this.chordsToBePlayed[this.count].play()
      this.loadAndPlaySound(this.state.chords[this.count]);
      this.count++;
      if (this.state.transpositions) { //only stagger playback if transpositions are enabled
        this.timeout = setTimeout(this.playMusic, 1710 * this.detuneValue, this.state.amount); //note: timeout value has to be adjusted according to detune value because detune alters playback speed of chords
      } else {
        this.timeout = setTimeout(this.playMusic, 1710, this.state.amount);
      };

    } else {
      alert('playMusic was called with this.state.stop as true');
      //alert('Whoops, something went terribly wrong on our end. Try it again, once more, with feeling.');
      //console.log('A variable named this.count is less than 0. Something terrible has occured. Please refresh the page and pretend this never happened.');
    };
  };

  render() {
    return (
      <ScrollView>
        {this.state.displaySettings && <View id='settings-wrapper'>
        <Button
          onPress={() => this.toggleDisplay()}
          title="Back to the test"
        />
        <Picker
          className='settings-dropdown'
          id='type-selection'
          onValueChange={(itemValue, itemIndex) => this.handleTypeChange(itemValue)}
          selectedValue={this.state.modalTitle}
        >
          <Picker.Item label="Major" value={0} />
          <Picker.Item label="Minor" value={2.1} />
          <Picker.Item label="Dorian" value={6} />
          <Picker.Item label="Phrygian" value={5} />
          <Picker.Item label="Lydian" value={4} />
          <Picker.Item label="Mixolydian" value={3} />
          <Picker.Item label="Aeolian" value={2} />
          <Picker.Item label="Locrian" value={1} />
        </Picker>
        <Picker
          className='settings-dropdown'
          id='amount-selection'
          onValueChange={(itemValue, itemIndex) => this.handleAmountChange(itemValue)}
          selectedValue={this.state.amount}
        >
          <Picker.Item label="2" value={2} />
          <Picker.Item label="3" value={3} />
          <Picker.Item label="4" value={4} />
          <Picker.Item label="5" value={5} />
          <Picker.Item label="6" value={6} />
          <Picker.Item label="7" value={7} />
          <Picker.Item label="8" value={8} />
        </Picker>
        <View className='checkbox'>
          <Text classnName='settings-text'>Allow Transpositions</Text>
          <CheckBox
            id="allow-transpositions"
            onPress={() => this.handleTranspositions()}
            checked={this.state.transpositions}
          />
        </View>
        <View className='checkbox'>
          <Text classnName='settings-text'>Allow Inversions</Text>
          <CheckBox
            id="allow-inversions"
            onPress={() => this.handleInversions()}
            checked={this.state.inversions}
          />
        </View>
        <View className='checkbox'>
          <Text classnName='settings-text'>Allow 7th Chords</Text>
          <CheckBox
            id="use-seventh-chords"
            onPress={() => this.toggleChordClass()}
            checked={this.state.chordClass === 'seventh'}
          />
        </View>
        <View className='checkbox'>
          <Text classnName='settings-text'>Loop Playback</Text>
          <CheckBox
            id="loop"
            onPress={() => this.handleLoop()}
            checked={this.state.loop}
          />
        </View>
        <View className='checkbox'>
          <Text classnName='settings-text'>Display All Possible Chords</Text>
          <CheckBox
            id="display-possible"
            onPress={() => this.handleDisplayPossible()}
            checked={this.state.displayPossible}
          />
        </View>
        <View id='allowed-wrapper'>
          <Text id='allowed-header' className='settings-label'>Allowed Chords:</Text>
          <View id='allowed-selections'>
            <View className='allowed-checkbox-wrapper' id='View-allowed-selection-1'>
              <View id='allowed-selection-1' className='allowed-label'>
                <CheckBox
                  className='allowed-checkbox'
                  type='checkbox'
                  disabled
                  checked
                />
                <Text className='allowed-Text'>1</Text>
              </View>
            </View>
            <View className='allowed-checkbox-wrapper' id='View-allowed-selection-2'>
              <View id='allowed-selection-2' className='allowed-label'>
                <CheckBox
                  className='allowed-checkbox'
                  type='checkbox'
                  onPress={() => this.handleChordAllowedChange(2, this.state.allowedList.includes(2))}
                  id='allowed-selection-2'
                  checked={this.state.allowedList.includes(2)}
                />
                <Text className='allowed-Text'>2</Text>
              </View>
            </View>
            <View className='allowed-checkbox-wrapper' id='View-allowed-selection-3'>
              <View id='allowed-selection-3' className='allowed-label'>
                <CheckBox
                  className='allowed-checkbox'
                  type='checkbox'
                  onPress={() => this.handleChordAllowedChange(3, this.state.allowedList.includes(3))}
                  id='allowed-selection-3'
                  checked={this.state.allowedList.includes(3)}
                />
                <Text className='allowed-Text'>3</Text>
              </View>
            </View>
            <View className='allowed-checkbox-wrapper' id='View-allowed-selection-4'>
              <View id='allowed-selection-4' className='allowed-label'>
                <CheckBox
                  className='allowed-checkbox'
                  type='checkbox'
                  onPress={() => this.handleChordAllowedChange(4, this.state.allowedList.includes(4))}
                  id='allowed-selection-4'
                  checked={this.state.allowedList.includes(4)}
                />
                <Text className='allowed-Text'>4</Text>
              </View>
            </View>
            <View className='allowed-checkbox-wrapper' id='View-allowed-selection-5'>
              <View id='allowed-selection-5' className='allowed-label'>
                <CheckBox
                  className='allowed-checkbox'
                  type='checkbox'
                  onPress={() => this.handleChordAllowedChange(5, this.state.allowedList.includes(5))}
                  id='allowed-selection-5'
                  checked={this.state.allowedList.includes(5)}
                />
                <Text className='allowed-Text'>5</Text>
              </View>
            </View>
            <View className='allowed-checkbox-wrapper' id='View-allowed-selection-6'>
              <View id='allowed-selection-6' className='allowed-label'>
                <CheckBox
                  className='allowed-checkbox'
                  type='checkbox'
                  onPress={() => this.handleChordAllowedChange(6, this.state.allowedList.includes(6))}
                  id='allowed-selection-6'
                  checked={this.state.allowedList.includes(6)}
                />
                <Text className='allowed-Text'>6</Text>
              </View>
            </View>
            <View className='allowed-checkbox-wrapper' id='View-allowed-selection-7'>
              <View id='allowed-selection-7' className='allowed-label'>
                <CheckBox
                  className='allowed-checkbox'
                  type='checkbox'
                  onPress={() => this.handleChordAllowedChange(7, this.state.allowedList.includes(7))}
                  id='allowed-selection-7'
                  checked={this.state.allowedList.includes(7)}
                />
                <Text className='allowed-Text'>7</Text>
              </View>
            </View>
          </View>
        </View>
        </View>}
        {!this.state.displaySettings && <View id='quiz-wrapper'>
          <Button
            onPress={() => this.toggleDisplay()}
            title='Configure Test'
          />
          <Button
            onPress={() => {
              this.playSound();
            }}
            title="Play"
          />
          <Button
            onPress={() => {
              this.handleStop();
            }}
            title="Stop"
          />
          <Button
            onPress={() => {
              this.handleGetNewChords();
            }}
            title="Get New Chords"
          />
          <View id='QuizUI'>
            <QuizUI
              chords = {this.state.chords}
              chordsAllowed = {this.chordsAllowed}
              amount = {this.state.amount}
              minor = {this.state.minor}
              chordClass = {this.state.chordClass}
              displayPossible = {this.state.displayPossible}
              init = {this.state.init}
            />
          </View>
        </View>}
      </ScrollView>
    );
  };
};

//<FontAwesomeIcon icon={faCheck} className='chord-icon check' style={{opacity: 0}}/>
function CorrectButton(props) {
  if (Number(props.value) === 0) {
    return (
      <View style={styles.chordButtonContainer}>
        <TouchableOpacity
          id='given-one-chord'
          style={styles.chordCorrect}
          value={props.value}
          key={props.value}
          onPress={() => props.makeClicked(props.value)}
          disabled
        >
          <Text>{props.chordName}</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    if (props.clicked) {
      return (
        <View style={styles.chordButtonContainer} onPress={() => props.makeClicked(props.value)}>
          <TouchableOpacity
            style={styles.chordCorrect}
            color='green'
            value={props.value}
            key={props.value}
          >
            <Text>{props.chordName}</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.chordButtonContainer}>
          <TouchableOpacity
            style={styles.chordUnanswered}
            value={props.value}
            key={props.value}
            onPress={() => props.makeClicked(props.value)}
          >
            <Text>{props.chordName}</Text>
          </TouchableOpacity>
        </View>
      );
    };
  };
};

//will generate a clickable Button with chord name displayed, will become red and show an x when clicked
//<FontAwesomeIcon icon={faTimes} className='chord-icon x' style={{opacity: 0}}/>
function IncorrectButton(props) {
  if (props.clicked) {
    return (
      <View style={styles.chordButtonContainer}>
        <TouchableOpacity
          style={styles.chordIncorrect}
          color='red'
          value={props.value}
          key={props.value}
        >
          <Text>{props.chordName}</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
      return (
        <View style={styles.chordButtonContainer}>
          <TouchableOpacity
            style={styles.chordUnanswered}
            value={props.value}
            key={props.value}
            onPress={() => props.makeClicked(props.value)}
          >
            <Text>{props.chordName}</Text>
          </TouchableOpacity>
        </View>
      );
  };
};

class QuizUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: {} //object with boolean for each button element's clicked state (key is trivial integer value unique to button), passed to button components as prop
    };
    this.makeClicked = this.makeClicked.bind(this);
    this.getButtons = this.getButtons.bind(this);
    this.cleanChordNameData = this.cleanChordNameData.bind(this);
    //variables
    this.newAllowedList = this.props.chordsAllowed; //do not want to alter original list to keep stuff from getting more complicated and co-dependent

    this.possibleChordNames = []; //names of possible chords, used to generate false answers

    this.actualChordNames = []; //names of sounded, correct chords

    this.buttonArray = []; //stores all buttons as object where each row of buttons is a sublist, object rendered as html with map in render() below

    this.clicked = {}; //will be an object that indicates whether each button has been clicked or not, temp hold in processing, passed to state on completion
  };

  componentDidUpdate() {

    if (this.props.init) { //if init from parent component, clear out buttons and styles
      this.clicked = {};
      this.buttonArray = [];
      this.cleanChordNameData();
    };

    if (this.props.chords.length > 0 && this.buttonArray.length < 1) { //if we have chords, but not buttons
      this.cleanChordNameData();
      this.getButtons();
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
      console.log('generating new incorrect button names...');
      console.log(intToChordName(a));
      return intToChordName(a);
    });

    this.actualChordNames = this.props.chords.map(function(a) {
      console.log('generating new correct button names...');
      console.log(intToChordName(a));
      return intToChordName(a);
    });
  };

  getButtons() {
    this.clicked = {};
    if (this.props.chords.length > 0 && Object.keys(this.buttonArray).length < 1) { //only generate buttons if we have chords and not buttons (likely redundant, but trying to be safe)
      var actualChordNames = this.actualChordNames; //loses access to this inside callbacks
      for (var i = 0; i <this.actualChordNames.length; i++) {
        var tempButtonList = []; //will hold a list of objects where each object is a button with an integer value representing position and two props, chordName, and a boolean indicating whether or not answer is correct, and value, used for element key and for style reference

        this.clicked[i] = false;
        console.log('correct chord button name: ' + actualChordNames[i]);
        tempButtonList.push({chordName: actualChordNames[i], correct: true, value: (i)}); //generate correct answers, value should always be single digit

        var answerlessAllowed = this.possibleChordNames.filter(function(a) { //create list without correct answer from all possible chords to generate wrong answers from
          return a !== actualChordNames[i];
        });
        var incorrectAmount;
        var random;

        if (this.possibleChordNames.length > 4) { //if 2 allowed chords, 1 wrong answer, if 3, then 2, if 4+, then 3
          incorrectAmount = 3;
        } else {
          incorrectAmount = this.possibleChordNames.length - 1;
        };

        if (i > 0) {
          for (var j = 0; j < incorrectAmount; j++) { //generate incorrect answers, only after first row (which will be single button displaying one chord)
            this.clicked[10 * i + j] = false;
            random = Math.floor(Math.random() * answerlessAllowed.length); //index of random chord
            console.log('incorrect button chordname: ' + answerlessAllowed[random]);
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
      <ScrollView id='QuizUI-wrapper'>
        <View id='possible-chords-wrapper'>
        {this.props.displayPossible &&
          <Text id='possible-chords-header'>Possible chords:</Text>
        }
        <View id='possible-chord-names'>
        {this.props.displayPossible &&
          this.possibleChordNames.map(function(a, index) {
          return <Text className='possible-chords' key={index}>{a}</Text>
          })}
        </View>
      </View>
      <View id='quiz-buttons'>
          {
            this.buttonArray.map(row =>
              <View style={styles.buttonRow}>
                {row.map(chord => chord.correct ?
                  <CorrectButton key={chord.value} value={chord.value} clicked={this.clicked[chord.value]} makeClicked={this.makeClicked} chordName={chord.chordName} /> :
                  <IncorrectButton key={chord.value} value={chord.value} clicked={this.clicked[chord.value]} makeClicked={this.makeClicked} chordName={chord.chordName}/>
                )}
              </View>
            )
          }
      </View>
    </ScrollView>
    );
  };
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  buttonRow: {
    flexDirection: 'row',
  },
  chordButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  chordUnanswered: {
    backgroundColor: 'skyblue',
    height: 40,
  },
  chordCorrect: {
    backgroundColor: 'green',
    textAlign: 'center',
    height: 40,
  },
  chordIncorrect: {
    backgroundColor: 'red',
    textAlign: 'center',
    height: 40,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
