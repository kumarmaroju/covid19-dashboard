import {Link} from 'react-router-dom'

import {BiChevronRightSquare} from 'react-icons/bi'

const StateItemDropDown = props => {
  const {itemDetails} = props
  const {stateCode, name} = itemDetails
  return (
    <li className="drop-down-list-item">
      <Link to={`/state/${stateCode}`} className="state-item-link-styles">
        <p className="state-name-paragraph">{name}</p>
        <div className="state-code-arrow-icon-container">
          <p className="state-code-paragraph">{stateCode}</p>
          <BiChevronRightSquare size={20} color="#FACC15" />
        </div>
      </Link>
    </li>
  )
}
export default StateItemDropDown
