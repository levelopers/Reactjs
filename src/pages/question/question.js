import React, { Component } from 'react'
import axios from 'axios'
import Header from '../../components/header'
import styles from './stylesheets/question.module.sass'
import { connect } from 'react-redux';
import { getQuestions } from '../../redux/actions/questionActions'
import { getAnswer } from '../../redux/actions/answerActions'
import { getAnswers } from '../../redux/actions/answersActions'
import { getProfile } from '../../redux/actions/profileActions'
class Question extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getQuestions()
    this.props.getProfile()
  }
  componentWillUpdate() {
  }

  render() {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <Header img={this.props.user.avatar_url} />
          <button onClick={e => { localStorage.clear(); this.props.history.push('/login') }}>logout</button>
        </div>
        <div className={styles.outbox}>
          {this.props.questions && this.props.questions.map(ques =>
            <div key={ques.id} className={styles.paragraph}>
              <div className={styles.title}>
                {ques.title}
              </div>
              {this.props.answers && this.props.answers.map(ans =>
                ans.question_id === ques.id ?
                  // ans.answers.map(ans =>
                    <div key={ans.id} className={styles.answer}>
                      {ans.answers[0].content}
                    </div>
                  // )
                  :
                  <div className={styles.blank}>
                  </div>
              )}
            </div>
          )}
          {/* {this.props.answers&&
          <MapQA questions={this.props.questions} answers={this.props.answers}/>
          } */}
        </div>
      </div>

    )
  }
}
// function MapQA({questions,answers}) {
//   console.log(questions);



//   for (let question of questions) {
//     let ques_id = question.id
//     let ques_title = question.title

//     for (let ans of answers) {
//       console.log(ans.question_id,ques_id);

//       if (ans.question_id === ques_id) {
//         return (
//           <div key={ques_id}>
//           <div>===================</div>
//           <div>******</div>
//             {ques_title}
//             <div>*********</div>
//             {ans.answers.map(ans => 
//               <div key={ans.id}>
//             <div>!!!!!!!!!!!</div>

//                 {ans.content}
//               <div>!!!!!!!!!!!!!!</div>

//               </div>
//             )}
//             <div>===================</div>
//           </div>
//         )
//       }

//     }
//     return null
//   }
//   return null

// }

const mapStatetoProps = state => ({
  answers: state.answers.answers,
  questions: state.questions.questions,
  status: state.questions.status,
  answer: state.answers.answer,
  questions_isLoading: state.questions.loading,
  user: state.profile.user
})
export default connect(mapStatetoProps, { getProfile, getQuestions, getAnswer, getAnswers })(Question)
