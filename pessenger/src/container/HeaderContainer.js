import { connect } from 'react-redux'
import Header from '../component/conversation/Header.js'

const mapDispatchToProps = dispatch => ({
    dispatch: dispatch
})

const mapStateToProps = state => ({
    user: state.user,
    avatar: state.avatar
})

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)

export default HeaderContainer