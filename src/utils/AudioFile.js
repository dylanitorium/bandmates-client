export default class BasicAudioFile {
  /**
   * @param src String
   */
  constructor(src) {
    this.src = src
    this.context = null;
    this.source = null;
    this.nodes = {};
  }

  static eventTypes = {
    TIME_UPDATE: 'update',
  };

  async init() {
    return new Promise((resolve, reject) => {
      fetch(this.src)
        .then(response => response.arrayBuffer())
        .then((buffer) => {
          this.context = new (window.AudioContext || window.webkitAudioContext)();
          return this.context.decodeAudioData(buffer);
        })
        .then((buffer) => {
          this.nodes.gain = this.context.createGain();
          this.source = this.context.createBufferSource();
          this.source.buffer = buffer;
          this.source.connect(this.nodes.gain);
          this.nodes.gain.connect(this.context.destination);
        })
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  }

  play(timestamp) {
    if (!this.source) {
      return;
    }

    this.source.start(0, this.currentTime);
  }

  stop() {
    if (!this.source) {
      return;
    }

    this.source.stop();
  }

  getCurrentTime() {
    return this.context.currentTime;
  }
}
