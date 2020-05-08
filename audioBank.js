import { Audio } from 'expo-av';
//export audioBank;

//var audioBank = {};

//this function pre-loads every chord explicitly and then exports audioBank as a constant
//this was done as a workaround to the fact that you cannot require paths (and thus load sounds) dynamically (i.e., "require(pathName)")
export async function loadAudio() {
  alert('audioBank being generated');
  var audioBank = {};

  var playbackObject = new Audio.Sound();
  await playbackObject.loadAsync(require('./assets/chords/cmaj_root.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/cmaj_root.mp3'] = playbackObject;
  await playbackObject.unloadAsync();

  await playbackObject.loadAsync(require('./assets/chords/cmaj_inv.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/cmaj_inv.mp3'] = playbackObject;
  await playbackObject.unloadAsync();

  await playbackObject.loadAsync(require('./assets/chords/cmaj7_root.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/cmaj7_root.mp3'] = playbackObject;
  await playbackObject.unloadAsync();

  await playbackObject.loadAsync(require('./assets/chords/cmaj7_inv.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/cmaj7_inv.mp3'] = playbackObject;
  await playbackObject.unloadAsync();

  await playbackObject.loadAsync(require('./assets/chords/dmin_root.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/dmin_root.mp3'] = playbackObject;
  await playbackObject.unloadAsync();

  await playbackObject.loadAsync(require('./assets/chords/dmin_inv.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/dmin_inv.mp3'] = playbackObject;
  await playbackObject.unloadAsync();

  await playbackObject.loadAsync(require('./assets/chords/dm7_root.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/dm7_root.mp3'] = playbackObject;
  await playbackObject.unloadAsync();

  await playbackObject.loadAsync(require('./assets/chords/dm7_inv.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/dm7_inv.mp3'] = playbackObject;
  await playbackObject.unloadAsync();

  await playbackObject.loadAsync(require('./assets/chords/emin_root.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/emin_root.mp3'] = playbackObject;
  await playbackObject.unloadAsync();

  await playbackObject.loadAsync(require('./assets/chords/emin_inv.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/emin_inv.mp3'] = playbackObject;
  await playbackObject.unloadAsync();

  await playbackObject.loadAsync(require('./assets/chords/em7_root.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/em7_root.mp3'] = playbackObject;
  await playbackObject.unloadAsync();

  await playbackObject.loadAsync(require('./assets/chords/em7_inv.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/em7_inv.mp3'] = playbackObject;
  await playbackObject.unloadAsync();

  await playbackObject.loadAsync(require('./assets/chords/emaj_root.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/emaj_root.mp3'] = playbackObject;
  await playbackObject.unloadAsync();

  await playbackObject.loadAsync(require('./assets/chords/emaj_inv.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/emaj_inv.mp3'] = playbackObject;
  await playbackObject.unloadAsync();

  await playbackObject.loadAsync(require('./assets/chords/e7_root.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/e7_root.mp3'] = playbackObject;
  await playbackObject.unloadAsync();

  await playbackObject.loadAsync(require('./assets/chords/e7_inv.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/e7_inv.mp3'] = playbackObject;
  await playbackObject.unloadAsync();

  await playbackObject.loadAsync(require('./assets/chords/fmaj_root.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/fmaj_root.mp3'] = playbackObject;
  await playbackObject.unloadAsync();

  await playbackObject.loadAsync(require('./assets/chords/fmaj_inv.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/fmaj_inv.mp3'] = playbackObject;
  await playbackObject.unloadAsync();

  await playbackObject.loadAsync(require('./assets/chords/fmaj7_root.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/fmaj7_root.mp3'] = playbackObject;
  await playbackObject.unloadAsync();

  await playbackObject.loadAsync(require('./assets/chords/fmaj7_inv.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/fmaj7_inv.mp3'] = playbackObject;
  await playbackObject.unloadAsync();

  await playbackObject.loadAsync(require('./assets/chords/gmaj_root.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/gmaj_root.mp3'] = playbackObject;
  await playbackObject.unloadAsync();

  await playbackObject.loadAsync(require('./assets/chords/gmaj_inv.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/gmaj_inv.mp3'] = playbackObject;
  await playbackObject.unloadAsync();

  await playbackObject.loadAsync(require('./assets/chords/g7_root.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/g7_root.mp3'] = playbackObject;
  await playbackObject.unloadAsync();

  await playbackObject.loadAsync(require('./assets/chords/g7_inv.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/g7_inv.mp3'] = playbackObject;
  await playbackObject.unloadAsync();

  await playbackObject.loadAsync(require('./assets/chords/gsharpdim_root.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/gsharpdim_root.mp3'] = playbackObject;
  await playbackObject.unloadAsync();

  await playbackObject.loadAsync(require('./assets/chords/gsharpdim_inv.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/gsharpdim_inv.mp3'] = playbackObject;
  await playbackObject.unloadAsync();

  await playbackObject.loadAsync(require('./assets/chords/gsharpfulldim_root.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/gsharpfulldim_root.mp3'] = playbackObject;
  await playbackObject.unloadAsync();

  await playbackObject.loadAsync(require('./assets/chords/gsharpfulldim_inv.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/gsharpfulldim_inv.mp3'] = playbackObject;
  await playbackObject.unloadAsync();

  await playbackObject.loadAsync(require('./assets/chords/amin_root.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/amin_root.mp3'] = playbackObject;
  await playbackObject.unloadAsync();

  await playbackObject.loadAsync(require('./assets/chords/amin_inv.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/amin_inv.mp3'] = playbackObject;
  await playbackObject.unloadAsync();

  await playbackObject.loadAsync(require('./assets/chords/am7_root.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/am7_root.mp3'] = playbackObject;
  await playbackObject.unloadAsync();

  await playbackObject.loadAsync(require('./assets/chords/am7_inv.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/am7_inv.mp3'] = playbackObject;
  await playbackObject.unloadAsync();

  await playbackObject.loadAsync(require('./assets/chords/bdim_root.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/bdim_root.mp3'] = playbackObject;
  await playbackObject.unloadAsync();

  await playbackObject.loadAsync(require('./assets/chords/bdim_inv.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/bdim_inv.mp3'] = playbackObject;
  await playbackObject.unloadAsync();

  await playbackObject.loadAsync(require('./assets/chords/bhalfdim7_root.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/bhalfdim7_root.mp3'] = playbackObject;
  await playbackObject.unloadAsync();

  await playbackObject.loadAsync(require('./assets/chords/bhalfdim7_inv.mp3'), {shouldPlay: false}, downloadFirst = true);
  audioBank['./assets/chords/bhalfdim7_inv.mp3'] = playbackObject;
  //await playbackObject.unloadAsync();
  return audioBank
};

//loadAudio();
