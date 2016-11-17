var sinePoints = [0,1,2,3,4,5,6,7,8,9];
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



var display = function (interpolate) {

  var svg = d3.select('.container').append('svg')
  .attr('width', WIDTH)
  .attr('height', HEIGHT);

  var xScale = d3.scaleLinear()
    .range([0,INNER_WIDTH])
    .domain([0,10]);

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


  var sineLineGroup = svg.append('g')
    .attr('transform',  translate(MARGIN, MARGIN));



  var sineLine = d3.line()
		.x(function(q){return xScale(q)})
		.y(function(q){return yScale((Math.sin(3 *q)+1)/2)})
    // .curve(interpolate.d3Curve);

    sineLineGroup.append('path')
      .datum(sinePoints)
      .classed('graph', true)
      .attr('d', sineLine)
      .attr('stroke-width','2px');

  sineLineGroup.selectAll('circle')
    .data(sinePoints,function(d){return d;})
    .enter().append('circle')
    .attr('r', 4)
    .attr('cx', function(q){return xScale(q)})
    .attr('cy', function(q){return yScale((Math.sin(3 *q)+1)/2)})
    .attr('fill', 'white')
    .attr('stroke-width', '1px')
    .attr('stroke','steelblue');

    HEIGHT = HEIGHT + HEIGHT;

}

window.onload = display;
