import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dtx7jtwd5/image/upload/v1640544360/Group_7484_1_zfwuqg.png"
      alt="not-found-pic"
      className="not-found-image"
    />
    <h1 className="not-found-heading">PAGE NOT FOUND</h1>
    <p className="not-found-paragraph">
      we are sorry, the page you requested could not be found please go back to
      the home page
    </p>
    <Link to="/">
      <button className="not-found-home-btn" type="button">
        Home
      </button>
    </Link>
  </div>
)
export default NotFound
