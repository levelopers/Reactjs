import React, { Component } from 'react'
import { connect } from 'react-redux';

 class Answers extends Component {
  render() {
      console.log(this.props.match.params.id);
      
    return (
      <div>
        answers
      </div>
    )
  }
}

const mapStatetoProps=(state)=>({
    answers:state.answers.answers
})

export default connect(mapStatetoProps,null)(Answers)
