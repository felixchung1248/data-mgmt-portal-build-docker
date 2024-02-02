// SimpleForm.js
import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import FetchMessage from './FetchMessage'; // Import FetchMessage component

class SimpleForm extends Component {
  render() {
    return (
      <ChatBot width="100%" bubbleStyle={{ fontSize: '15px'}} 
        steps={[
          {
            id: '1',
            message: 'Hi sir, you can ask any question about the data platform',
            trigger: 'question',
          },
          {
            id: 'question',
            user: true,
            trigger: 'fetch-message',
          },
          {
            id: 'fetch-message',
            component: <FetchMessage step="question" />,
            waitAction: true,
            asMessage: true,
            // trigger: 'display-fetched-message',
            trigger: 'question',
          },
          // {
          //   id: 'display-fetched-message',
          //   message: ({ previousValue }) => previousValue,
          //   trigger: 'question', // The id of your next step
          // },
        ]}
      />
    );
  }
}

export default SimpleForm;