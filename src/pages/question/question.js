import React, { Component } from 'react'
import Header from '../../components/header'
import Form from '../../components/form'
import styles from './stylesheets/question.module.sass'
import { connect } from 'react-redux';
import { getQuestions } from '../../redux/actions/questionActions'
import { getAnswers } from '../../redux/actions/answersActions'
import { getProfile } from '../../redux/actions/profileActions'
import { postQuestion } from '../../redux/actions/questionActions'
class Question extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: {
        value: ''
      },
      content: {
        value: ''
      }
    }
    this.popupRef = null
  }
  componentDidMount() {
    this.props.getQuestions()
    this.props.getProfile()
  }
  componentWillUpdate() {
  }
  showPostClick = () => {
    this.popupRef.style.display = "block"
  }
  fillFormClick = (e) => {
    e.stopPropagation()
  }
  submitPostClick = (e) => {
    this.cancelModal()
    this.props.postQuestion()

  }
  cancelModal = () => {
    this.popupRef.style.display = "none"
  }
  handleContentChange=(e)=>{
    this.setState({
      ...this.state,
      content:{
        value:e.target.value
      }
    })
  }
  handleTitleChange=(e)=>{
    this.setState({
      ...this.state,
      title:{
        value:e.target.value
      }
    })
  }


  render() {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <Header img={this.props.user.avatar_url} />
          {/* <button onClick={e => { localStorage.clear(); this.props.history.push('/login') }}>logout</button> */}
        </div>
        <div className={styles.btn}>
          <button onClick={this.showPostClick}>button</button>
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
                  <div key={ans.answers[0].id} className={styles.answer}>
                    {ans.answers[0].content}
                  </div>
                  // )
                  :
                  <div
                    key={ans.question_id}
                    className={styles.blank}>

                  </div>
              )}
            </div>
          )}
          {/* {this.props.answers&&
          <MapQA questions={this.props.questions} answers={this.props.answers}/>
          } */}
        </div>

        <div className={styles.popup_box} onClick={this.cancelModal} ref={ref => this.popupRef = ref}>
          <div className={styles.popup_content} onClick={this.fillFormClick}>
            <span>asdfasdfasdfasdfasdfasdf</span>
            <Form
              configs={[
                {
                  type: 'text',
                  placeholder: 'Title',
                  handleChange: this.handleTitleChange,
                  value:this.state.title.value
                },
                {
                  type: 'textArea',
                  placeholder: 'Content',
                  cols: 20,
                  handleChange: this.handleContentChange,
                  value:this.state.content.value
                }
              ]}
              handleButton={this.submitPostClick}
              button={'Ask'}
              styles={styles} />
          </div>
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
  user: state.profile.user,
  postQuestionStatus: state.questions.postStatus
})
export default connect(mapStatetoProps, { getProfile, getQuestions, postQuestion, getAnswers })(Question)
