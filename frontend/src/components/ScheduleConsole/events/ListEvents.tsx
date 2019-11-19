import React from 'react'
import {connect} from "react-redux"
import {Events, MainState} from "../../../interfaces";
import {Dispatch} from "redux";
import {Redirect} from "react-router";
import Event from './Event';
import styles from './ListEvents.module.scss'


class ListEvents extends React.Component<{ events: Events, loggedIn: boolean, dispatch: Dispatch }> {
    render() {
        return !this.props.loggedIn ?
            <Redirect to={'/'}/> :
            <div>
                <h3 className={styles.title}>Events</h3>
                <ul>
                    {
                        Object.values(this.props.events).map(val =>
                            <li key={val.id}><Event id={val.id} name={val.name} duration={val.duration}
                                                    startTime={val.startTime}/>
                            </li>
                        )
                    }
                </ul>
            </div>
    }

}

const mapStateToProps = (state: MainState) => {
    return {events: state.events, loggedIn: state.loggedIn}
}

export default connect(mapStateToProps)(ListEvents)
