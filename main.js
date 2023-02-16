const frame_height = 500;
const frame_width = 500;
const margins = {left: 100, right: 100, top: 20, bottom:20};

const frame1 =
d3.select("#vis1")
    .append("svg")
        .attr("height", frame_height)
        .attr("width", frame_width)
        .attr("class", "frame");

d3.csv("data/data.csv").then((data) => {

    const max_y = d3.max(data, (d) => {return parseInt(d.Value);});
    const y_scale =
    d3.scaleLinear()
        .domain([0, (max_y + 35000)])
        .range([(frame_height - margins.bottom), 0]);
    const x_scale =
    d3.scaleBand()
        .domain(data.map( (d) => {return d.Category;}))
        .range([0, (frame_width - margins.right), 0]);

    frame1.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
            .attr("transform", "translate(" + margins.left +  ")")
            .attr("x", (d) => {return (x_scale(d.Category))})
            .attr("y", (d) => {return (y_scale(parseInt(d.Value)))})
            .attr("height", (d) => { return ( frame_height - y_scale(parseInt(d.Value)) - margins.bottom) })
            .attr("width", x_scale.bandwidth() - 5)
            .attr("class", "bar");

    frame1.append("g")
    .attr("transform", "translate(" + margins.left + ")")
    .call(
        d3.axisLeft()
            .scale(y_scale)
            .ticks(10)
        )
        .attr("font-size", "20px");

    frame1.append("g")
    .attr("transform", "translate(" + margins.left + "," + (frame_height - margins.bottom) + ")")
    .call(
        d3.axisBottom()
            .scale(x_scale)
            .ticks(10)
        );


});
