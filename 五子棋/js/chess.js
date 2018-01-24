var chessMap = (function() {
  var chessMap = []
  for(var i = 0; i < 15; i++) {
    chessMap[i] = []
    for(var j = 0; j < 15; j++) {
      chessMap[i][j] = 0
    }
  }
  return chessMap
})()
var chess = document.getElementById('chess');
var context = chess.getContext('2d');
var baseDistance = 30;
var basePadding = 15;
// 棋子的颜色。黑色 = true, 白色 = false
var ChessPiecesType = true;
context.strokeStyle = '#bfbfbf';

var drawTransverseLine = function (y) {
  context.moveTo(0 + basePadding, y);
  context.lineTo(450 - basePadding, y);
  context.stroke();
}

var drawVerticalLine = function (x) {
  context.moveTo(x, 0 + basePadding);
  context.lineTo(x, 450 - basePadding);
  context.stroke();
}

var drawCheckBoard = function () {
  for (var i = 1; i <= 15; i++) {
    var value = baseDistance * i - basePadding
    drawTransverseLine(value);
    drawVerticalLine(value)
  }
}

var drawLogo = function (src, callback) {
  var logo = new Image();
  logo.src = src
  logo.onload = function () {
    context.drawImage(logo, 0, 0, 450, 450);
    callback();
  }
}

var drawChessPieces = function (i, j, me) {
  context.beginPath();
  context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
  context.closePath();
  var gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);

  if (me) {
    gradient.addColorStop(0, '#0a0a0a');
    gradient.addColorStop(1, '#636766');
  } else {
    gradient.addColorStop(0, '#d1d1d1');
    gradient.addColorStop(1, '#f9f9f9');
  }

  context.fillStyle = gradient;
  context.fill();
}

chess.addEventListener('click', function (e) {
  var event = e,
      x = event.offsetX / baseDistance | 0,
      y = event.offsetY / baseDistance | 0;
  if (!chessMap[x][y]) {
    drawChessPieces(x, y, ChessPiecesType)
    chessMap[x][y] = 1
    ChessPiecesType = !ChessPiecesType
  }
}, false)

drawLogo('./logo.png', drawCheckBoard)





