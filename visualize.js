var points = [[0,5],[1,9],[2,7],[3,5],[4,3],[6,4],[7,2],[8,3],[9,2]];
const WIDTH = 700;
var HEIGHT = 600;
const MARGIN = 30;

const INNER_WIDTH = WIDTH - 2 * MARGIN;
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;

var curveArray = [
    {"d3Curve":d3.curveLinear,"curveTitle":"curveLinear"},
    {"d3Curve":d3.curveLinearClosed,"curveTitle":"curveLinear"},
    {"d3Curve":d3.curveStep,"curveTitle":"curveStep"},
    {"d3Curve":d3.curveBasis,"curveTitle":"curveBasis"},
    {"d3Curve":d3.curveBundle.beta(0.7),"curveTitle":"curveBasis"},
    {"d3Curve":d3.curveCardinalClosed,"curveTitle":"curveCardinal"},
    {"d3Curve":d3.curveCardinal,"curveTitle":"curveCardinal"},
    {"d3Curve":d3.curveMonotoneX,"curveTitle":"curveMonotoneX"},
  ];


var displayGraph = function functionName() {
  curveArray.forEach(function(each){
    display(each)
  })
}


var drawLine = function (lines, group, className) {
  group.append('h1').text('Anusree');
  group.append('path')
    .datum(points)
    .classed(className, true)
    .attr('d', lines)
    .attr('stroke-width','2px');
}

var drawCircles = function (group, yValue) {
  group.selectAll('circle')
    .data(points,function(d){return d;})
    .enter().append('circle')
    .attr('r', 4)
    .attr('cx', function(q){return xScale(q[0]/10)})
    .attr('cy', function(q){return yScale(yValue/10)})
    .attr('fill', 'white')
    .attr('stroke-width', '1px')
    .attr('stroke','steelblue');
}





var display = function (interpolate) {

  var svg = d3.select('.container').append('svg')
  .attr('width', WIDTH)
  .attr('height', HEIGHT);

  var xScale = d3.scaleLinear()
    .range([0,INNER_WIDTH])
    .domain([0,1]);

  var yScale = d3.scaleLinear()
    .range([INNER_HEIGHT,0])
    .domain([0,1]);

  var xAxis = d3.axisBottom(xScale).ticks(10);
  var yAxis = d3.axisLeft(yScale).ticks(10);

  var translate = function(x, y){
  	return "translate("+x+","+y+")";
  };

  svg.append("title")
          .text("Value vs Date Graph");

  svg.append("g")
      .attr('transform', translate(MARGIN, HEIGHT - MARGIN))
      .call(xAxis);

  svg.append("g")
      .attr('transform', translate(MARGIN, MARGIN))
      .call(yAxis);

  var lineGroup = svg.append('g')
    .attr('transform',  translate(MARGIN, MARGIN));

  var line = d3.line()
		.x(function(q){return xScale(q[0]/10)})
		.y(function(q){return yScale(q[1]/10)})
    .curve(interpolate.d3Curve);

  drawLine(line, lineGroup, 'simpleLine')

	lineGroup.selectAll('circle')
    .data(points,function(d){return d;})
		.enter().append('circle')
		.attr('r', 4)
    .attr('cx', function(q){return xScale(q[0]/10)})
    .attr('cy', function(q){return yScale(q[1]/10)})
    .attr('fill', 'white')
    .attr('stroke-width', '1px')
    .attr('stroke','steelblue');

  var sineLineGroup = svg.append('g')
    .attr('transform',  translate(MARGIN, MARGIN));

  var sineLine = d3.line()
		.x(function(q){return xScale(q[0]/10)})
		.y(function(q){return yScale(Math.sin(q[0])/10+0.5)})
    .curve(interpolate.d3Curve);

  drawLine(sineLine, sineLineGroup, 'sineLine');
  // drawCircles(sineLineGroup,)

  sineLineGroup.selectAll('circle')
    .data(points,function(d){return d;})
    .enter().append('circle')
    .attr('r', 4)
    .attr('cx', function(q){return xScale(q[0]/10)})
    .attr('cy', function(q){return yScale(Math.sin(q[0])/10+0.5)})
    .attr('fill', 'white')
    .attr('stroke-width', '1px')
    .attr('stroke','steelblue');

    // HEIGHT = HEIGHT + HEIGHT;

}

window.onload = displayGraph;
