import React from 'react';
import LanguageService from '../../services/language-api-service';
import LanguageContext from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import './DashboardRoute.css';


class DashboardRoute extends React.Component {
  
  static contextType = LanguageContext;

  componentDidMount() {
    LanguageService.getLang().then(res => {
      this.context.setLanguage(res.language);
      this.context.setWords(res.words);
    });
  }

  render() {
    let language = this.context.language.name || 'Spanish';
    let totalScore = this.context.language.total_score || 0;
    let words = this.context.words || [];

    let list = words.map((word) => {
      return (
        <li className='listItem' key={word.id}>
          <div className='word'>
            <h3>{word.original}</h3>
          </div>

          <div className='scores'>
            <div className='incorrect'>
              <p data-count={word.incorrect_count}>
                incorrect: {word.incorrect_count}
              </p>
            </div>

            <div className='correct'>
              <p data-count={word.correct_count}>
                correct: {word.correct_count}
              </p>
            </div>
          </div>
        </li>
      );
    });

    return (
      <section className='dashboard'>
        <h2 className='language'>{language}</h2>

        <Button type='submit' className='learn-button'>
          <Link to='/learn'>
            Let's Learn
          </Link>
        </Button>

        <div className='dashboard-header'>
          <h3 className='total-score'>Total Score: {totalScore}</h3>
          <h3>Practice These Words</h3>
        </div>

        <div className='wordlist'>{list}</div>
      </section>
    );
  }
}

export default DashboardRoute;