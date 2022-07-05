import React, { Component } from "react";
import "./styles/main.css";
import EmojiTray from "./components/EmojiTray";
import ChatInput from "./components/ChatInput";
import Header from "./components/Header";
import ChatSidebar from "./components/ChatSidebar";
import Icon from "components/Icon";
import Search from "./components/Search";
import Profile from "./components/Profile";
import Convo from "./components/Convo";

import Home from "pages/Home";
import { auth, firestore, db } from "../../firebaseInit";
import firebase from "firebase/app";

class Chat extends Component {
   constructor() {
      super();
      this.state = {
         newMessage: "",
         showEmojis: false,
         showAttach: false,
      };
      this.groupChatId = null;
   }

   componentDidUpdate = () => {
      const container = document.getElementById("container-chatview");
      if (container) {
         container.scrollTo(0, container.scrollHeight);
      }
   };
   setShowEmojis = (emoji) => {
      this.setState({
         showEmojis: emoji,
      });
   };
   setShowAttach = (attach) => {
      this.setState({
         showAttach: attach,
      });
   };
   hashString = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
         hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
         hash = hash & hash; // Convert to 32bit integer
      }
      return hash;
   };
   submitNewMessage = () => {
      const docKey = this.props.chat?.userid.filter(
         (item) => item !== this.props.userId
      )[0];
      console.log("DOCC", docKey);
      //THIS IS MAIN PORTION PART
      if (this.hashString(this.props.userId) <= this.hashString(docKey)) {
         this.groupChatId = `${this.props.userId}:${docKey}`;
      } else {
         this.groupChatId = `${docKey}:${this.props.userId}`;
      }

      firestore
         .collection("chats")
         .doc(this.groupChatId)
         .update({
            messages: firebase.firestore.FieldValue.arrayUnion({
               message: this.state.newMessage,
               sender: this.props.user,
               uid: this.props.userId,
               timestmp: Date.now(),
            }),
            receiverHasRead: false,
         });
      this.setState({
         newMessage: "",
      });
   };
   setNewMessage = (info) => {
      this.setState({
         newMessage: info,
      });
   };

   render() {
      const { classes, chat, userId, user } = this.props;

      if (chat == undefined) {
         return null;
      } else {
         return (
            <div className="chat">
               <div className="chat__body">
                  <div className="chat__bg"></div>

                  <Header
                     user={chat?.users.filter((_user) => _user !== user)[0]}
                     //   openProfileSidebar={() => openSidebar(setShowProfileSidebar)}
                     //   openSearchSidebar={() => openSidebar(setShowSearchSidebar)}
                  />
                  <div className="chat__content">
                     {chat?.messages?.map((item, index) => {
                        return (
                           <div
                              key={index}
                              className={
                                 userId !== item.uid ? "userSent" : "friendSent"
                              }
                           >
                              {item.message}
                           </div>
                        );
                     })}
                     {/* <Convo lastMsgRef={lastMsgRef} messages={user.messages} /> */}
                  </div>
                  <footer className="chat__footer">
                     <button
                        className="chat__scroll-btn"
                        aria-label="scroll down"
                        // onClick={scrollToLastMsg}
                     >
                        <Icon id="downArrow" />
                     </button>
                     <EmojiTray
                        showEmojis={this.state.showEmojis}
                        newMessage={this.state.newMessage}
                        setNewMessage={this.setNewMessage}
                     />
                     {this.props.selectedChatIndex !== null &&
                     !this.props.newChatFormVisibleFn ? (
                        <ChatInput
                           showEmojis={this.state.showEmojis}
                           setShowEmojis={this.setShowEmojis}
                           showAttach={this.state.showAttach}
                           setShowAttach={this.setShowAttach}
                           newMessage={this.state.newMessage}
                           setNewMessage={this.setNewMessage}
                           submitNewMessage={this.submitNewMessage}
                           messageRefFn={this.props.messageRef}
                        />
                     ) : null}
                  </footer>
               </div>
               {/* <ChatSidebar
			 heading="Search Messages"
			 active={showSearchSidebar}
			 closeSidebar={() => setShowSearchSidebar(false)}
		  >
			 <Search />
		  </ChatSidebar>

		  <ChatSidebar
			 heading="Contact Info"
			 active={showProfileSidebar}
			 closeSidebar={() => setShowProfileSidebar(false)}
		  >
			 <Profile user={user} />
		  </ChatSidebar> */}
            </div>
         );
      }
   }
}

export default Chat;
