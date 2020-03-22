import React, { Component } from "react"
import "../styles/table.css"
import LineChart from "./Chart";
import { label } from "@aws-amplify/ui";
import { getEpoch } from "../utils"
import { makeGetRequest } from "../api_calls"
/** @jsx jsx */
import { css, jsx } from "@emotion/core"

function getColor(value){
    //value from 0 to 1
    var hue=((value)*120).toString(10);
    return ["hsl(",hue,",100%,50%)"].join("");
}

const style = css`
    
    .table-and-graph {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .chart {
        min-width: 500px;
    }
`

class TableToGraph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected_cols: [],
            raw_data: this.props.raw_data ? this.props.raw_data : null,
            to: null,
            from: null,
            unit: 'weeks'
        }
    }

    componentDidMount = () => {this.getData()}
    
    getData = () => {
        console.log(`getting data from: ${this.state.from} to ${this.state.to}`)
        if (this.props.raw_data) { return null }            // if data passed directly then this component doesnt need to fetch it
        makeGetRequest(`app/admin/stats?data_key=${this.props.data_key}`,
            data => {
                console.log('YOOO', data)
                this.setState({
                    raw_data: data,
                    from: Object.values(data[0])[0],                              // first value in first entry
                    to: Object.values(data[data.length - 1])[0]           // first value (weeks) in last entry
                })
            }
        )
    }

    getGraphData = (data) => {
        if (data == null) return []
        console.log(data)
        data = data.map(entry => {
            var reduced = {}
            // console.log('ENTRY:',  entry)
            for (var key of Object.keys(entry)) {
                console.log(key)
                reduced[key] = entry[key].value
            }
            console.log('RED:',reduced)
            return reduced
        })
        return data
    }

    componentDidUpdate(oldProps) {
        const newProps = this.props
        if(oldProps.to !== newProps.to || oldProps.from !== newProps.from) {
            this.getData()
        }
    }

    toggleCol = (e) => {
        console.log('toggling col')
        if (this.state.selected_cols.includes(e.target.id)) {
            var c = this.state.selected_cols
            c = c.filter((i) => {return i !== e.target.id})
            this.setState({selected_cols: c})
        }
        else {
            var c = this.state.selected_cols
            c.push(e.target.id)
            this.setState({selected_cols: c})
        }
    }

    render() {
        var [ fromEpoch, toEpoch ] = getEpoch(this.state.from, this.state.to, this.state.unit)
        var config = {
            to: this.state.to,
            from: this.state.from,
            toEpoch,
            fromEpoch,
            unit: this.state.unit,
            dataset: this.props.dataset,
            keys: this.state.selected_cols
        }
        console.log(this.state.raw_data)
        return (
            <div css={style}>
                <h2 style={{fontFamily: 'var(--font1)', color:'white', textDecoration:"underline", marginLeft: '50px'}}>
                    {this.props.datasset? this.props.dataset.replace(/_/g, ' ').replace(/\w\S*/g, function(txt){ return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : null}
                </h2>
                <br/>
                <div className="table-and-graph">
                    <Table raw_data={this.state.raw_data} toggleCol={this.toggleCol} selected_cols={this.state.selected_cols} />
                    <LineChart raw_data={this.getGraphData(this.state.raw_data)} keys={this.state.selected_cols} config={config} label_name={'Session'}/>
                </div>
            </div>
        )
    }
}

class Table extends Component {
    constructor(props) {
        super(props)
        this.state = {
            raw_data: null
        }
    }

    render() {

        if (this.props.raw_data) {
            var raw_data = this.props.raw_data
            var col_names = Object.keys(raw_data[0])
            return (
                <table style={{overflow: 'scroll'}}>
                    {/* style={{display: 'flex', flexDirection: 'column'}}> */}
                    <tr>
                        {col_names.map((r) => {
                            return (
                                <th id={r} onClick={this.props.toggleCol} style={this.props.selected_cols.includes(r) ? {backgroundColor: 'rgba(79, 209, 170, 0.548)'} : null}>
                                    {r}
                                </th>
                            )
                        })}
                    </tr>
                    {
                        raw_data.map(
                            (row) => {
                                return (
                                <tr className="tr">
                                    {
                                        Object.values(row).map(
                                            (i) => {
                                                return (
                                                    <td style={{height: '30px', width: '50px', position: 'relative'}}>
                                                        {/* {i} */}
                                                        {i.value}
                                                        {
                                                            i.type == 'has_proportion' ?
                                                            <div style={{width: `${100*i.proportion}%`, height: '100%', backgroundColor: getColor(i.proportion), position: 'absolute', left: 0, top: 0, opacity: 0.4}}>
                                                            </div>
                                                            :
                                                            null
                                                        }
                                                    </td>
                                                )
                                            }
                                        )
                                    }
                                </tr>
                                )
                            }
                        )
                    }
                </table>
            )
        }
        else {
            return null
        }

    }    
}

export default TableToGraph