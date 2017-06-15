import React from 'react';
import PageLayoutt from './PageLayoutt'
import { BrowserRouter } from 'react-router-dom'
class App extends React.Component{
  render(){
    return (
      <div>
        <BrowserRouter>
          <PageLayoutt/>
        </BrowserRouter>
      </div>
    )
  }
}
export default App
