/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unused-state */
/* eslint-disable lines-between-class-members */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const statusText = {
  success: 'SUCCESS',
  initial: 'INITIAL',
  fail: 'FAIL',
}
class CourseDetails extends Component {
  state = {obj: '', status: statusText.initial}

  componentDidMount() {
    this.getApiCalls()
  }
  getApiCalls = async () => {
    const {match} = this.props

    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`

    const result = await fetch(url)
    if (result.ok === true) {
      const json = await result.json()

      const changing = {
        id: json.course_details.id,
        description: json.course_details.description,
        imageUrl: json.course_details.image_url,
        name: json.course_details.name,
      }
      console.log(changing)

      this.setState({obj: changing, status: statusText.success})
    } else {
      this.setState({status: statusText.fail})
    }
  }

  getRequest = () => {
    this.getApiCalls()
  }

  loadingResponse = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  failureResponse = () => (
    <div>
      <Header />
      <div className="lower">
        <img
          className="not"
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for.</p>
        <button onClick={this.getRequest}>Retry</button>
      </div>
    </div>
  )
  successResponse = () => {
    const {obj} = this.state
    const {description, name, imageUrl} = obj
    return (
      <div>
        <Header />
        <div className="main-card">
          <div className="s-card">
            <img className="image-s" src={imageUrl} alt={name} />
            <div className="pad">
              <h1>{name}</h1>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  callingFunction = () => {
    const {status} = this.state
    switch (status) {
      case 'SUCCESS':
        return this.successResponse()
      case 'INITIAL':
        return this.loadingResponse()
      case 'FAIL':
        return this.failureResponse()
      default:
        return null
    }
  }

  render() {
    return <div>{this.callingFunction()}</div>
  }
}

export default CourseDetails
