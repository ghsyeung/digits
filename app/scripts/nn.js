import { vecAdd, vecDot, sigmoid } from './helpers';
export let NN30, NN50;

(function() {
  $.getJSON("data/weights.json", function(w) {
    if (w) {
      $.getJSON("data/biases.json", function(b) {
        if (b) {
          NN30 = new NeuralNetwork(w, b);
        }
      });
    }
  });
})();

(function() {
  $.getJSON("data/weights_50.json", function(w) {
    if (w) {
      $.getJSON("data/biases_50.json", function(b) {
        if (b) {
          NN50 = new NeuralNetwork(w, b);
        }
      });
    }
  });
})();

export class NeuralNetwork {
  constructor(weights, biases) {
    this.weights = weights;
    this.biases = biases;
  }
  neuralNetworkGuess(bitarr) {
    let npl, prevLevelResult = [], levelResult = [];
    let weights = this.weights, biases = this.biases;

    prevLevelResult = bitarr;
    for (var i = 0; i < weights.length; i++) {
      npl = weights[i].length;
      levelResult = [];
      for (var j = 0; j < npl; j++) {
        levelResult.push(sigmoid(vecDot(prevLevelResult, weights[i][j]) + biases[i][j][0]));
      }
      prevLevelResult = levelResult;
    }
    return levelResult;
  };
}


