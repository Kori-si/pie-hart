window.addEventListener("load", function wwww() {
  var createBtn = document.getElementById("create");
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  var colors = [
    "#F2C94C",
    "#EB5757",
    "#F2994A",
    "#6FCF97",
    "#9B51E0",
    "#2F80ED",
    "#56CCF2",
    "#219653",
  ];
  var values = generateValues();
  var total = values.reduce((a, b) => a + b[0], 0);
  var radius = Math.min(canvas.width, canvas.height) / 2;
  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;
  var startAngle = 0;
  [createBtn, canvas].forEach(function (element) {
    console.log(element);

    element.addEventListener("click", function () {
      values = generateValues();
      total = values.reduce((a, b) => a + b[0], 0);
      redraw();
    });
  });
  function generateValues() {
    var count = Math.floor(Math.random() * 8) + 1;
    var result = [];
    for (var i = 0; i < count; i++) {
      var value = Math.floor(Math.random() * 100);
      var sectorRadius = Math.floor((Math.random() * radius) / 2) + radius / 4;
      result.push([value, sectorRadius]);
    }
    return result;
  }
  function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var currentAngle = startAngle;
    for (var i = 0; i < values.length; i++) {
      var fraction = values[i][0] / total;
      var angle = fraction * 2 * Math.PI;
      var sectorRadius = values[i][1];
      ctx.beginPath();
      ctx.arc(
        centerX,
        centerY,
        sectorRadius,
        currentAngle,
        currentAngle + angle
      );
      ctx.lineTo(centerX, centerY);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      currentAngle += angle;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 33, 0, 2 * Math.PI);
      ctx.fillStyle = "#1E1E1E";
      ctx.fill();
    }
  }
  redraw();
  
});

