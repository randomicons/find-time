import React, {SyntheticEvent} from 'react'
import {connect} from "react-redux";
import {Redirect} from "react-router";
import {MainState} from "../interfaces";
import {Dispatch} from "redux";
import {createUser, login} from "../actions/users";
import styles from './Login.module.scss'

class Login extends React.Component<{ dispatch: Dispatch, loggedIn: boolean }, { email: string, password: string }> {

    validateFields = () => {
        // const re = /\S+@\S+\.\S+/
        // return this.state.email && re.test(this.state.email) && this.state.password
        return this.state.email && this.state.password
    }

    submit = (event: SyntheticEvent) => {
        if (this.validateFields()) {
            this.props.dispatch<any>(createUser(this.state.email, this.state.password))
        }
        event.preventDefault()
    }

    login = (event: SyntheticEvent) => {
        this.props.dispatch<any>(login(this.state.email, this.state.password))
        event.preventDefault()
    }

    render() {
        return this.props.loggedIn ? <Redirect to={'/tasks'}/> :
            <div className={styles.container}>
                <h2>Login</h2>
                <form className={styles.form} onSubmit={this.submit}>
                    <label>Email
                        <input type='text' onChange={(e) => this.setState({email: e.currentTarget.value})}/>
                    </label>
                    <label>
                        Password
                        <input type='password' onChange={(e) => this.setState({password: e.currentTarget.value})}/>
                    </label>
                    <br/>
                    <button onClick={this.submit} type='button'> Sign up</button>
                    <button onClick={this.login} type='button'> Login</button>
                </form>
            </div>
    }
}

export default connect((state: MainState) => {
    return {loggedIn: state.loggedIn}
})(Login)
