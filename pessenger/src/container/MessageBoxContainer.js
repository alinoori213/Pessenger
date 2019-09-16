import MessagesBox from '../component/conversation/MessagesBox'
import { connect } from 'react-redux'

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

const MessageBoxContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MessagesBox)

export default MessageBoxContainer