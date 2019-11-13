import React from 'react'

export default class Timer extends React.Component<{ maxTime: number, onDone: Function }, { timerOn: boolean, curTime: number, timer: number }> {
    constructor(props: any) {
        super(props)
        this.state = {
            timerOn: true,
            curTime: 0,
            timer: setInterval(this.timerFunc, 1000)
        }
    }

    timerFunc = (handler: NodeJS.Timeout) => {
        if (this.props.maxTime <= this.state.curTime) {
            this.props.onDone()
            clearInterval(handler)
            this.setState({timerOn: false, timer: -1, curTime: 0})
        }
        this.setState((state) => ({curTime: state.curTime + 1}))
    }

    toggleTimer = () => {
        if (this.state.timerOn) {
            clearInterval(this.state.timer)
            this.setState({timerOn: false, timer: -1})
        } else
            this.setState({timerOn: true, timer: setInterval(this.timerFunc, 1000)})
    }


    percentDone = () => (this.state.curTime / this.props.maxTime) * 100

    render() {
        return <div onClick={this.toggleTimer}
                    style={{
                        background: `linear-gradient(90deg, rgb(227, 248, 248) ${this.percentDone()}%, rgb(252, 228, 232) ${this.percentDone()}%)`,
                        width: "100px",
                        height: "100px"
                    }}>
            {this.props.children}
        </div>
    }
}