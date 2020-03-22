import React, {Component} from 'react';
import { Scatter} from 'react-chartjs-2';
import plus from "../images/plus.svg"
import Button from './Button';
import { connect } from "react-redux"
import { makeGetRequest } from '../api_calls';
import {jsx, css } from "@emotion/core"
/** @jsx jsx */

const months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const make_dataset = (dataset, color, label, yAxisID=null) => {
    return {
        label: label,
        data: dataset,
        showLine: true,
        fill: false,
        lineTension: 0.3,
        backgroundColor: color,
        borderColor: color,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: color,
        pointBackgroundColor: color,
        pointBorderWidth: 5,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: color,
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        yAxisID
    }
}

const style = css`
    border-radius: var(-radius); 
    padding: 10px; 
    background-color: black;
    color: orange;
    // width: 90%;
    max-width: 800px;
    box-sizing: border-box;
    border-radius: 5px;
    .chart {
        display: flex;
        justify-content: space-between; 
    }
`
class LineChart extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      // from: props.from ? props.from : 1483228800.0.toString(),
      // to: props.to? props.to : new Date().getTime().toString(),
      raw: null,
      data: {
        datasets: [],
        gridLines: [{
            display: false
        }]
      }
    }
  }

  componentDidMount = () => {this.getData()}

  getPlotData = (data) => {
      // which keys of the raw data do i want to plot
      var keys 
      if (data) {
          keys = this.props.keys ? this.props.keys : Object.keys(data[0])            // get all the keys (by getting all keys from example 0), unless certain keys are props, in which case just get the
      }

      var plotData = {}
      for (var key of keys) {        
          plotData[key] = data.map((entry, idx) => {return {
            x: this.props.xtype == 'time' ? new Date(entry[this.props.label_name]) : idx,
            y: entry[key]
          }})                // map the data (list of dicts) to a dict of lists
      }

      if (this.props.create_fields) {
        var create_fields = this.props.create_fields
        for (var field of Object.keys(create_fields)) {
          plotData[field] = create_fields[field](plotData)   //each function in the array of 
        }
      }

      // list of dicts makes sense for structure of raw data source because then there can be missing values for different columns
      // for (var key in plotData) {
      //   // plotData = {'yo': [{x:1,y:2}, {x:1.5, y:4}, {x:5, y:6}]}
      //   console.log(key)
      //   plotData[key] = plotData[key].map((i, idx) => {return {x: idx, y: i}})
      // }
      return plotData
  }

  getLabels = (data) => {
      // GET X LABEL
      var labels = []
      var label_key
      if (data) {
          // label_name = this.props.label_name
          // label_name = Object.keys(data)[0]                                 // use first column name as label
          // labels = data.map((d) => {return d[label_name]})                         // map entries to list of values to be used as xticks
          // labels = data[label_name]
          labels = this.props.label_name ? data.map((d)=>{return 'y'}) : Object.keys([...Array(data.length)])
          // labels = this.props.label_name ? data.map((d)=>{return 'yo') : Object.keys([...Array(data.length)])
          // labels = {[label_name]: labels}
      }
      return labels
  }

  getData = () => {
    if (this.props.raw_data) { return null }            // if data passed directly then this component doesnt need to fetch it
    makeGetRequest(`app/admin/stats?from=${this.props.fromEpoch}&to=${this.props.toEpoch}&data_key=${this.props.data_key}`,
        data => {
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
        var plot_data = this.getPlotData(raw_data)
        var labels = this.getLabels(raw_data)
        labels = labels.slice(1) // slice off 
        var colors = ['#48C0C0', '#ff9b21', '#ff5151', '#5ee592', '#c86bff']
        var datasets = Object.keys(plot_data).map(
          (label, idx) => {
            var yAxisID = this.props.create_fields ? ( Object.keys(this.props.create_fields).includes(label) ? 'right' : null ) : null
            return make_dataset(plot_data[label], colors[idx], label, yAxisID)}
        )
        this.state.data.datasets = datasets

    }
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
          {/* <div style={{fontSize: '10px'}}>
            Data from {this.props.from} to {this.props.to} {this.props.unit} ago
          </div> */}
          {/* <button onClick={this.save}>
            <img style={{float: 'right', height: '10px'}} src={plus}/>
          </button> */}

        <Scatter data={
            this.state.data
          }
          height={400}
          options = {{
            maintainAspectRatio: false,
            // backgroundColor: 'white',
            scales: {
                xAxes: [{
                    type: this.props.xtype == 'time' ? 'time' : 'linear',
                    gridLines: {
                      color: '#ff822e',
                    },
                    ticks: {
                      // callback: (epoch) => {var d = months[new Date(epoch).getMonth()]; return d},
                      fontColor: "#ff822e",
                      fontSize: 10,
                      suggestedMin: 0
                    },
                    scaleLabel: {
                      fontColor: "#ff822e",
                      display: true,
                      labelString: this.props.label_name,
                      fontSize: 10
                    }
                }],
                yAxes: [
                  {
                    position: 'left',
                    name: 'left-axis',
                    gridLines: {
                      color: '#ff822e',
                    },
                    ticks: {
                      source: 'auto',
                      fontColor: '#ff822e',
                      fontSize: 10
                    },
                    scaleLabel: {
                      fontColor: '#ff822e',
                      fontSize: 10
                    }
                  },
                  {
                    id: 'right',
                    position: 'right',
                    gridLines: {
                      // color: '#ff822e',
                    },
                    ticks: {
                      source: 'auto',
                      fontColor: '#ff822e',
                      fontSize: 10
                    },
                    scaleLabel: {
                      fontColor: '#ff822e',
                      fontSize: 10
                    }
                  }
                ]
            }
        }}


        />
        </div>
      </div>
    );
      }
};

const mapDispatchToProps = (dispatch) => {
  return {
    add: (chart_config) => {
      dispatch({
        type: 'ADD',
        chart: chart_config
      })
    }
  }
}

export default LineChart = connect(null, mapDispatchToProps)(LineChart)