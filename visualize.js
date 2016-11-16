var points = [[0,5],[1,9],[2,7],[3,5],[4,3],[6,4],[7,2],[8,3],[9,2]];
const WIDTH = 700;
const HEIGHT = 600;
const MARGIN = 30;

const INNER_WIDTH = WIDTH - 2 * MARGIN;
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;


var drawLine = function (lines, group) {
  group.append('path')
    .datum(points)
    .classed('graph', true)
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


var display = function () {

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
		.y(function(q){return yScale(q[1]/10)});

  drawLine(line, lineGroup)

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
		.y(function(q){return yScale(Math.sin(q[0])/10+0.5)});

  drawLine(sineLine, sineLineGroup);
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
}

window.onload = display;
