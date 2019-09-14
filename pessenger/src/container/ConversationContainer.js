import { connect } from 'react-redux'
import Conversation from '../component/conversation/Conversation'

const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch
})
const mapStateToProps = state => {
    return {
        Conversation: state.Conversation
    }
}
const ConversationContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Conversation)


export default ConversationContainer