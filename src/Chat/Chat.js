import React, {Component} from 'react';
import './Chat.sass'
import ChatContainer from './ChatContainer/ChatContainer'
import Pageheader from './Pageheader/Pageheader'
import Footer from './Footer/Footer'

export const HeaderInfoContext = React.createContext()

export class Chat extends Component {

  constructor(props) {
    super(props)
    this.state = {
            chatName : 'My chat',
            myId: '4b003c20-1b8f-11e8-9629-c7eca82aa7bd',
            messages : []}
    }
  getHeaderInfo = () => {
    let chatName = this.state.chatName;
    let participants = [];
    let messagesAmount = 0;
    let answerObj = {};
    let messagesTime = [];
    this.state.messages.forEach(message => {
      messagesAmount++ ;
      participants.push(message.userId);
      messagesTime.push(Date.parse(message.createdAt));
    });
    participants = Array.from(new Set(participants));
    messagesTime.sort((a, b) => b - a);
    let date = new Date(messagesTime[0]);
    let lastMessageTime = date.toString().slice(0,21);
    answerObj.chatName = chatName;
    answerObj.participants = participants.length;
    answerObj.messagesAmount = messagesAmount;
    answerObj.lastMessageTime = lastMessageTime;
    answerObj.messages = this.state.messages
    return answerObj;
  }

  getMessages = () => {
    let messages = this.state.messages
    return messages
  }

  getMyId = () => {
    let myId = this.state.myId
    return myId
  }


  fromContext = () => {
    return {getHeaderInfo: this.getHeaderInfo, getMessages: this.getMessages, getMyId: this.getMyId}
  }
  
  componentDidMount = () => {
    fetch('https://api.npoint.io/b919cb46edac4c74d0a8')
      .then(response => response.json())
      .then(messages => {
        this.setState({ messages: messages });
    });
  }

  render(){
    return(
      <div className = "container">
        <Pageheader />
        <HeaderInfoContext.Provider value = {this.fromContext}>
          <ChatContainer />
        </HeaderInfoContext.Provider>
        <Footer />
      </div>
    )
  }
}

export default Chat;
