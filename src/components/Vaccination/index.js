import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'

import Header from '../Header'
import Footer from '../Footer'
import VaccinationStateDropDown from '../VaccinationStateDropDown'
import VaccinationDistrictsDropDownComponent from '../VaccinationDistrictsDropDownComponent'
import VaccinationTotalData from '../VaccinationTotalData'

const initial = {value: 2, label: 'Andhra Pradesh'}

class Vaccination extends Component {
  state = {stateDetails: [], onProgress: false, selected: initial}

  componentDidMount() {
    this.getRenderStatesList()
  }

  getRenderStatesList = async () => {
    this.setState({onProgress: true})
    const url = 'https://apis.ccbp.in/covid19-state-ids'
    const response = await fetch(url)
    const fetchedData = await response.json()
    const updateStateDetails = fetchedData.states.map(eachState => ({
      value: eachState.state_id,
      label: eachState.state_name,
    }))
    this.setState({stateDetails: updateStateDetails, onProgress: false})
  }

  onChangeValue = selected => {
    this.setState({selected})
  }

  getRenderLoaderView = () => (
    <div testid="homeRouteLoader" className="loader-container">
      <Loader type="ThreeDots" color="#007bff" height={50} width={50} />
    </div>
  )

  render() {
    const {stateDetails, selected, onProgress} = this.state
    const {match} = this.props
    const {path} = match
    return (
      <>
        <Header path={path} />
        {onProgress ? (
          this.getRenderLoaderView()
        ) : (
          <div className="vaccination-main-container">
            <div className="content-container">
              <h1 className="selected-heading">India/{selected.label}</h1>
              <div className="drop-down-content-container">
                <VaccinationStateDropDown
                  options={stateDetails}
                  selected={selected}
                  onChange={this.onChangeValue}
                  placeholder="Select State"
                />
                <VaccinationDistrictsDropDownComponent selected={selected} />
              </div>
            </div>

            <VaccinationTotalData />
          </div>
        )}
        <Footer />
      </>
    )
  }
}

export default Vaccination
