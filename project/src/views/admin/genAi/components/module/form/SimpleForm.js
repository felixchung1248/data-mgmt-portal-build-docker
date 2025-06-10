// SimpleForm.js
import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import FetchMessage from './FetchMessage'; // Import FetchMessage component
import { ThemeProvider } from 'styled-components';

const theme = {
  background: '#f5f8fb',
  fontFamily: 'DM Sans',
  headerBgColor: '#2D3748',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#2D3748',
  botFontColor: '#fff',
  userBubbleColor: '#2D3748',
  userFontColor: '#fff',
};

class SimpleForm extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    );
  }
}

export default SimpleForm;