import { vecAdd, vecDot, sigmoid } from './helpers';
export let NN = {
  NN30: null, 
  NN50: null, 
  NN20: null
};

let load_nn_with_suffix = (id, suffix) => {
  $.getJSON("data/weights" + suffix + ".json", function(w) {
    if (w) {
      $.getJSON("data/biases" + suffix + ".json", function(b) {
        if (b) {
          NN[id] = new NeuralNetwork(w, b);
        }
      });
    }
  });
};

load_nn_with_suffix("NN30", "");
load_nn_with_suffix("NN50", "_50");
load_nn_with_suffix("NN20", "_20");

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


