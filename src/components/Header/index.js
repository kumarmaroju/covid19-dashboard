import {Component} from 'react'

import {Link} from 'react-router-dom'

import {AiFillCloseCircle} from 'react-icons/ai'
import {GiHamburgerMenu} from 'react-icons/gi'

import './index.css'

class Header extends Component {
  state = {showOptions: false}

  getTrigger = () => {
    this.setState(prevState => ({showOptions: !prevState.showOptions}))
  }

  onClose = () => {
    this.setState({showOptions: false})
  }

  render() {
    const {showOptions} = this.state
    const {path} = this.props

    const homes = path === '/' ? 'selected-color' : ''
    const abouts = path === '/about' ? 'selected-color' : ''
    const vac = path === '/vaccination' ? 'selected-color' : ''
    return (
      <div>
        <nav className="header-nav-container">
          <Link to="/" className="link-styles">
            <h1 className="logo-name">
              COVID19<span className="india-styles">INDIA</span>
            </h1>
          </Link>

          <button
            type="button"
            onClick={this.getTrigger}
            className="hamburger-btn"
          >
            <GiHamburgerMenu size={30} color="#ffffff" />
          </button>

          <ul className="header-ul-container">
            <li className="list-item ">
              <Link to="/" className={`link-styles home ${homes}`}>
                Home
              </Link>
            </li>
            <li className="list-item ">
              <Link to="/vaccination" className={`link-styles home ${vac}`}>
                Vaccination
              </Link>
            </li>
            <li className="list-item">
              <Link to="/about" className={`link-styles about ${abouts}`}>
                About
              </Link>
            </li>
          </ul>
        </nav>
        {showOptions ? (
          <div className="mobile-options">
            <ul className="mobile-ul-container">
              <li className="list-item">
                <Link to="/" className={`link-styles home ${homes}`}>
                  Home
                </Link>
              </li>
              <li className="list-item ">
                <Link to="/vaccination" className={`link-styles home ${vac}`}>
                  Vaccination
                </Link>
              </li>
              <li className="list-item">
                <Link to="/about" className={`link-styles about ${abouts}`}>
                  About
                </Link>
              </li>
            </ul>
            <button className="close-btn" type="button" onClick={this.onClose}>
              <AiFillCloseCircle color="#ffffff" size={20} />
            </button>
          </div>
        ) : null}
      </div>
    )
  }
}
export default Header
