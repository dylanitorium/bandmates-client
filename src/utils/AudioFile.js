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

  async init() {
    return new Promise((resolve, reject) => {
      fetch(this.src)
        .then(response => response.arrayBuffer())
        .then(buffer => this.context.decodeAudioData(buffer))
        .then(buffer => this.buffer = buffer)
        .then(() => resolve())
        .catch(error => reject(error));
    });
  }

  connectSource() {
    if (this.source) {
      this.source.stop();
    }

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
    return this.context ? this.context.currentTime : 0;
  }

  getDuration() {
    return this.buffer.duration;
  }
}
