import React from 'react'
import MessagesBoxContainer from '../../container/MessageBoxContainer'
import HeaderContainer from '../../container/HeaderContainer'
import FooterContainer from '../../container/FooterContainer'

class ChatScreen extends React.Component {
  constructor () {
		super()
		this.state = {
		  newMessage: ''
		}
	  }
	getNewMessage (newMessage) {
		console.log('newMessage::', newMessage)
		this.setState({ newMessage })
	  }
  render () {
    return (
      
      <div className='chat-screen' >
        <HeaderContainer />
        <MessagesBoxContainer newMessage={this.state.newMessage} />
        <FooterContainer  getNewMessage={(newMessage) => this.getNewMessage(newMessage)}/>
      </div>
      
    )
  }
}

export default ChatScreen