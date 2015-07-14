import { neuralNetworkGuess } from './nn';

(function() {
  var $ = function(id) {
    return document.getElementById(id)
  } ;

  var canvas = new fabric.Canvas('c',{
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

    let normalized_bitarr = _.map(_.flatten(bitarr), function(x) { 
      return x / 255.0; 
    });

    result_vec = neuralNetworkGuess(normalized_bitarr);
    console.log(result_vec);
  };

  canvas.setHeight(112);
  canvas.setWidth(112);
  canvas.freeDrawingBrush.width = 8;
  console.log(canvas.getContext())
}
)();


