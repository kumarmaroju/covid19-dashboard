import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'

import statesList from '../StateCodeList'
import Header from '../Header'
import Footer from '../Footer'
import Counter from '../Counter'
import EachTableItem from '../EachTableItem'
import StateItemDropDown from '../StateItemDropDown'

import './index.css'

class Home extends Component {
  state = {
    casesList: [],
    searchState: '',
    onProgress: false,
    sortBy: false,
  }

  componentDidMount() {
    this.getCasesDetails()
  }

  getCasesDetails = async () => {
    this.setState({onProgress: true})
    const {sortBy} = this.state
    const casesUrl = `https://apis.ccbp.in/covid19-state-wise-data?state_code=${sortBy}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(casesUrl, options)
    const data = await response.json()

    const listFormattedDataUsingForInMethod = this.convertObjectsDataIntoListItemsUsingForInMethod(
      data,
    )

    this.setState({
      casesList: listFormattedDataUsingForInMethod,
      onProgress: false,
    })
  }

  convertObjectsDataIntoListItemsUsingForInMethod = data => {
    const resultList = []
    const keyNames = Object.keys(data)
    keyNames.forEach(keyName => {
      if (data[keyName] && keyName !== 'TT') {
        const {total} = data[keyName]
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = data[keyName].meta.population
          ? data[keyName].meta.population
          : 0
        resultList.push({
          stateCode: keyName,
          name: statesList.find(state => state.state_code === keyName)
            .state_name,
          confirmed,
          deceased,
          recovered,
          tested,
          population,
          active: confirmed - (deceased + recovered),
        })
      }
    })
    return resultList
  }

  onChangeSearchInput = event => {
    this.setState({searchState: event.target.value})
  }

  getRenderSearchInputView = () => {
    const {searchState} = this.state
    return (
      <div className="icon-search-container">
        <BsSearch size={14} color="#94A3B8" />
        <input
          className="input-styles"
          type="search"
          placeholder="Enter the State"
          onChange={this.onChangeSearchInput}
          value={searchState}
        />
      </div>
    )
  }

  getRenderAsc = (a, b) => a.name.localeCompare(b.name)

  getRenderDesc = (a, b) => b.name.localeCompare(a.name)

  onAscendingOrder = () => {
    const {casesList} = this.state
    const ascOrder = casesList.sort(this.getRenderAsc)
    this.setState({casesList: ascOrder})
  }

  onDescendingOrder = () => {
    const {casesList} = this.state
    const descOrder = casesList.sort(this.getRenderDesc)
    this.setState({casesList: descOrder})
  }

  getRenderStateTable = () => {
    const {casesList} = this.state

    return (
      <div className="table" testid="stateWiseCovidDataTable">
        <div className="table-main-container">
          <div className="table-content-container">
            <div className="states-name-container">
              <h1 className="table-heading">States/UT</h1>
              <div className="asc-desc-container">
                <button
                  testid="ascendingSort"
                  type="button"
                  className="btn-styles"
                  onClick={this.onAscendingOrder}
                >
                  <FcGenericSortingAsc color="#94A3B8" size={20} />
                </button>
                <button
                  testid="descendingSort"
                  type="button"
                  className="btn-styles"
                  onClick={this.onDescendingOrder}
                >
                  <FcGenericSortingDesc color="#94A3B8" size={20} />
                </button>
              </div>
            </div>
            <p className="table-heading">Confirmed</p>
            <p className="table-heading">Active</p>
            <p className="table-heading">Recovered</p>
            <p className="table-heading">Deceased</p>
            <p className="table-heading">Population</p>
          </div>
          <ul className="table-ul-container">
            {casesList.map(eachItem => (
              <EachTableItem itemDetails={eachItem} key={eachItem.stateCode} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  getRenderCasesView = () => {
    const {casesList} = this.state
    return (
      <>
        <div className="cases-count-ul-container">
          <Counter casesDetails={casesList} />
        </div>
        {this.getRenderStateTable()}
      </>
    )
  }

  getRenderDropDown = () => {
    const {casesList, searchState} = this.state
    const searchResult = casesList.filter(each =>
      each.name.toLowerCase().includes(searchState.toLowerCase()),
    )
    return (
      <ul className="drop-down-container" testid="searchResultsUnorderedList">
        {searchResult.map(eachOne => (
          <StateItemDropDown itemDetails={eachOne} key={eachOne.stateCode} />
        ))}
      </ul>
    )
  }

  getRenderLoaderView = () => (
    <div testid="homeRouteLoader" className="loader-container">
      <Loader type="ThreeDots" color="#007bff" height={50} width={50} />
    </div>
  )

  render() {
    const {searchState, onProgress} = this.state
    const isEmpty = searchState.length === 0
    const {match} = this.props
    const {path} = match

    return (
      <>
        <Header path={path} />
        <div className="home-main-container">
          {onProgress ? (
            this.getRenderLoaderView()
          ) : (
            <>
              {this.getRenderSearchInputView()}
              {isEmpty ? this.getRenderCasesView() : this.getRenderDropDown()}
            </>
          )}
        </div>
        <Footer />
      </>
    )
  }
}
export default Home
