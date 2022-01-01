import {Component} from 'react'

import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from 'chart.js'

import {Line} from 'react-chartjs-2'

import './index.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
)

class VaccinationTotalData extends Component {
  state = {vaccinationDetails: {}, showDoseChart: true}

  componentDidMount() {
    this.getRenderVaccinationDetails()
  }

  getRenderVaccinationDetails = async () => {
    const url = 'https://apis.ccbp.in/covid19-vaccination-data'

    const response = await fetch(url)
    const fetchData = await response.json()
    this.setState({vaccinationDetails: fetchData})
  }

  onClickByDose = () => {
    this.setState({showDoseChart: true})
  }

  onClickByAge = () => {
    this.setState({showDoseChart: false})
  }

  getRenderSiteCard = () => {
    const {vaccinationDetails} = this.state
    const {topBlock} = vaccinationDetails
    const privateObj = topBlock ? topBlock.sites.pvt : ''
    const governmentObj = topBlock ? topBlock.sites.govt : ''
    const totalSiteObj = topBlock ? topBlock.sites.total : ''
    return (
      <div className="total-site-card">
        <img
          src="https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640871443/Group_7476_uwr7lj.png"
          alt="site-conducting-vaccination-pic"
          className="vaccine-pic"
        />
        <div>
          <h1 className="sites-heading">Site Conducting Vaccination</h1>
          <p className="total-site-count">{totalSiteObj}</p>
          <div className="private-govt-container">
            <div>
              <p className="government-heading">Government</p>
              <p className="count-styles">{governmentObj}</p>
            </div>
            <div>
              <p className="government-heading">Private</p>
              <p className="count-styles">{privateObj}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  getRenderDoseDetailsCard = () => {
    const {vaccinationDetails} = this.state
    const {topBlock} = vaccinationDetails
    const totalDosesCount = topBlock ? topBlock.vaccination.total : ''
    const dose1 = topBlock ? topBlock.vaccination.tot_dose_1 : ''
    const dose2 = topBlock ? topBlock.vaccination.tot_dose_2 : ''
    return (
      <div className="total-site-card">
        <img
          src="https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640871393/Group_7475_qbitwk.png"
          alt="total-vaccination-Deses-pic"
          className="vaccine-pic"
        />
        <div>
          <h1 className="sites-heading">Total Vaccination Doses</h1>
          <p className="total-site-count">{totalDosesCount}</p>
          <div className="private-govt-container">
            <div>
              <p className="government-heading">Dose 1</p>
              <p className="count-styles">{dose1}</p>
            </div>
            <div>
              <p className="government-heading">Dose 2</p>
              <p className="count-styles">{dose2}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  getRenderLineChartByDose = () => {
    const {vaccinationDetails} = this.state

    const times = vaccinationDetails.vaccinationDoneByTime
      ? vaccinationDetails.vaccinationDoneByTime
      : []

    const dateList = ['']
    const doseOne = ['0']
    const doseTwo = ['0']
    const totalCount = ['0']
    times.forEach(eachOne => {
      if (eachOne) {
        const date = new Date(eachOne.timestamps)
        dateList.push(`${date.getHours()}:${date.getMinutes()}`)
        doseOne.push(eachOne.dose_one)
        doseTwo.push(eachOne.dose_two)
        totalCount.push(eachOne.count)
      }
    })

    const options = {
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      stacked: false,
      plugins: {
        title: {
          display: true,
          text: 'Chart By Dose',
        },
      },
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
        },
      },
    }

    const data = {
      labels: dateList,
      datasets: [
        {
          label: 'Dose 1',
          data: doseOne,
          fill: true,
          borderColor: '#37C62B',
          backgroundColor: '#233323',
        },
        {
          label: 'Dose 2',
          data: doseTwo,
          fill: true,
          borderColor: '#FCEA4E',
          backgroundColor: '#3E4226',
        },
        {
          label: 'Total Count',
          data: totalCount,
          fill: true,
          borderColor: '#A226DC',
          backgroundColor: '#2E1E30',
        },
      ],
    }

    return (
      <div className="line-chart-container">
        <Line data={data} options={options} height={220} />
      </div>
    )
  }

  getRenderLineChartByAge = () => {
    const {vaccinationDetails} = this.state

    const time = vaccinationDetails.vaccinationDoneByTimeAgeWise
      ? vaccinationDetails.vaccinationDoneByTimeAgeWise
      : []

    const dateList = ['']
    const vacc18To45 = ['0']
    const vacc45To60 = ['0']
    const vacc60Above = ['0']
    time.forEach(eachOne => {
      if (eachOne) {
        const date = new Date(eachOne.timestamps)
        dateList.push(`${date.getHours()}:${date.getMinutes()}`)
        vacc18To45.push(eachOne.vac_18_45)
        vacc45To60.push(eachOne.vac_45_60)
        vacc60Above.push(eachOne.vac_60_above)
      }
    })

    const options = {
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      stacked: false,
      plugins: {
        title: {
          display: true,
          text: 'Chart By Age',
        },
      },
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
        },
      },
    }

    const data = {
      labels: dateList,
      datasets: [
        {
          label: 'Age 18-45',
          data: vacc18To45,
          fill: true,
          borderColor: '#37C62B',
          backgroundColor: '#233323',
        },
        {
          label: 'Age 45-60',
          data: vacc45To60,
          fill: true,
          borderColor: '#FCEA4E',
          backgroundColor: '#3E4226',
        },
        {
          label: 'Age 60 Above',
          data: vacc60Above,
          fill: true,
          borderColor: '#A226DC',
          backgroundColor: '#2E1E30',
        },
      ],
    }

    return (
      <div className="line-chart-container">
        <Line data={data} options={options} height={220} />
      </div>
    )
  }

  renderRenderCategoryChart = () => {
    const {vaccinationDetails} = this.state
    const {topBlock} = vaccinationDetails
    const maleCount = topBlock ? topBlock.vaccination.male : ''
    const femaleCount = topBlock ? topBlock.vaccination.female : ''
    const otherCount = topBlock ? topBlock.vaccination.others : ''

    const covaxinCount = topBlock ? topBlock.vaccination.covaxin : ''
    const covishieldCount = topBlock ? topBlock.vaccination.covishield : ''
    const sputnikCount = topBlock ? topBlock.vaccination.sputnik : ''

    const personsData = [
      {
        count: maleCount,
        gender: 'Male',
      },
      {
        count: femaleCount,
        gender: 'Female',
      },
      {
        count: otherCount,
        gender: 'Others',
      },
    ]

    const vaccinationData = [
      {
        count: covaxinCount,
        type: 'covaxin',
      },
      {
        count: covishieldCount,
        type: 'covishield',
      },
      {
        count: sputnikCount,
        type: 'sputnik',
      },
    ]

    return (
      <div className="vaccination-category-container">
        <h1 className="vaccination-category-heading">Vaccination Category</h1>

        <ResponsiveContainer width="100%" height={400} className="">
          <PieChart>
            <Pie
              cx="50%"
              cy="50%"
              data={personsData}
              startAngle={180}
              endAngle={0}
              innerRadius="40%"
              outerRadius="70%"
              dataKey="count"
            >
              <Cell name="Male" fill="#86198F" />
              <Cell name="Female" fill="#5A8DEE" />
              <Cell name="Others" fill="#FF9800" />
            </Pie>
            <Legend
              iconType="circle"
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
            />
          </PieChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={400}>
          <PieChart margin={{top: 30, bottom: 40}}>
            <Pie
              cx="50%"
              cy="40%"
              data={vaccinationData}
              startAngle={180}
              endAngle={0}
              innerRadius="40%"
              outerRadius="70%"
              dataKey="count"
              paddingAngle={0}
            >
              <Cell name="covaxin" fill="#007CC3" />
              <Cell name="covishield" fill="#7AC142" />
              <Cell name="sputnik" fill="#FF9800" />
            </Pie>
            <Legend
              iconType="circle"
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    )
  }

  getRenderAgeChart = () => {
    const {vaccinationDetails} = this.state
    const {vaccinationByAge} = vaccinationDetails
    const age18T045 = vaccinationByAge ? vaccinationByAge.vac_18_45 : ''
    const age45T060 = vaccinationByAge ? vaccinationByAge.vac_45_60 : ''
    const age60Above = vaccinationByAge ? vaccinationByAge.above_60 : ''

    const personData = [
      {
        count: age18T045,
        age: '18-44',
      },
      {
        count: age45T060,
        age: '45-60',
      },
      {
        count: age60Above,
        age: 'Above 80',
      },
    ]

    return (
      <div className="vaccination-category-containers">
        <h1 className="vaccination-category-heading">Vaccination By Age</h1>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              cx="50%"
              cy="40%"
              data={personData}
              startAngle={0}
              endAngle={360}
              innerRadius="0%"
              outerRadius="70%"
              dataKey="count"
            >
              <Cell name="18-44" fill="#A3DF9F" />
              <Cell name="45-60" fill="#64C2A6" />
              <Cell name="Above 80" fill="#2D87BB" />
            </Pie>
            <Legend
              iconType="circle"
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    )
  }

  render() {
    const {showDoseChart} = this.state
    const doseActiveBtn = showDoseChart ? 'active-chart' : ''
    const ageActiveBtn = showDoseChart ? '' : 'active-chart'

    return (
      <div>
        <div className="total-cards-container">
          {this.getRenderSiteCard()}
          {this.getRenderDoseDetailsCard()}
        </div>
        <div className="vaccination-trends-container">
          <h1 className="vaccination-trends-heading">Vaccination Trends</h1>
          <div>
            <button
              className={`graph-btn ${doseActiveBtn}`}
              type="button"
              onClick={this.onClickByDose}
            >
              By Dose
            </button>
            <button
              className={`graph-btn ${ageActiveBtn}`}
              type="button"
              onClick={this.onClickByAge}
            >
              By Age
            </button>
          </div>
          {showDoseChart
            ? this.getRenderLineChartByDose()
            : this.getRenderLineChartByAge()}
        </div>
        <div className="pie-chart-main-container">
          {this.renderRenderCategoryChart()}
          {this.getRenderAgeChart()}
        </div>
      </div>
    )
  }
}
export default VaccinationTotalData
