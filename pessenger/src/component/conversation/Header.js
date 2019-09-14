import React from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert';


import HeaderContainer from '../../container/HeaderContainer'

class Header extends React.Component {
  render () {
    console.log('ppppp', this.props)
    return (
      <div className='header'>
        <span>{this.props.name}</span>
        <span>{this.props.lastname}</span>
        <img className="ChatPic" id="ChatPic" src={this.props.avatar}/>
        <span>{this.props.user}</span> 
        <spna><MoreVertIcon className='headericon'/></spna>
        
      </div>
    )
  }
}

export default Header
