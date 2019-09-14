import React from 'react'
import { editMessage } from '../../action/conversation'
import axios from 'axios'

class MessagesBox extends React.Component {
  constructor () {
    super()

    this.state = {
      
      
      myId:window.localStorage.getItem('id'),
      token:window.localStorage.getItem('token'),
      message:[],
      editMode: false,
      selectedMessage: -1,
      
    }
  }
  
  
  componentDidMount(){
    this.Interval=setInterval(() => {
      let fdata = new FormData()
      fdata.append('token',this.state.token)
      fdata.append('conversation_id',this.props.conversationId)
      axios.post('https://api.paywith.click/conversation/seen/',fdata)
      .then((response) => {
        console.log(' last seen response',response)
      })
      .catch((error) => {
        console.log(' last seen error::::',error);
        });
    
    }, 5000);
  }
  componentWillUnmount(){
    clearInterval(this.Interval)
  }
  handleEdit (e, index) {
    this.props.dispatch(editMessage(e.target.value, index))
    this.setState({ editMode: true })
  }

  render () {
    console.log('propsss:', this.props)
    return (
      <div className='messages-box'>
        {
          this.props.messages.map((item, index) => {
            if (item.sender.id == this.state.myId) {
              if (!(this.state.editMode && this.state.selectedMessage === index)) {
                return (
                  <div key={index} className='sender'  >
                    <span
                      style={{ fontSize: '10px' }}
                      onClick={() => this.setState({ editMode: true, selectedMessage: index })}
                    >edit</span>
                    <span>{item.text}</span>
                  </div>
                )
              } else {
                return (
                  <input
                    key={index}
                    value={item.text}
                    onChange={(e) => this.handleEdit(e, index)}
                    onBlur={() => this.setState({ editMode: false })}
                  />
                )
              }
            } else {
              return (
                <div key={index} className='receiver' ><span>{item.text}</span></div>
              )
            }
          })
        }
      </div>
    )
  }
}

export default MessagesBox
