import Select from 'react-select'

import './index.css'

const customStyles = {
  control: base => ({
    ...base,
    backgroundColor: '#2F2F43',
    border: 0,
  }),
  menu: base => ({
    ...base,
    background: '#2F2F43',
  }),
  option: base => ({
    ...base,
    '&:hover': {
      background: '#0967D214',
      color: '#0967D2',
      borderLeft: '2px solid #0967D2',
    },
  }),
  dropdownIndicator: base => ({
    ...base,
    color: '#94a3b8',
  }),
  singleValue: base => ({
    ...base,
    color: '#94a3b8',
  }),
}

const VaccinationStateDropDown = props => {
  const {options, onChange, selected, placeholder} = props

  return (
    <Select
      className="drop-down-styles"
      styles={customStyles}
      options={options}
      placeholder={placeholder}
      onChange={onChange}
      value={selected}
    />
  )
}
export default VaccinationStateDropDown
