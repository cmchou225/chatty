import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(prop){
    super(prop);
    this.state = {
      user: prop.currentUser.name,
      content: ''
    };
  }

  onNewContent = (event) => {
    this.setState({ content: event.target.value })
  }

  onSendNewContent = (event) => {
    if(event.key === 'Enter'){
      this.props.onNewMessage(this.state.content);
      this.setState({ content: '' });
    }
  }

  onNewUserName = (event) => {
    this.setState({user: event.target.value});
    
  }

  onSendNewUserName = (event) => {
      this.props.onSendNewUserName(this.state.user);
      event.target.value = '';
    }
    

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" 
               placeholder={this.props.currentUser.name}
               onChange={this.onNewUserName}
               onBlur={this.onSendNewUserName}/>
        <input className="chatbar-message" 
               placeholder="Type a message and hit ENTER"
               onChange={this.onNewContent}
               onKeyPress={this.onSendNewContent}
               value={this.state.content} />
      </footer>
    );
  }
}
export default ChatBar;





