import { vecAdd, vecDot, sigmoid } from './helpers';
let weights, biases;

(function() {
  $.getJSON("data/weights.json", function(w) {
    if (w) {
      weights = w;
      console.log(weights);
      $.getJSON("data/biases.json", function(b) {
        if (b) {
          biases = b;
          console.log(biases);
        }
      });
    }
  });
})();

export function neuralNetworkGuess(bitarr) {
  var npl, prevLevelResult = [], levelResult = [];
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


