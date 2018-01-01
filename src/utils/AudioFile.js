export default class BasicAudioFile {
  /**
   * @param src String
   */
  constructor(src) {
    this.src = src;
    this.buffer = null;
    this.context = new (window.AudioContext || window.webkitAudioContext)();
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
          return this.context.decodeAudioData(buffer);
        })
        .then((buffer) => {
          this.buffer = buffer;
        })
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  }

  connectSource() {
    this.nodes.gain = this.context.createGain();
    this.nodes.gain.connect(this.context.destination);
    this.source = this.context.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(this.nodes.gain);
  }

  play(timestamp) {
    this.connectSource();
    this.source.start(0, timestamp);
  }

  stop() {
    if (!this.source) {
      return;
    }

    this.source.stop();
  }

  getCurrentTime() {
    const result = this.context ? this.context.currentTime : 0;
    return result;
  }
}
