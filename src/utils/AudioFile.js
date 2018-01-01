class BasicAudioFile {
  /**
   * @param src String
   */
  constructor(src) {
    this.src = src
    this.context = null;
    this.source = null;
    this.nodes = {};
    this.handlers = {};
  }

  init() {
    return new Promise((resolve, reject) => {
      fetch(src)
        .then(response => response.arrayBuffer())
        .then((buffer) => {
          this.context = new (window.AudioContext || window.webkitAudioContext)();
          return this.context.decodeAudioData(buffer);
        })
        .then((data) => {
          this.nodes.gain = this.context.createGain();
          this.source = this.context.createBufferSource();
          this.source.buffer = buffer;
          this.source.connect(gain);
          this.nodes.gain.connect(this.context.destination);
        })
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  }

  play() {
    if (!this.source) {
      return;
    }

    this.source.start(0);
  }

  stop() {
    if (!this.source) {
      return;
    }

    this.source.stop();
  }
}
