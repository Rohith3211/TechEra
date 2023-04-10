import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <div className="nav-card">
    <Link to="/">
      <img
        className="nav-img"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
      />
      <h1>Page Not Found</h1>
      <p>We are sorry, the page you requested could not be found</p>
    </Link>
  </div>
)
export default Header
