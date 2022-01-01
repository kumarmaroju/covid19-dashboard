import './index.css'

const CasesTotalCount = props => {
  const {totalCount, changeTabId, tabId} = props
  const totals = totalCount.total ? totalCount.total : ''
  const {confirmed, deceased, recovered} = totals
  const active = confirmed - (deceased + recovered)

  const confirmedStyles = tabId === 'confirmed' ? 'confirmed-tab-styles' : ''

  const activeStyles = tabId === 'active' ? 'active-tab-styles' : ''

  const recoveredStyles = tabId === 'recovered' ? 'recovered-tab-styles' : ''

  const deceasedStyles = tabId === 'deceased' ? 'deceased-tab-styles' : ''

  const onChangeValue = value => {
    changeTabId(value)
  }

  const changeConfirmedTab = () => {
    onChangeValue('confirmed')
  }

  const changeActiveTab = () => {
    onChangeValue('active')
  }

  const changeRecoveredTab = () => {
    onChangeValue('recovered')
  }

  const changeDeceasedTab = () => {
    onChangeValue('deceased')
  }

  return (
    <div className="cases-counts-ul-containers">
      <button type="button" className="btn-styles" onClick={changeConfirmedTab}>
        <div
          className={`specific-confirmed-card confirmed ${confirmedStyles}`}
          testid="stateSpecificConfirmedCasesContainer"
        >
          <p className="specific-confirmed-heading">Confirmed</p>
          <img
            src="https://res.cloudinary.com/dtx7jtwd5/image/upload/v1639895561/Group_1_frmvcn.png"
            alt="state specific confirmed cases pic"
          />
          <p className="specific-confirmed-count">{confirmed}</p>
        </div>
      </button>

      <button type="button" className="btn-styles" onClick={changeActiveTab}>
        <div
          className={`specific-confirmed-card active ${activeStyles}`}
          testid="stateSpecificActiveCasesContainer"
        >
          <p className="specific-active-heading">Active</p>
          <img
            src="https://res.cloudinary.com/dtx7jtwd5/image/upload/v1639896805/protection_1_p5fjgb.png"
            alt="state specific active cases pic"
          />
          <p className="specific-active-count">{active}</p>
        </div>
      </button>

      <button type="button" className="btn-styles" onClick={changeRecoveredTab}>
        <div
          className={`specific-confirmed-card recovered ${recoveredStyles}`}
          testid="stateSpecificRecoveredCasesContainer"
        >
          <p className="recovered-heading">Recovered</p>
          <img
            src="https://res.cloudinary.com/dtx7jtwd5/image/upload/v1639896791/Vector_fo1blw.png"
            alt="state specific recovered cases pic"
          />
          <p className="specific-recovered-count">{recovered}</p>
        </div>
      </button>

      <button type="button" className="btn-styles" onClick={changeDeceasedTab}>
        <div
          className={`specific-confirmed-card deceased ${deceasedStyles}`}
          testid="stateSpecificDeceasedCasesContainer"
        >
          <p className="specific-deceased-heading">Deceased</p>
          <img
            src="https://res.cloudinary.com/dtx7jtwd5/image/upload/v1639896767/Outline_lobfek.png"
            alt="state specific deceased cases pic"
          />
          <p className="specific-deceased-count">{deceased}</p>
        </div>
      </button>
    </div>
  )
}
export default CasesTotalCount
