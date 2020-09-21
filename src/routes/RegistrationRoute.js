import React from 'react';
import RegistrationForm from '../components/RegistrationForm/RegistrationForm';

class RegistrationRoute extends React.Component {

  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  handleRegistrationSuccess = () => {
    const { history } = this.props
    history.push('/login')
  }

  render() {
    return (
      <section className='registration'>
        <p>
          Practice learning a language with the spaced reptition revision technique.
        </p>

        <h2>Sign up</h2>
        
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </section>
    );
  }
}

export default RegistrationRoute;