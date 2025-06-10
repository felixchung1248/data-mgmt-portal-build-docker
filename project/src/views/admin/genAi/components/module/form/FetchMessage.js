// FetchMessage.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import config from 'config'

class FetchMessage extends Component {
  state = {
    loading: true,
    message: null,
    error: false,
  };

  componentDidMount() {
    this.fetchMessageFromAPI();
  }

  fetchMessageFromAPI = async () => {
    const { steps, triggerNextStep } = this.props;
    const userResponse = steps.question.value;
    try {
      // Update this payload as necessary for your specific API requirements
      const payload = {
        msg: userResponse,
        // Include other properties from the step or user input if needed
      };

      const response = await fetch(`http://${config.genAiHost}/genai-response`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include other headers like authorization if required
        },
        body: JSON.stringify(payload),
      });

      const data = await response.text();
      const newData = data.split('\n').map(str => <p>{str}</p>)
      this.setState({ loading: false, message: newData });
      triggerNextStep();
    } catch (error) {
      console.error('API call failed: ', error);
      this.setState({ loading: false, error: true });
      triggerNextStep();
    }
  }

  render() {
    const { loading, message, error } = this.state;

    if (loading) {
      return <Loading />;
    }

    if (error) {
      return 'Sorry, I cannot process your request right now.';
    }

    return message;
  }
}

FetchMessage.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

export default FetchMessage;