var vec_dot, vec_add, neuralNetworkGuess;
var weights, biases;
var sigmoid;
(function() {
  vec_dot = function(u, v) {
    return _.reduce(_.zip(u, v), function(a, x) {
      return a + x[0] * x[1];
    }, 0);
  };

  vec_add = function(u, v) {
    return _.map(_.zip(u, v), function(arr) {
      return arr[0] + arr[1];
    });
  };

  sigmoid = function(z) {
    return 1.0/(1.0 + math.exp(-z));
  };

  neuralNetworkGuess = function(bitarr) {
    var npl, prevLevelResult = [], levelResult = [];
    prevLevelResult = bitarr;
    for (var i = 0; i < weights.length; i++) {
      npl = weights[i].length;
      levelResult = [];
      for (var j = 0; j < npl; j++) {
        levelResult.push(sigmoid(vec_dot(prevLevelResult, weights[i][j]) + biases[i][j][0]));
      }
      prevLevelResult = levelResult;
    }
    return levelResult;
  };
})();

(function() {
  var $ = function(id) {
    return document.getElementById(id)
  } ;

  var canvas = this.__canvas = new fabric.Canvas('c',{
    isDrawingMode: true
  });

  fabric.Object.prototype.transparentCorners = false;

  var conatiner = $('canvas-container'), 
  clearEl = $('clear-canvas'),
  printEl = $('print-canvas')
  ;

  clearEl.onclick = function() {
    canvas.clear()
  };

  var reduceDim = function(arr, fullLength, n) {
    var newLength = fullLength / n, groupedY, reducedY;

    // Divide by n first
    var divided = _.map(arr, function(i) { return i / (n * n); }), 
    // Group in row direction and then sum them up
    groupedX = _.chunk(divided, n),
    reducedX = _.map(groupedX, function(p) {
      return _.sum(p);
    });

    // Group each new row in column direction
    groupedY = _.chunk(_.chunk(reducedX, newLength), n);
    reducedY = _.map(groupedY, function(group) {
      return _.unzipWith(group, _.add);
    });
    return reducedY;
  };

  printEl.onclick = function() {
    var i;
    var el = canvas.getElement();
    var imgData = canvas.getContext().getImageData(0, 0, el.width, el.height);
    var bitarr = [];
    var normalzed_bitarr;
    var result_vec;
    for(i = 3; i < imgData.data.length; i += 4) {
      bitarr.push(imgData.data[i]);
    }
    bitarr = reduceDim(bitarr, 112, 4);

    console.group();
    _.each(bitarr, function(row) {
      console.log(row);
    });
    console.groupEnd();

    normalized_bitarr = _.map(_.flatten(bitarr), function(x) { 
      return x / 255.0; 
    });

    result_vec = neuralNetworkGuess(normalized_bitarr);
    console.log(result_vec);
  };

  canvas.setHeight(112);
  canvas.setWidth(112);
  canvas.freeDrawingBrush.width = 15;
  console.log(canvas.getContext())
}
)();

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
