import {StyleSheet} from 'react-native';

export const practicalStyles = StyleSheet.create({
  allPossibleWrapper: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
    padding: 10,
  },
  possibleChordsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  buttonAreaWrapper: {
    marginTop: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    marginLeft: 4,
    marginRight: 7,
    marginBottom: 12,
  },
  chordNameButton: {
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 7,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 1,
    borderRadius: 5,
  },
  modeDropdownWrapper: {
    width: 200,
    height: 50,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    elevation: 7,
    alignSelf: 'center',
    alignContent: 'center',
    marginLeft: 5,
  },
  modeDropDown: {

  },
  oneChordWrapper: {
    width: 50,
    height: 50,
    marginLeft: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
  },
  oneChordButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  oneChordLabel: {
    marginLeft: 'auto',
    marginRight: 7,
    fontSize: 21,
    alignSelf: 'center',
  },
  settingsAndSoundRow: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  soundButton: {
    backgroundColor: 'white',
    color: 'black',
    borderWidth: 1,
    borderRadius: 5,
    width: 50,
    height: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    margin: 4,
    elevation: 7,
  },
  rowBullet: {
    alignSelf: 'center',
    marginRight: 3,
    fontSize: 9,
    color: '#3d3d3d'
  },
});
