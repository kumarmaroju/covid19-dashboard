import './index.css'

const EachTableItem = props => {
  const {itemDetails} = props
  const {confirmed, name, recovered, population, active, deceased} = itemDetails

  return (
    <li className="table-item-container">
      <p className="state-name">{name}</p>
      <p className="state-confirmed">{confirmed}</p>
      <p className="state-active">{active}</p>
      <p className="state-recovered">{recovered}</p>
      <p className="state-deceased">{deceased}</p>
      <p className="state-population">{population}</p>
    </li>
  )
}
export default EachTableItem
