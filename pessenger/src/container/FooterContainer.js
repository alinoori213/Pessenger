import { connect } from 'react-redux'
import Footer from '../component/conversation/Footer'

const mapDispatchToProps = dispatch => ({
    dispatch: dispatch
})

const mapStateToProps = state => ({
    conversationId: state.conversationId

})

const FooterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer)

export default FooterContainer