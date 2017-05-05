import React, {Component} from 'react';
import Header from './Header.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

export default class App extends Component {
  constructor (prop){
    super(prop);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [],
      count:'',
      color:''
    };
    this.socket;
  };
  

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = this.onNewUserEntry;
    this.socket.onmessage = this.updateMessage;
  };

  updateMessage = (message) => {
    const newMessage = JSON.parse(message.data);
    if(newMessage.type === 'systemMessage'){
      const count = newMessage.count;
      this.setState({count: count});
    } else if(newMessage.type !== 'systemMessage'){
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages: messages});
    }
  }

  onNewUserEntry = () => {
    const newMessageObject = {
      type: 'postNotification',
      user: this.state.currentUser.name,
      content: `${this.state.currentUser.name} has joined the chat`
    };
    this.socket.send(JSON.stringify(newMessageObject));
  }  
  
  onNewMessage = (content) => {
    const newMessageObject = {
      type: 'postMessage',
      username: this.state.currentUser.name,
      content: content
    };
    this.socket.send(JSON.stringify(newMessageObject));
  }

  onSendNewUserName = (username) => {
    const content = `${this.state.currentUser.name} has changed their name to ${username}.`;
    const newMessageObject = {
      type: 'postNotification',
      content: content
    };
    this.socket.send(JSON.stringify(newMessageObject));
    const newUserName = {name: username};
    this.setState({currentUser: newUserName});
  }

  render() {
    return (
      <div>
        <Header count={this.state.count}/>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} onNewMessage={this.onNewMessage} 
                 onSendNewUserName={this.onSendNewUserName}/>
      </div>
    );
  }
}
