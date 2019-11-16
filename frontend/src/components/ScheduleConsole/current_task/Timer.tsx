import React from 'react'

export default class Timer extends React.Component<{ maxTime: number, onDone: Function }, { lapsed: number, loaded: boolean }> {
    constructor(props: any) {
        super(props)
        this.state = {
            lapsed: 0,
            loaded: false
        }
    }

    timer: NodeJS.Timeout | null = null

    componentDidMount() {
        this.timer = setInterval(this.timerFunc, 1000)
        this.setState({loaded: true})
    }

    componentWillUnmount(): void {
        console.log(this.timer + "dismount");
        clearInterval(this.timer!)
        // this.setState({timerOn: false, timer: -1, curTime: 0})
    }

    timerFunc = () => {
        if (this.props.maxTime <= this.state.lapsed) {
            this.props.onDone()
        } else {
            this.setState((state) => ({lapsed: state.lapsed + 1}))
        }
    }

    toggleTimer = () => {
        if (this.timer) {
            clearInterval(this.timer)
            this.timer = null
        } else
            this.timer = setInterval(this.timerFunc, 1000)
    }


    percentDone = () => (this.state.lapsed / this.props.maxTime) * 100

    render() {
        return <div
            style={{
                background: `linear-gradient(90deg, rgb(227, 248, 248) ${this.percentDone()}%, rgb(252, 228, 232) ${this.percentDone()}%)`,
                width: "100px",
                height: "100px"
            }}>
            {this.props.children}
            {this.state.loaded && <button onClick={this.toggleTimer}>{this.timer ? "Pause" : "Play"}</button>}
            <button onClick={() => this.props.onDone()}>Stop</button>
        </div>
    }
}