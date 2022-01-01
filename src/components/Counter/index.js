import './index.css'

const Counter = props => {
  const {casesDetails} = props
  let confirmedCount = 0
  let activeCount = 0
  let recoveredCount = 0
  let deceasedCount = 0

  casesDetails.forEach(eachObj => {
    confirmedCount += eachObj.confirmed
    activeCount += eachObj.active
    recoveredCount += eachObj.recovered
    deceasedCount += eachObj.deceased
  })
  return (
    <>
      <div className="confirmed-card" testid="countryWideConfirmedCases">
        <p className="confirmed-heading">Confirmed</p>
        <img
          src="https://res.cloudinary.com/dtx7jtwd5/image/upload/v1639895561/Group_1_frmvcn.png"
          alt="country wide confirmed cases pic"
        />
        <p className="confirmed-count">{confirmedCount}</p>
      </div>

      <div className="confirmed-card" testid="countryWideActiveCases">
        <p className="active-heading">Active</p>
        <img
          src="https://res.cloudinary.com/dtx7jtwd5/image/upload/v1639896805/protection_1_p5fjgb.png"
          alt="country wide active cases pic"
        />
        <p className="active-count">{activeCount}</p>
      </div>

      <div className="confirmed-card" testid="countryWideRecoveredCases">
        <p className="recovered-heading">Recovered</p>
        <img
          src="https://res.cloudinary.com/dtx7jtwd5/image/upload/v1639896791/Vector_fo1blw.png"
          alt="country wide recovered cases pic"
        />
        <p className="recovered-count">{recoveredCount}</p>
      </div>

      <div className="confirmed-card" testid="countryWideDeceasedCases">
        <p className="deceased-heading">Deceased</p>
        <img
          src="https://res.cloudinary.com/dtx7jtwd5/image/upload/v1639896767/Outline_lobfek.png"
          alt="country wide deceased cases pic"
        />
        <p className="deceased-count">{deceasedCount}</p>
      </div>
    </>
  )
}

export default Counter
