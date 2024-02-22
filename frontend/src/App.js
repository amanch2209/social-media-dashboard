import axios from 'axios';
import React from 'react';

class App extends React.Component {
  state = {details : [], }
  componentDidMount(){
    let data;
    axios.get('http://localhost:8000')
    .then(res=>{
      data = res.data;
      this.setState({
        details : data
      });
    })
    .catch(err=>{    })
  }

  render(){
    return(
      <div>
        <h1>Social Media Dashboard</h1>
        <hr></hr>
        {this.state.details.map((output, id)=>(
          <div key={id}> 
            <div>
              <h2>Employee : {output.employee}</h2>
              <h2>Department : {output.department}</h2>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default App;