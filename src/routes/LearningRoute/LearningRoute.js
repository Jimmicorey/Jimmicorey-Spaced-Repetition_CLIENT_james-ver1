import React from 'react';
import LanguageService from '../../services/language-api-service';
import LanguageContext from '../../contexts/LanguageContext';
import { Label, Input } from '../../components/Form';
import Button from '../../components/Button';
import './LearningRoute.css';

class LearningRoute extends React.Component {
  
  static contextType = LanguageContext;

  state = {
    renderView: true
  };

  componentDidMount() {
    this.handleNext();
    LanguageService.getLang().then(res => {
      this.context.setLanguage(res.language);
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    LanguageService.postGuess(this.context.guess).then(res => {
      this.context.setResponse(res);
      this.setState({ renderView: false });
    });
  };

  handleNext = () => {
    LanguageService.getHead().then(res => {
      this.context.setHead(res);
      this.setState({ renderView: true });
      this.context.setGuess('');
    });
  };

  
  renderGuess = () => {
    let head = this.context.head || {};
    let response = this.context.response || {};
    let language = this.context.language || {};

    return (
      <div>
        <div className='learning-header'>
          <h3 className='total-score'>
            Total score:{' '}
            {!response.totalScore ? head.totalScore : response.totalScore}
          </h3>

          <h3>Translate the following:</h3>
        </div>

        <div className='translateItem'>
          <p className='learn-word'>{!response.nextWord ? head.nextWord : response.nextWord}</p>
          
          <div className='scores'>
            <p className='incorrect'>incorrect {head.wordIncorrectCount}</p>
            <p className='correct'>correct {head.wordCorrectCount}</p>
          </div>
        </div>

        <form className='learning-guess-form' onSubmit={e => this.handleSubmit(e)}>
            <Label htmlFor='learn-guess-input' className='label'>Translation?</Label>

            <Input type='text' className='input'
              id='learn-guess-input'
              name='guess'
              value={this.context.guess || ''}
              onChange={e =>
                this.context.setGuess(language.name == null
                    ? e.target.value : language.name === 'Spanish'
                    ? e.target.value : e.target.value
                )
              }
              autoFocus
              required
            />

            <Button type='submit'>
              Submit
            </Button>
        </form>
      </div>
    );
  };


  renderFeedback = () => {
    let head = this.context.head || {};
    let response = this.context.response || {};

    return (
      <div>
        <div className='learning-header'>
          <h2 className='feedbackResponse'>
            {response.isCorrect === true ? 'CORRECT !!!' : 'SORRY, that is INCORRECT'}
          </h2>

          <p className='feedback-total-score'>Total score: {response.totalScore}</p>
        </div>

        <div className='feedbackItem'>
          <div className='scores'>
            <h3 className='incorrect'>incorrect {response.isCorrect ? head.wordIncorrectCount : head.wordIncorrectCount + 1}</h3>
            <h3 className='correct'>correct {response.isCorrect ? head.wordCorrectCount + 1 : head.wordCorrectCount}</h3>
          </div>

          <p className='learn-word'>{head.nextWord}</p>

          <p className='feedback'>
            is spanish for <span className='bold-answer'>{response.answer}{' '}</span> 
            your answer was <span className='bold-guess'>{this.context.guess}</span>
          </p>
        </div>

        <Button className='learning-feedback-button' onClick={this.handleNext} autoFocus>
          Try another..?
        </Button>
      </div>
    );
  };

  render() {
    let renderView = this.state.renderView;

    return (
      <section className='learningRoute-section'>
        {renderView ? this.renderGuess() : this.renderFeedback()}
      </section>
    );
  }
}

export default LearningRoute;