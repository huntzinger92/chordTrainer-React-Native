import {StyleSheet} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  allowedWrapper: {
    marginTop: 20,
    marginLeft: 50,
    fontSize: 20,
  },
  allowedHeader: {
    fontSize: 26,
    marginBottom: 10,
    marginLeft: 0,
  },
  allowedButtons: {
    marginLeft: 0,
  },
  chordAllowed: {
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 25,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chordAllowedText: {
    color: 'white',
    fontSize: 24,
  },
  chordUnallowed: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 25,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chordUnallowedText: {
    color: 'black',
    fontSize: 24,
  },
  disabledOneChord: {
    backgroundColor: '#707070',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 25,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledOneChordText: {
    color: '#e8e8e8',
    fontSize: 24,
  },
  appWrapper: {
    backgroundColor: '#ebebff',
    minHeight: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
    marginLeft: 4,
    marginRight: 7,
    marginBottom: 10,
  },
  settingsSlider: {
    marginLeft: 50,
    paddingTop: 7,
    paddingBottom: 7,
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    fontSize: 20,
    marginLeft: 8,
  },
  chordCheckbox: {
    fontSize: 40,
  },
  chordCheckboxText: {
    marginLeft: 15,
    fontSize: 20,
  },
  chordButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 40,
    marginRight: 5,
  },
  chordUnanswered: {
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    minWidth: '100%',
    borderRadius: 5,
  },
  chordCorrect: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: '100%',
    borderRadius: 5,
  },
  chordIncorrect: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    minWidth: '100%',
    borderRadius: 5,
  },
  chordButtonLabel: {
    textAlign: 'center',
    fontSize: 18,
  },
  chordRow1: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  chordRow2: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  chordRow3: {
    flexDirection: 'row',
    marginLeft: 70,
    marginBottom: 5,
  },
  dropdown: {
    fontSize: 20,
  },
  dropdownHeader: {
    fontSize: 24,
  },
  explanationWrapper: {
    marginLeft: 7,
    marginRight: 7,
  },
  explanationHeader: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 5,
  },
  explanationIntroText: {
    fontSize: 17,
    marginBottom: 8,
    marginLeft: 12,
    marginRight: 12,
  },
  explanationText: {
    fontSize: 16,
    marginBottom: 8,
    marginLeft: 12,
    marginRight: 12,
  },
  exampleGrid: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 8,
    marginBottom: 12,
    borderWidth: 1,
    paddingTop: 6,
    paddingLeft: 1,
    paddingRight: 1,
  },
  exampleGridText: {
    fontSize: 13,
    marginBottom: 6,
  },
  exampleRowGrid: {
    flexDirection: 'row',
  },
  exampleRowTitle: {
    flex: 3,
    alignItems: 'center',
  },
  exampleRowTitleText: {
    marginLeft: 'auto',
  },
  exampleViewGrid: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  homeWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  firstSettingsSlider: {
    borderTopWidth: 1,
  },
  navigationButtons: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#56f07b',
    marginBottom: 18,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 330,
    height: 60,
    borderWidth: 1,
    borderRadius: 5,
  },
  navigationText: {
    textAlign: 'center',
    fontSize: 24,
  },
  pickerWrapper: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    width: 125,
    height: 50,
  },
  possibleChordsWrapper: {
    marginTop: 0,
    marginLeft: 'auto',
    marginBottom: 7,
    marginRight: 'auto',
    paddingTop: 3,
    paddingBottom: 5,
    width: 360,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  possibleChordsHeader: {
    fontSize: 18,
    textAlign: 'center',
  },
  possibleChordsNameWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
  },
  possibleChordsName: {
    textAlign: 'center',
    marginLeft: 8,
    fontSize: 18,
  },
  quizUIWrapper: {
    marginTop: 0,
  },
  rowBullet: {
    alignSelf: 'center',
    marginRight: 3,
    fontSize: 9,
    color: '#3d3d3d'
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
  settingsText: {
    fontSize: 20,
  },
  settingsDropdown: {
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 10,
  },
  settingsWrapper: {
    marginBottom: 15,
  },
  soundButton: {
    backgroundColor: 'white',
    color: 'black',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    margin: 4,
    elevation: 5,
  },
  soundButtonText: {
    textAlign: 'center',
  },
  soundButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 15,
  },
  titleWrapper: {
    marginTop: 40,
    marginBottom: 120,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    borderWidth: 1,
    padding: 8,
    backgroundColor: '#fff7fe',
  },
  titleHeader: {
    fontSize: 32,
    textAlign: 'center',
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
