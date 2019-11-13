import React from "react";
import {STask, TimerStates} from "../../../interfaces";
import {connect} from "react-redux";
import Timer from "./Timer";

class CurrentTaskPanel extends React.Component<{ task: STask, workTime: number, breakTime: number },
    { curTimeSpent: number, timerOn: TimerStates }> {
    state = {
        curTimeSpent: 0,
        timerOn: "none" as TimerStates
    }

    // percentDone = () => {
    //     let maxTime: number
    //     if (this.state.timerOn.break) {
    //         maxTime = this.props.breakTime
    //     } else if (this.state.timerOn.work) {
    //         maxTime = this.props.workTime
    //     } else {
    //         return 0
    //     }
    //     return this.state.curTimeSpent / maxTime
    // }

    // toggleTimer = () => {
    //     //TODO: What should happen when the break is going on and user clicks? Currently stops the break
    //     // and start the next pomo
    //     if(this.state.timerOn.work) {
    //         clearTimeout(this.state.timer)
    //     }
    //     this.setState({timerOn: {work: true, break: false}})
    //     this.setState({
    //         timer: setTimeout((handler) => {
    //             //Working timer completes
    //             if (this.state.timerOn.work && this.state.curTimeSpent >= this.props.workTime) {
    //                 this.setState({timerOn: {work: false, break: true}, curTimeSpent: 0})
    //             }//Break timer completes
    //             else if (this.state.timerOn.break && this.state.curTimeSpent >= this.props.breakTime) {
    //                 this.setState({timerOn: {work: false, break: false}, curTimeSpent: 0})
    //                 clearTimeout(handler)
    //             }
    //             this.setState((state) => ({curTimeSpent: state.curTimeSpent + 1}))
    //         }, 1000)
    //     })
    // }


    render() {
        if (this.state.timerOn === "break")
            return <Timer maxTime={this.props.workTime} onDone={() => {
                this.setState({timerOn: "none"})
            }}>
                <span>Break</span>
            </Timer>
        else if (this.state.timerOn === "work") {
            return <Timer maxTime={this.props.breakTime} onDone={() => {
                this.setState({timerOn: "break"})
            }}>
                <span>{this.props.task.name}</span>
            </Timer>
        } else {
            return <div onClick={() => {
                this.setState({timerOn: "work"})
            }}>
                <span>Start {this.props.task.name}</span>
            </div>
        }

    }
}

export default connect()(CurrentTaskPanel)