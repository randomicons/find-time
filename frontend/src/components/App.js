import React from 'react'
import './App.css'
import {BrowserRouter as Router, Route} from "react-router-dom"
import AddTask from "./AddTask"
import ListTasks from "./ListTasks"
import Schedule from "./Schedule"

function App() {
  return (
    <Router>
      <div>
        <ListTasks/>
        <Schedule/>
        {/*<Route exact path="/" component={AddTask}/>*/}
      </div>
    </Router>
  )
}

export default App
