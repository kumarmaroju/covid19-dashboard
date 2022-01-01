import './index.css'

const DistrictListItem = props => {
  const {districtKey, listDistrict, tabId} = props
  const specificOne = listDistrict[districtKey]
  let value = null
  if (tabId !== 'active') {
    const data = specificOne.total[`${tabId}`]
    value = data !== undefined ? data : 0
  } else {
    const confirmedData = specificOne.total.confirmed
    const recoveredData = specificOne.total.recovered
    const deceasedData = specificOne.total.deceased
    const active = confirmedData - (recoveredData - deceasedData)
    value = active !== undefined ? active : 0
  }

  return (
    <li className="top-district-list-item">
      <p className="top-district-count">{value}</p>
      <p className="district-name">{districtKey}</p>
    </li>
  )
}
export default DistrictListItem
