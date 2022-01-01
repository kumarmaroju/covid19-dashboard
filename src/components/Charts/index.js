import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'

import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
  ResponsiveContainer,
} from 'recharts'

class Charts extends Component {
  state = {dataDetails: [], onProgress: false}

  componentDidMount() {
    this.getTimeLine()
  }

  getStateDateDetails = data => {
    const {stateCode} = this.props
    const codeDateList = []
    const keyNames = Object.keys(data[`${stateCode}`].dates)

    keyNames.forEach(eachDate => {
      const result = {
        date: eachDate,
        confirmed: data[`${stateCode}`].dates[`${eachDate}`].total.confirmed,
        recovered: data[`${stateCode}`].dates[`${eachDate}`].total.recovered,
        deceased: data[`${stateCode}`].dates[`${eachDate}`].total.deceased,
        tested: data[`${stateCode}`].dates[`${eachDate}`].total.tested,
        active:
          data[`${stateCode}`].dates[`${eachDate}`].total.confirmed -
          (data[`${stateCode}`].dates[`${eachDate}`].total.deceased +
            data[`${stateCode}`].dates[`${eachDate}`].total.recovered),
      }

      codeDateList.push(result)
    })
    return codeDateList
  }

  getTimeLine = async () => {
    this.setState({onProgress: false})
    const {stateCode} = this.props
    const url = `Https://apis.ccbp.in/covid19-timelines-data/${stateCode}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const stateDateDetails = this.getStateDateDetails(data)
    this.setState({dataDetails: stateDateDetails, onProgress: false})
  }

  renderConfirmedBarChart = datesData => (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={datesData}>
        <XAxis dataKey="date" tick={{stroke: '#9A0E31', strokeWidth: '1'}} />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="confirmed"
          fill="#9A0E31"
          className="con-bar"
          label={{
            position: 'top',
            stroke: '#9A0E31',
            borderRadius: '30%',
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  )

  renderActiveBarChart = datesData => (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={datesData}>
        <XAxis dataKey="date" tick={{stroke: '#0A4FA0', strokeWidth: '1'}} />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="active"
          fill="#0A4FA0"
          className="bar"
          label={{position: 'top', stroke: '#0A4FA0'}}
        />
      </BarChart>
    </ResponsiveContainer>
  )

  renderRecoveredBarChart = datesData => (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={datesData}>
        <XAxis dataKey="date" tick={{stroke: '#216837', strokeWidth: '1'}} />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="recovered"
          fill="#216837"
          className="bar"
          label={{position: 'top', stroke: '#216837'}}
        />
      </BarChart>
    </ResponsiveContainer>
  )

  renderDeceasedBarChart = datesData => (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={datesData}>
        <XAxis dataKey="date" tick={{stroke: '#474C57', strokeWidth: '1'}} />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="deceased"
          fill="#474C57"
          className="bar"
          label={{position: 'top', stroke: '#474C57'}}
        />
      </BarChart>
    </ResponsiveContainer>
  )

  getRenderBarChart = () => {
    const {dataDetails} = this.state
    const datesData = dataDetails.slice((40: 49))
    const {tabId} = this.props

    switch (tabId) {
      case 'confirmed':
        return this.renderConfirmedBarChart(datesData)
      case 'active':
        return this.renderActiveBarChart(datesData)
      case 'recovered':
        return this.renderRecoveredBarChart(datesData)
      case 'deceased':
        return this.renderDeceasedBarChart(datesData)
      default:
        return null
    }
  }

  getRenderLineChart = () => {
    const {dataDetails} = this.state

    const DataFormatter = number => {
      if (number > 1000) {
        return `${(number / 1000).toString()}k`
      }
      return number.toString()
    }

    return (
      <>
        <h1 className="daily-spread-trends-heading">Daily Spread Trends</h1>

        <ResponsiveContainer
          className="confirmed-line-chart"
          width="90%"
          height={400}
        >
          <LineChart
            data={dataDetails}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <XAxis dataKey="date" stroke="#FF073A" />
            <YAxis tickFormatter={DataFormatter} stroke="#FF073A" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="confirmed" stroke="#FF073A" />
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer
          className="active-line-chart"
          width="90%"
          height={400}
        >
          <LineChart
            data={dataDetails}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <XAxis dataKey="date" stroke="#007BFF" />
            <YAxis tickFormatter={DataFormatter} stroke="#007BFF" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="active" stroke="#007BFF" />
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer
          className="recovered-line-chart"
          width="90%"
          height={400}
        >
          <LineChart
            data={dataDetails}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <XAxis dataKey="date" stroke="#27A243" />
            <YAxis tickFormatter={DataFormatter} stroke="#27A243" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="recovered" stroke="#27A243" />
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer
          className="deceased-line-chart"
          width="90%"
          height={400}
        >
          <LineChart
            data={dataDetails}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <XAxis dataKey="date" stroke="#6C757D" />
            <YAxis tickFormatter={DataFormatter} stroke="#6C757D" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="deceased" stroke="#6C757D" />
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer
          width="90%"
          height={400}
          className="tested-line-chart"
        >
          <LineChart
            data={dataDetails}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <XAxis dataKey="date" stroke="#9673B9" />
            <YAxis tickFormatter={DataFormatter} stroke="#9673B9" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="tested" stroke="#9673B9" />
          </LineChart>
        </ResponsiveContainer>
      </>
    )
  }

  getRenderLoaderView = () => (
    <div className="loader-container" testid="timelinesDataLoader">
      <Loader type="ThreeDots" color="#007bff" height={50} width={50} />
    </div>
  )

  render() {
    const {onProgress} = this.state

    return onProgress ? (
      this.getRenderLoaderView()
    ) : (
      <div className="chart-content-container">
        {this.getRenderBarChart()}
        <div testid="lineChartsContainer" className="line-chart-main-container">
          {this.getRenderLineChart()}
        </div>
      </div>
    )
  }
}
export default Charts
