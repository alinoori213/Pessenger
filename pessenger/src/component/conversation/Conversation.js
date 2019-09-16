import React from 'react'
import axios from 'axios'
import {openConversationScreen} from '../../action/conversation'




class Conversation extends React.Component {
  constructor (props) {
		super(props)
		this.state = {
			token: window.localStorage.getItem('token')
			}
	  }

	startChat() {
    console.log('id',this.props.conversationId)
		let newDate =  Math.ceil(new Date().getTime() / 1000)
		let chatData = new FormData()
		chatData.append('token', this.state.token )
		chatData.append('conversation_id', this.props.conversationId)
		chatData.append('size', 10)
		chatData.append('date', newDate)
    axios.post('https://api.paywith.click/conversation/details/', chatData)
		  
		.then((response) => {
			console.log('startChat::',response);
			this.props.dispatch(openConversationScreen(
				this.props.email,
				response.data.data.messages,
				this.props.avatar,
				this.props.conversationId))
		  })

		.catch((error) => {
			console.log('error::::',error);
		  });
	}
  render () {
    console.log('id',this.props.email)
    return (
      <div className='conversation' onClick={()=>{this.startChat()}
      }>
          <div className='profilepic'>
          <img className = "Pic"src = { this.props.avatar }/>
          </div>
          <div className='contactBox'>
            <div className='contactItems'>
            <span>{this.props.email}</span>
            <span>{this.props.date.slice(0,10)}</span>
            </div>
          <div className='unseen'>
            <span className='unseen'>{this.props.latestMessage}</span>
            </div>
        </div>
		
        </div>
        
      
    )
  }
}
export default Conversation