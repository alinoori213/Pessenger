import { connect } from 'react-redux'
import ChatScreen from '../component/ChatScreen'


const mapDispatchToProps = dispatch => ({
    dispatch: dispatch
})

const mapStateToProps = state => {
    console.log(state)
    return {
        newMessage: state.newMessage,
        /* no need to mention reducer name if project is not that big */
        messages: state.messages,
        conversationId: state.conversationId

    }
}

const ChatScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatScreen)

export default ChatScreenContainer