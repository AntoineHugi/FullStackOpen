import { useState } from 'react'

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  const average = (props.good - props.bad) / total
  const positive = props.good / total * 100
  if (total === 0) {
    return (
      <tr><td>No statistics yet</td></tr>
    )
  }
  return (
    <>
      <StatisticLine value={total} text='Total' />
      <StatisticLine value={average} text='Average' />
      <StatisticLine value={positive} text='Positive' />
    </>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const StatisticLine = (props) => {
  if (props.text === 'Positive') {
    return (
      <tr>
        <td>{props.text}</td><td>{props.value}%</td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{props.text}</td><td>{props.value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => {
    setGood(good + 1)
  }
  const increaseNeutral = () => {
    setNeutral(neutral + 1)
  }
  const increaseBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>
        Give Feedback
      </h1>
      <Button handleClick={() => increaseGood()} text="Good" />
      <Button handleClick={() => increaseNeutral()} text="Neutral" />
      <Button handleClick={() => increaseBad()} text="Bad" />

      <h1>
        Statistics
      </h1>

      <table>
        <tbody>
          <StatisticLine value={good} text='Good ' />
          <StatisticLine value={neutral} text='Neutral ' />
          <StatisticLine value={bad} text='Bad ' />
          <Statistics good={good} neutral={neutral} bad={bad} />
        </tbody>
      </table>
    </div>
  )
}

export default App