import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'

import Header from '../Header'
import Footer from '../Footer'
import AboutListItems from '../AboutListItems'

class About extends Component {
  state = {faqDetails: [], onProgress: false}

  componentDidMount() {
    this.getFaqDetails()
  }

  getFaqDetails = async () => {
    this.setState({onProgress: true})
    const url = 'https://apis.ccbp.in/covid19-faqs'
    const response = await fetch(url)
    const fetchedData = await response.json()

    if (response.ok) {
      this.setState({faqDetails: fetchedData.faq, onProgress: false})
    }
  }

  getRenderSuccessView = () => {
    const {faqDetails} = this.state

    return (
      <>
        <div className="about-container">
          <h1 className="about-heading">About</h1>
          <p className="last-updates">Last update on November 1th 2021.</p>
          <p className="qa-paragraph">
            COVID-19 vaccines ready for distribution
          </p>
          <ul className="about-ul-container" testid="faqsUnorderedList">
            {faqDetails.map(eachFaq => (
              <AboutListItems
                aboutListItemDetails={eachFaq}
                key={eachFaq.qno}
              />
            ))}
          </ul>
        </div>
      </>
    )
  }

  getRenderLoaderView = () => (
    <div className="loader-container" testid="aboutRouteLoader">
      <Loader type="ThreeDots" color="#007bff" height={50} width={50} />
    </div>
  )

  render() {
    const {onProgress} = this.state
    const {match} = this.props
    const {path} = match
    return (
      <div>
        <Header path={path} />
        {onProgress ? this.getRenderLoaderView() : this.getRenderSuccessView()}
        <Footer />
      </div>
    )
  }
}

export default About
