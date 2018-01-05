
import { Howl } from 'howler';

export default class BasicAudioFile {
  /**
   * @param src String
   */
  constructor(src) {
    this.src = src;
    this.howl = null;
  }

  async init() {
    this.howl = new Howl({ src: [this.src] });
    return new Promise((resolve) => {
      this.howl.once('load', () => resolve());
    });
  }

  play(timestamp) {
    if(!this.howl) {
      return;
    }

    this.howl.stop();

    if (timestamp) {
      this.howl.seek(timestamp);
    }

    this.howl.play();
  }

  stop() {
    this.howl.stop();
  }

  getDuration() {
    return this.howl.duration();
  }
}
