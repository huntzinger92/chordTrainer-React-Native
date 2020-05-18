import {StyleSheet} from 'react-native';

export const practicalStyles = StyleSheet.create({
  buttonAreaWrapper: {
    marginTop: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    marginLeft: 4,
    marginRight: 7,
    marginBottom: 12,
  },
  modeDropdownWrapper: {
    width: 200,
    height: 55,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    elevation: 7,
  },
  modeDropDown: {

  },
  settingsAndSoundRow: {
    flexDirection: 'row',
    marginLeft: 25,
    marginRight: 25,
    marginTop: 20,
  },
  soundButton: {
    backgroundColor: 'white',
    color: 'black',
    borderWidth: 1,
    borderRadius: 5,
    height: 45,
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
