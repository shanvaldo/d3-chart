import { Component } from "react";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sample: [
        {
          date: "15-02-2019",
          value: 22
        },
        {
          date: "14-02-2019",
          value: 70
        },
        {
          date: "13-02-2019",
          value: 60
        },
        {
          date: "12-02-2019",
          value: 40
        },
        {
          date: "11-02-2019",
          value: 10
        },
        {
          date: "10-02-2019",
          value: 55
        },
        {
          date: "09-02-2019",
          value: 68
        },
        {
          date: "08-02-2019",
          value: 81
        },
        {
          date: "07-02-2019",
          value: 91
        },
        {
          date: "06-02-2019",
          value: 45
        },
        {
          date: "05-02-2019",
          value: 100
        },
        {
          date: "04-02-2019",
          value: 78
        }
      ]
    };
  }

  render() {
    return (
      <div
        className="app"
        css={css`
          margin: 50px auto;
        `}
      >
        <LineChart
          data={this.state.sample}
          width={1000}
          height={600}
          chartTitle="course performance"
          xAxisTitle="months"
          yAxisTitle="values"
        />
        <BarChart
          data={this.state.sample}
          width={1000}
          height={600}
          chartTitle="rating"
          xAxisTitle="months"
          yAxisTitle="values"
        />
      </div>
    );
  }
}

export default App;
