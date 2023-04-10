/* eslint-disable react/button-has-type */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CourseItems from '../CourseItems'
import './index.css'

const statusText = {
  success: 'SUCCESS',
  initial: 'INITIAL',
  fail: 'FAIL',
}
class Home extends Component {
  state = {list: [], status: statusText.initial}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const url = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()

      const updated = data.courses.map(eachC => ({
        id: eachC.id,
        logoUrl: eachC.logo_url,
        name: eachC.name,
      }))
      this.setState({list: updated, status: statusText.success})
    } else {
      this.setState({status: statusText.fail})
    }
  }

  getRequest = () => {
    this.getDetails()
  }

  successResponse = () => {
    const {list} = this.state
    return (
      <div>
        <Header />
        <div className="lower-card">
          <h1>Courses</h1>
          <ul className="list-card">
            {list.map(eachItem => (
              <CourseItems details={eachItem} key={eachItem.id} />
            ))}
          </ul>
        </div>
      </div>
    )
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
    const {list} = this.state
    console.log(list)
    return <div>{this.callingFunction()}</div>
  }
}

export default Home
