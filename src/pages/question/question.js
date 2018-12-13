import React, { Component } from 'react'
import axios from 'axios'
import Header from '../../components/header'
import styles from './stylesheets/question.module.sass'
import { connect } from 'react-redux';
import { getQuestions } from '../../redux/actions/questionActions'

class Question extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getQuestions()
  }
  componentDidUpdate(){
    console.log(this.props.questions);
  }
 
  render() {
    return (
      <div>
        <div>
          {/* <Header img={} /> */}
          <button onClick={e=>{localStorage.clear();this.props.history.push('/login')}}>logout</button>
        </div>
        <div className={styles.outbox}>
          {this.props.questions.map(ques =>
            <div key={ques.id} className={styles.title}>
              {ques.title}
            </div>
          )}
        </div>
      </div>

    )
  }
}

const mapStatetoProps = state =>({
  questions:state.questions.questions,
  status:state.questions.status
})
export default connect(mapStatetoProps,{ getQuestions })(Question)
