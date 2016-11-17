var sinePoints = [0,1,2,3,4,5,6,7,8,9];
const WIDTH = 700;
var HEIGHT = 600;
const MARGIN = 30;

const INNER_WIDTH = WIDTH - 2 * MARGIN;
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;


var display = function (tension) {

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
    .curve(d3.curveCardinal.tension(tension));

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
}

var tensions = d3.scaleLinear()
      .domain([0, 4])
      .range([-2,1])

window.onload = function () {
  for (var i = 0; i < 5; i++) {
    display(tensions(i));
  }
}
