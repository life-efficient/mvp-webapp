import React, {Component} from 'react';
import { Pie } from 'react-chartjs-2';
import { makeGetRequest } from '../api_calls';
import {jsx, css } from "@emotion/core"
/** @jsx jsx */

const make_dataset = (data) => {
    var colors = ['#48C0C0', '#ff9b21', '#ff5151', '#5ee592', '#c86bff']
    return [{
            data: Object.values(data),
            backgroundColor: colors,
            hoverBackgroundColor: colors,
            borderColor: 'black',
            borderWidth: 3,
        }]
}

const style = css`
    border-radius: var(-radius); 
    display: flex;
    padding: 10px; 
    color: var(--color1);
    max-width: 800px;
    margin: auto;
    box-sizing: border-box;
    border-radius: 5px;
    .chart {
    flex-direction: column;
        display: flex;
        justify-content: space-between; 
    }
`

class PieChart extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      // from: props.from ? props.from : 1483228800.0.toString(),
      // to: props.to? props.to : new Date().getTime().toString(),
      raw: null,
      data: {
        datasets: [],
      }
    }
  }

  componentDidMount = () => {this.getData()}

  getPlotData = (data) => {
        console.log(data)
        var plotData = data     
        return plotData
  }

  getLabels = (data) => {
        var labels = []
        if (data) {
            labels = Object.keys(data)
            console.log('labels:', labels)
        }
        return labels
  }

  getData = () => {
    if (this.props.raw_data) { return null }            // if data passed directly then this component doesnt need to fetch it
    makeGetRequest(`app/admin/stats?from=${this.props.fromEpoch}&to=${this.props.toEpoch}&data_key=${this.props.data_key}`,
        data => {
            console.log(data)
            this.setState({raw_data: data})
        }
    )
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props
    if(oldProps.to !== newProps.to || oldProps.from !== newProps.from) {
      this.getData()
    }
  }

  save = () => {
    this.props.add(this.props.config)
  }

  render() {
    if (this.state.raw_data || this.props.raw_data) {
        var raw_data = this.state.raw_data ? this.state.raw_data : this.props.raw_data
        var labels = Object.keys(raw_data)
       
        this.state.data.labels = labels
        this.state.data.datasets = make_dataset(raw_data)    }
    console.log(this.state.data)
    return (
      <div css={css`
          ${style};
          ${this.props._css}
          animationDelay: ${0.1*this.props.idx}s;
        }`}>
        <div className="chart">
          <div style={{float: 'left'}}>
            {this.props.title}
          </div>
        <Pie data={
            this.state.data}
            width={200}
            height={120}
            options = {{
                cutoutPercentage: 60,
                legend: false,
                tooltips: {
                    callbacks: {
                        label: (tooltipItem, data) => {
                            console.log(tooltipItem)
                            var dataset = data.datasets[tooltipItem.datasetIndex];
                            var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                              return previousValue + currentValue;
                            });
                            var currentValue = dataset.data[tooltipItem.index];
                            var percentage = Math.floor(((currentValue/total) * 100)+0.5);         
                            return `${data.labels[tooltipItem.index]} ${percentage}%`;
                        }
                    }
                }
            }}
        />
        </div>
      </div>
    );
      }
};

export default PieChart