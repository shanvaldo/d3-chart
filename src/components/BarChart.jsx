import { Component } from "react";
import _ from "lodash";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as d3 from "d3";

export default class BarChart extends Component {
  constructor(props) {
    super(props);
    this.createBarChart = this.createBarChart.bind(this);
  }

  componentDidMount = () => {
    this.createBarChart();
  };

  createBarChart = () => {
    const data = this.props.data.map(item => {
      let newDate = item.date.split("-");
      return { ...item, date: `${newDate[0]}/${newDate[1]}` };
    });

    const margin = 80;
    const width = this.props.width - 2 * margin;
    const height = this.props.height - 2 * margin;

    const max = _.maxBy(data, function(o) {
      return o.value;
    });

    const svg = d3
      .select("#bar-chart-container")
      .append("svg")
      .attr("width", this.props.width)
      .attr("height", this.props.height);

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin}, ${margin})`);

    // Set X-axis value range
    const xScale = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map(d => d.date))
      .padding(0.2);

    // Set Y-axis value range
    const yScale = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, max.value]);

    // Define grid lines
    const makeYLines = () => d3.axisLeft().scale(yScale);

    // Create bar chart
    const barGroups = chart
      .selectAll()
      .data(data)
      .enter()
      .append("g");

    // Create X Line
    chart
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    // Create Y line
    chart.append("g").call(d3.axisLeft(yScale));

    chart
      .append("g")
      .attr("class", "grid")
      .attr("opacity", 0.2)
      .call(
        makeYLines()
          .tickSize(-width, 0, 0)
          .tickFormat("")
      );

    // Chart bar raise up and hover animation
    barGroups
      .append("rect")
      .attr("class", "bar")
      .attr("x", g => xScale(g.date))
      .attr("y", g => yScale(g.value))
      .attr("height", g => height - yScale(g.value))
      .attr("width", xScale.bandwidth())
      .on("mouseenter", function(actual, i) {
        d3.select(this)
          .transition()
          .duration(150)
          .style("fill", "#DF2572");

        let y = yScale(actual.value);

        chart
          .append("line")
          .attr("id", "limit")
          .attr("x1", 0)
          .attr("y1", y)
          .attr("x2", width)
          .attr("y2", y);
      })
      .on("mouseleave", function() {
        d3.select(this)
          .transition()
          .duration(150)
          .style("fill", "#FF6260");

        chart.selectAll("#limit").remove();
      })
      .attr("y", height)
      .attr("height", 0)
      .transition()
      .duration(1000)
      .delay(function(a, i) {
        return i * 100;
      })
      .attr("y", function(a, i) {
        return yScale(a.value);
      })
      .attr("height", function(a, i) {
        return height - yScale(a.value);
      });

    // Bounce and text animation
    barGroups
      .append("text")
      .attr("class", "value")
      .attr("x", a => xScale(a.date) + xScale.bandwidth() / 2)
      .attr("y", height)
      .attr("text-anchor", "middle")
      .text(a => `${a.value}%`)
      .transition()
      .duration(1000)
      .delay(function(a, i) {
        return i * 150;
      })
      .attr("y", function(a, i) {
        return yScale(a.value) + 30;
      })
      .ease(d3.easeBounce)
      .duration(1500);

    // Chart label
    svg
      .append("text")
      .attr("class", "label")
      .attr("x", -(height / 2) - margin)
      .attr("y", margin / 2.4)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .text(this.props.yAxisTitle);

    svg
      .append("text")
      .attr("class", "label")
      .attr("x", width / 2 + margin)
      .attr("y", height + margin * 1.7)
      .attr("text-anchor", "middle")
      .text(this.props.xAxisTitle);

    svg
      .append("text")
      .attr("class", "title")
      .attr("x", width / 2 + margin)
      .attr("y", 40)
      .attr("text-anchor", "middle")
      .text(this.props.chartTitle);
  };

  render() {
    return (
      <div
        id="bar-chart-container"
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #fff;

          .bar {
            fill: #ff6260;
          }

          #limit {
            stroke: #2fc8ff;
            stroke-width: 2;
            stroke-dasharray: 4;
          }

          line {
            stroke: grey;
          }

          text {
            text-transform: capitalize;
          }
        `}
      />
    );
  }
}
