import React from 'react'
import ConversationList from './ConversationList'
import ChatScreen from './ChatScreen'

class Messenger extends React.Component {
  render () {
    return (
      <div className='mainBody'>
      <div className='chat'>
        <ConversationList />
        <ChatScreen />
      </div>
      </div>
    )
  }
}

export default Messenger