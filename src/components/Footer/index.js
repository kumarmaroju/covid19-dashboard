import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <h1 className="logo-name">
      COVID19<span className="india-styles">INDIA</span>
    </h1>
    <p className="footer-description">
      we stand with everyone fighting on the front lines
    </p>
    <div className="contact-icons-container">
      <VscGithubAlt color="#CBD5E1" size={40} />
      <FiInstagram color="#CBD5E1" size={40} />
      <FaTwitter color="#CBD5E1" size={40} />
    </div>
  </div>
)
export default Footer
