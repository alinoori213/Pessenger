import { connect } from 'react-redux'

import ConversationList from '../component/conversation/ConversationList'

const mapDispatchToProps = dispatch => ({
    dispatch: dispatch
})


const mapStateToProps = state => {
    return {
        ConversationList: state.ConversationList
    }
}


export default connect(mapStateToProps)(ConversationList)