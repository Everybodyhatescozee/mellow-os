import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props){
    super(props)
    this.state = { error: null, info: null }
  }

  static getDerivedStateFromError(error){
    return { error }
  }

  componentDidCatch(error, info){
    this.setState({ error, info })
    // also log to console
    console.error('ErrorBoundary caught', error, info)
  }

  reset = () => this.setState({ error: null, info: null })

  render(){
    if(this.state.error){
      return (
        <div style={{padding:20, background:'#2b2b2b', color:'#fff'}}>
          <h3 style={{marginTop:0}}>Component error</h3>
          <div style={{fontFamily:'monospace', fontSize:12, whiteSpace:'pre-wrap'}}>
            {String(this.state.error && this.state.error.toString())}
          </div>
          <details style={{marginTop:8, color:'#ddd'}}>
            <summary style={{cursor:'pointer'}}>Stack / info</summary>
            <pre style={{whiteSpace:'pre-wrap', fontSize:12}}>{this.state.info?.componentStack}</pre>
          </details>
          <div style={{marginTop:10}}>
            <button onClick={this.reset} style={{padding:'6px 10px'}}>Reset</button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
