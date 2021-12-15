import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

function Container(props) {
  return <div style={{ position: 'absolute', inset: 0 }} {...props} />
}

ReactDOM.render(
  <Container>
    <App />
  </Container>,
  document.getElementById('root')
)
