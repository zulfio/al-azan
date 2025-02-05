import {AudioEntry} from '@/modules/media_player';
import {destroy, play, stop} from '@/services/play_sound';
import {settings} from '@/store/settings';

/** returns `true` if interrupted during play, `false` otherwise */
export async function playAudio(audio: AudioEntry) {
  const settingsState = settings.getState();

  if (settingsState.IS_PLAYING_AUDIO) {
    await stop();
  }
  settings.setState({IS_PLAYING_AUDIO: true});
  const result = await play(audio);
  settings.setState({IS_PLAYING_AUDIO: false});

  await destroy();
  return result;
}

export async function stopAdhan() {
  await stop();
  settings.setState({IS_PLAYING_AUDIO: false});
  await destroy();
}
