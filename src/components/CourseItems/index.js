import {Link} from 'react-router-dom'
import './index.css'

const CourseItems = props => {
  const {details} = props
  const {id, logUrl, name} = details
  return (
    <Link to={`courses/${id}`}>
      <li className="c-card">
        <img src={logUrl} alt={name} />
        <p className="text">{name}</p>
      </li>
    </Link>
  )
}

export default CourseItems
