import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Charts from '../Charts'

import './index.css'

import Header from '../Header'
import Footer from '../Footer'
import CasesTotalCount from '../CasesTotalCount'
import statesList from '../StateCodeList'
import DistrictListItem from '../DistrictListItem'

const stateListItem = {
  JK: 'Jammu and Kashmir',
  HP: 'Himachal Pradesh',
  PB: 'Punjab',
  UT: 'Uttarakhand',
  HR: 'Haryana',
  RJ: 'Rajasthan',
  UP: 'Uttar Pradesh',
  BR: 'Bihar',
  MP: 'Madhya Pradesh',
  GJ: 'Gujarat',
  MZ: 'Mizoram',
  TN: 'Tamil Nadu',
  KL: 'Kerala',
  KA: 'Karnataka',
  TG: 'Telangana',
  MH: 'Maharashtra',
  OR: 'Odisha',
  CH: 'Chandigarh',
  TR: 'Tripura',
  AN: 'Andaman and Nicobar Islands',
  DN: 'Dadra and Nagar Haveli and Daman and Diu',
  LD: 'Lakshadweep',
  PY: 'Puducherry',
  DL: 'Delhi',
  LA: 'Ladakh',
  MN: 'Manipur',
  NL: 'Nagaland',
  ML: 'Meghalaya',
  GA: 'Goa',
  AS: 'Assam',
  AR: 'Arunachal Pradesh',
  SK: 'Sikkim',
  WB: 'West Bengal',
  JH: 'Jharkhand',
  AP: 'Andhra Pradesh',
}

class SpecificStateItem extends Component {
  state = {specificItem: {}, onProgress: false, tabId: 'confirmed'}

  componentDidMount() {
    this.getSpecificItemDetails()
  }

  getSpecificItemDetails = async () => {
    this.setState({onProgress: true})
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const url = `https://apis.ccbp.in/covid19-state-wise-data`
    const response = await fetch(url)
    const data = await response.json()
    const result = data[stateCode]
    if (response.ok) {
      this.setState({specificItem: result, onProgress: false})
    }
  }

  getStateName = () => {
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const stateNames = statesList.find(
      eachState => eachState.state_code === stateCode,
    ).state_name
    return stateNames
  }

  getLastUpdateData = () => {
    const {specificItem} = this.state
    const metaObj = specificItem.meta
    const lastDate = metaObj ? metaObj.last_updated : ''
    const date = new Date(lastDate)
    return date
  }

  getOnMonth = month => {
    switch (month) {
      case 0:
        return 'January'
      case 1:
        return 'February'
      case 2:
        return 'March'
      case 3:
        return 'April'
      case 4:
        return 'May'
      case 5:
        return 'June'
      case 6:
        return 'July'
      case 7:
        return 'August'
      case 8:
        return 'September'
      case 9:
        return 'October'
      case 10:
        return 'November'
      case 11:
        return 'December'
      default:
        return null
    }
  }

  changeTabId = value => {
    this.setState({tabId: value}, this.getSpecificItemDetails)
  }

  getRenderLoaderView = () => (
    <div className="loader-container" testid="stateDetailsLoader">
      <Loader type="ThreeDots" color="#007bff" height={50} width={50} />
    </div>
  )

  getRenderMapCondition = () => {
    const stateName = this.getStateName()

    switch (stateName) {
      case stateListItem.JK:
        return 'https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640716192/Group_7328_s2o5b5.png'
      case stateListItem.HP:
        return 'https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640716328/Group_7364_cf1p6x.png'
      case stateListItem.PB:
        return 'https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640716412/Group_7330_djugjs.png'
      case stateListItem.UT:
        return 'https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640720173/Group_7331_rd1gtc.png'
      case stateListItem.HR:
        return 'https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640716626/Group_7332_ijud0p.png'
      case stateName.RJ:
        return 'https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640716713/Group_7333_ndkkrw.png'
      case stateListItem.UP:
        return 'https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640717013/Group_7334_y8afrb.png'
      case stateListItem.BR:
        return 'https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640717129/Group_7335_n1fpy8.png'
      case stateListItem.MP:
        return 'https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640717243/Group_7336_fh7t5h.png'
      case stateListItem.GJ:
        return 'https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640717243/Group_7336_fh7t5h.png'
      case stateListItem.JH:
        return 'https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640717429/Group_7342_ikdrmp.png'
      case stateListItem.WB:
        return 'https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640717559/Group_7343_pbnvua.png'
      case stateListItem.SK:
        return 'https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640717616/Group_7338_x2txzp.png'
      case stateListItem.AR:
        return 'https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640717770/Group_7340_lvnpcd.png'
      case stateListItem.AS:
        return 'https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640717858/Group_7341_aryr4q.png'
      case stateListItem.GA:
        return 'https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640717949/Group_7349_nbnicy.png'
      case stateListItem.ML:
        return 'https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640718004/Group_7344_zjqz5l.png'
      case stateListItem.NL:
        return 'https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640718103/Group_7345_scaroa.png'
      case stateListItem.MN:
        return 'https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640718178/Group_7346_d3rmfl.png'
      case stateListItem.MZ:
        return 'https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640718321/Group_7347_jdouew.png'
      case stateListItem.TR:
        return 'https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640718463/Group_7352_zoljlx.png'
      case stateListItem.CH:
        return 'https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640718587/Group_7353_yse2ae.png'
      case stateListItem.OR:
        return 'https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640718635/Group_7348_gxzq8h.png'
      case stateListItem.MH:
        return 'https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640718787/Group_7350_s51bm6.png'
      case stateListItem.TG:
        return 'https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640718900/Group_7351_enb3va.png'
      case stateListItem.KA:
        return 'https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640718989/Group_7339_zuuyd3.png'
      case stateListItem.KL:
        return 'https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640719084/Group_7355_wtfq6b.png'
      case stateListItem.TN:
        return 'https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640719142/Group_7356_vqsycf.png'
      case stateListItem.AN:
        return 'https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640719257/Group_7362_cbdloa.png'
      case stateListItem.DN:
        return 'https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640719315/Group_7357_ww7uwo.png'
      case stateListItem.LD:
        return 'https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640719386/Group_7359_jbzr99.png'
      case stateListItem.PY:
        return 'https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640719453/Group_7360_hbwfde.png'
      case stateListItem.DL:
        return 'https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640719603/Group_7358_lcni4n.png'
      case stateListItem.LA:
        return 'https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640719778/Group_7363_yjzlvh.png'
      case stateListItem.AP:
        return 'https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640720674/Group_7354_1_o38sqb.png'
      default:
        return null
    }
  }

  getRenderMainView = () => {
    const {specificItem, tabId} = this.state
    const lastUpdate = this.getLastUpdateData()
    const stateName = this.getStateName()
    const month = this.getOnMonth(lastUpdate.getMonth())

    const {total, meta} = specificItem
    const testedCount = total ? total.tested : ''
    const metaObj = meta ? meta.population : ''

    const districtObject = specificItem.districts ? specificItem.districts : ''

    const keys = Object.keys(districtObject)

    const {match} = this.props
    const {params} = match
    const {stateCode} = params

    const mapImg = this.getRenderMapCondition()
    return (
      <div>
        <div className="top-section-container">
          <div>
            <h1 className="state-name-heading">{stateName}</h1>
            <p className="last-update">{`last updated on ${month} ${lastUpdate.getDay()}th ${lastUpdate.getFullYear()}.`}</p>
          </div>

          <div>
            <p className="tested-paragraph">Tested</p>
            <p className="tested-count-paragraph">{testedCount}</p>
          </div>
        </div>
        <div className="cases-count-ul-containers">
          <CasesTotalCount
            totalCount={specificItem}
            changeTabId={this.changeTabId}
            tabId={tabId}
          />
        </div>
        <div className="map-main-container">
          <img src={mapImg} alt="map-point" className="map-image" />
          <div>
            <p className="ncp-report-heading">NCP report</p>
            <div>
              <h1 className="map-population-heading">Population</h1>
              <p className="map-population-count">{metaObj}</p>
            </div>
            <div>
              <h1 className="map-population-heading">Tested</h1>
              <p className="map-population-count">{testedCount}</p>
              <p className="map-population-heading">
                (As of 29 March per source)
              </p>
            </div>
          </div>
        </div>
        <div>
          <h1 className="top-districts-heading">Top Districts</h1>
          <ul
            className="top-district-ul-container"
            testid="topDistrictsUnorderedList"
          >
            {keys.reverse().map(eachDistrict => (
              <DistrictListItem
                key={eachDistrict}
                listDistrict={districtObject}
                districtKey={eachDistrict}
                tabId={tabId}
              />
            ))}
          </ul>
          <div className="recharts-container">
            <Charts stateCode={stateCode} tabId={tabId} />
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {onProgress} = this.state
    return (
      <>
        <Header />
        <div className="specific-item-main-container">
          {onProgress ? this.getRenderLoaderView() : this.getRenderMainView()}
        </div>
        <Footer />
      </>
    )
  }
}

export default SpecificStateItem
