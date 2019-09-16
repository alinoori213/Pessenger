import React from 'react'
import ConversationContainer from '../../container/ConversationContainer'
import { connect } from 'react-redux'
import { createNewConversation } from '../../action/conversation'
import { saveConversationList } from '../../action/conversation'
import axios from 'axios'




class ConversationList extends React.Component {
  constructor () {
    super()

    this.state = {
      newConv: '',
      suggestionUsers: [],
      token: window.localStorage.getItem('token')
    }
  }
  componentDidMount() {
    this.handleRequest()
    this.update=setInterval(() => {
      let newDate =  Math.ceil(new Date().getTime() / 1000)
      let fdata = new FormData()
      fdata.append('token',this.state.token)
      fdata.append('date',newDate)
      axios.post('https://api.paywith.click/conversation/update/',fdata)
      .then((response) => {
        console.log(' last seen response',response)
      })
      .catch((error) => {
        console.log(' last seen error::::',error);
        });
    
    }, 5000);
	}

	handleRequest = () => {
		const token = window.localStorage.getItem('token')
		axios.get('https://api.paywith.click/conversation/',{
			params: {
				token : token
					}
				})
		.then(response =>  {
      console.log('response::',response.data.data.conversation_details)
			this.props.dispatch(saveConversationList(response.data.data.conversation_details))
		})
		.catch(error => {
			console.log('error::::',error);
		})
	}

  handleNewConv (e) {
    this.setState({ newConv: e.target.value })
  }

  handleClick () {
    this.props.dispatch(createNewConversation(this.state.newConv))
    this.setState({ newConv: '' })
  }
  handleSearch (e) {
    let fdata = new FormData()
    fdata.append('token', this.state.token)
    fdata.append('query', e.target.value)
    fdata.append('size', 4)

    axios.post('https://api.paywith.click/explore/search/contacts/', fdata)
      .then((response) => {
        console.log('data:', response.data)
        this.setState({ suggestionUsers: response.data.data.users })
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  openChat(user){

		let fdata = new FormData()
		fdata.append('token',  this.state.token)
		fdata.append('user_id', user.id)
		
		axios.post('https://api.paywith.click/conversation/', fdata)
		  .then((response) => {
			console.log('OpenChatResponse::',response);
		  })
		  .catch((error) => {
			console.log('error::::',error);
		  });
  }
  /*setProfile(){
    let fdata= new FormData()
    fdata.append('token',  this.state.token)
		fdata.append('description, this.user.id)
  }*/
  // componentDidMount(){
  //   this.update=setInterval(() => {
  //     let newDate =  Math.ceil(new Date().getTime() / 1000)
  //     let fdata = new FormData()
  //     fdata.append('token',this.state.token)
  //     fdata.append('date',newDate)
  //     axios.post('https://api.paywith.click/conversation/update/',fdata)
  //     .then((response) => {
  //       console.log(' last seen response',response)
  //     })
  //     .catch((error) => {
  //       console.log(' last seen error::::',error);
  //       });
    
  //   }, 5000);
  // }
  componentWillUnmount(){
    clearInterval(this.update)
  }
  
  render () {
    console.log('conversationlist props', this.props)
    return (
      <div className='mainconv'>
      <div className='conversation-list'>
        <div className='searchInput'>
          
          <input
          className='lsinput'
          placeholder='Search a user'
            type='text'
            name='newConv'
            onChange={(e) => this.handleSearch(e)}
          />
          
          {
            this.state.suggestionUsers.map((user, index) => {
              return (
                <p key={user.id}
                onClick = { ()=>{this.openChat(user)} }
                >
                  {user.email}
                </p>
              )
            })
          }
        </div>
        <div className='contacts'>
        { this.props.conversationList.map((item) => (
          item.users.map(user => {
            if(user.id.toString()!== window.localStorage.getItem('id')){
            return(
              <ConversationContainer
            email={user.email}
            key={user.id}
            conversationId={item.id}
            name={user.first_name}
            lastName={user.last_name}
            latestMessage={item.latest_message}
            unseenMessage={item.unseen_message} 
            avatar={user.avatar_url}
            date={item.latest_message_date}
            />
            )
          }else return null
          }
        ) 
        )
        )
        }
      
        </div>
        
      </div>
      
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  conversationList: state.conversationList
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(ConversationList)
