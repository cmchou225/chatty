import React, {Component} from 'react';

class Message extends Component {
  
  render() {
    const klass = this.props.type === 'incomingMessage' ? 'message' : 'message system';
    console.log(this.props.color);
    return (
      <div className={klass}>
        {this.props.type === 'incomingNotification' && this.props.content}
        {this.props.type === 'incomingMessage' &&
        <div>
          <span className={this.props.color}>{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
        }
      </div>
    );
  }
}
export default Message;

