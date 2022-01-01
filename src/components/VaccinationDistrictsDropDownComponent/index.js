import {Component} from 'react'

import './index.css'

import VaccinationStateDropDown from '../VaccinationStateDropDown'

class VaccinationDistrictsDropDownComponent extends Component {
  state = {
    districtDetails: [],
    selected: null,
  }

  componentDidMount() {
    this.getDistrictDetails()
  }

  getDistrictDetails = async () => {
    const {selected} = this.props
    const {value} = selected
    const url = `https://apis.ccbp.in/covid19-districts-data/${value}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()
    const updatedDistrict = fetchedData.districts.map(eachOption => ({
      value: eachOption.district_id,
      label: eachOption.district_name,
    }))

    this.setState({districtDetails: updatedDistrict})
  }

  onChangeValue = selected => {
    this.setState({selected})
  }

  render() {
    const {districtDetails, selected} = this.state

    return (
      <VaccinationStateDropDown
        options={districtDetails}
        selected={selected}
        onChange={this.onChangeValue}
        placeholder="Select District"
      />
    )
  }
}
export default VaccinationDistrictsDropDownComponent
