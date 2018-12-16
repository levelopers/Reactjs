import React, { Component } from 'react'
import { connect } from 'react-redux';

 class Answers extends Component {
   constructor(props){
     super(props)
     this.state={
       local_answers:null
     }

     this.question_id=this.props.match.params.ques_id

   }
   componentDidMount(){
     console.log(this.props.answers);
     
   const local_answers= this.props.answers.filter(
     ans=>ans.question_id===this.question_id
     )
    this.setState({
      local_answers:local_answers
    })
  }
  render() {
    //   console.log(this.props.match.params.ques_id);
    //  console.log( this.props.answers.find(ans=>ans.question_id==1))
     console.log(this.props.answers);
     console.log(this.question_id);
    console.log(this.state);
    
    
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
