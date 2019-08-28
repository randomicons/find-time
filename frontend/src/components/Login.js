import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {DateTime} from 'luxon'

class ConnectedLogin extends React.Component {

  validateEmail = () => {
    const re = /\S+@\S+\.\S+/
    return this.state.email && re.test(this.state.email)
  }
  submit = event => {
    this.validateEmail()
    //hash password and etc
    axios.post('/users/create', {
      userId: this.state.email,
      dateCreated: DateTime.local().toISO(),
      password: this.state.password
    }).then(res => console.log(res)).then(() => this.props.history.push('/tasks'))
    event.preventDefault()
  }

  login = event => {
    axios.post('/users/login', {
      userId: this.state.email,
      password: this.state.password
    }).then(res => console.log(res)).then(() => this.props.history.push('/tasks'))
    event.preventDefault()
  }

  render() {
    return <form onSubmit={this.submit}>
      <label>Email
        <input type='text' onChange={(e) => this.setState({email: e.currentTarget.value})}/>
      </label>
      <br/>
      <label>
        Password
        <input type='password' onChange={(e) => this.setState({password: e.currentTarget.value})}/>
      </label>
      <br/>
      <input onClick={this.submit} type='button' value="Create New User"/>
      <input onClick={this.login} type='button' value="Login"/>
    </form>
  }
}

const mapStateToProps = state => {
  return {loggedIn: state.loggedIn}
}
const Login = connect(mapStateToProps)(ConnectedLogin)
export default Login
