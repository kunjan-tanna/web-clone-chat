import React, { Component } from "react";
import "./styles/main.css";
import avatar from "assets/images/profile-picture-girl-1.jpeg";
import Icon from "components/Icon";
import Alert from "./Alert";
import ChatList from "./chatList";
import OptionsBtn from "components/OptionsButton";

import { auth, firestore, db } from "../../firebaseInit";
import Chat from "pages/Chat";
import { Link, withRouter } from "react-router-dom";
import NewChat from "pages/newChat/newChat";
import firebase from "firebase/app";

class Sidebar extends Component {
   constructor() {
      super();
      this.state = {
         selChat: null,
         newChatFormVisible: false,
         email: null,
         userId: null,
         chatId: null,
         chats: [],
         loading: false,
         searchVal: "",
      };
      this.groupChatId = null;
      this.userUid = null;
   }
   componentWillMount = () => {
      auth.onAuthStateChanged(async (user) => {
         if (!user) {
            this.props.history.push("/login");
         } else {
            // await firestore.collection("users").onSnapshot((snapshot) => {
            //    snapshot.docs.map(
            //       (doc) => console.log("AAA==", doc.id)

            //       // id: doc.id,
            //    );
            // });

            await firestore
               .collection("chats")

               .onSnapshot(async (snapshot) => {
                  this.setState({
                     loading: true,
                  });
                  const chats = snapshot.docs.map((doc) => doc.data());

                  const userId = auth.currentUser.uid;

                  await this.setState({
                     email: user.email,
                     chats: chats,
                     userId: userId,
                     loading: false,
                  });
               });
            // await firestore
            //    .collection("chats")

            //    .where("users", "array-contains", user.email)
            //    .onSnapshot(async (res) => {
            //       console.log(res.docs);
            //       const chats = res.docs.map((doc) => doc.data());

            //       await this.setState({
            //          email: user.email,
            //          chats: chats,
            //       });
            //    });
         }
      });
   };
   newChatBtnClicked = () => {
      this.setState({
         newChatFormVisible: true,
         selChat: null,
      });
   };
   selectChat = async (chatIndex) => {
      console.log("CHATINDEX", chatIndex);

      await this.setState({
         selChat: chatIndex,
         newChatFormVisible: false,
      });
      this.messageRead();
   };

   signOut = () => {
      auth.signOut();
   };

   clickedChatWhereNotSender = (chatIndex) =>
      this.state.chats[chatIndex].messages[
         this.state.chats[chatIndex].messages.length - 1
      ].sender !== this.state.email;

   // Chat index could be different than the one we are currently on in the case
   // that we are calling this function from within a loop such as the chatList.
   // So we will set a default value and can overwrite it when necessary.
   messageRead = () => {
      const chatIndex = this.state.selChat;

      const docKey = this.state.chats[chatIndex]?.userid.filter(
         (item) => item !== this.state.userId
      )[0];

      if (this.hashString(this.state.userId) <= this.hashString(docKey)) {
         this.groupChatId = `${this.state.userId}:${docKey}`;
      } else {
         this.groupChatId = `${docKey}:${this.state.userId}`;
      }
      if (this.clickedChatWhereNotSender(chatIndex)) {
         firestore.collection("chats").doc(this.groupChatId).update({
            receiverHasRead: true,
         });
      } else {
         console.log("Clicked message where the user was sender");
      }
   };
   hashString = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
         hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
         hash = hash & hash; // Convert to 32bit integer
      }
      return hash;
   };
   submitAction = (optionIndex) => {
      console.log("HELL", optionIndex);
      if (optionIndex == 1) {
         this.signOut();
      } else if (optionIndex == 0) {
         this.setState({
            newChatFormVisible: true,
            selChat: null,
         });
         this.props.newMessageFn(optionIndex);
      }
   };
   newSubmitChat = async (chatObj) => {
      console.log("CHATOBJ", chatObj);
      await firestore.collection("users").onSnapshot(async (snapshot) => {
         // const chats = snapshot.docs.map((doc) => doc.data());
         snapshot.docs.map(async (doc) => {
            if (doc.data().email == chatObj.sendTo) {
               // console.log("sss==", doc.data().uid);
               this.userUid = doc.data().uid;
            }
         });
         if (
            this.hashString(this.state.userId) <= this.hashString(this.userUid)
         ) {
            this.groupChatId = `${this.state.userId}:${this.userUid}`;
         } else {
            this.groupChatId = `${this.userUid}:${this.state.userId}`;
         }

         await firestore
            .collection("chats")
            .doc(this.groupChatId)
            .set({
               messages: [
                  {
                     message: chatObj.message,
                     sender: this.state.email,
                     uid: this.state.userId,
                     timestmp: Date.now(),
                  },
               ],
               receiverHasRead: false,
               users: [this.state.email, chatObj.sendTo],
               userid: [this.state.userId, this.userUid],
            });
         this.setState({
            newChatFormVisible: false,
         });
         console.log("CHATS", this.state.chats.length - 1);
         this.selectChat(this.state.chats.length - 1);
      });
   };
   goToChat = async (docKey, msg) => {
      const usersInChat = docKey.split(":");

      const chat = this.state.chats.find((_chat) =>
         usersInChat.every((_user) => _chat.userid.includes(_user))
      );
      // const chat = this.state.chats.find((_chat) =>
      //    console.log("CHASTT", _chat)
      // );
      this.setState({ newChatFormVisible: false });

      await this.selectChat(this.state.chats.indexOf(chat));

      this.submitMessage(msg);
   };
   submitMessage = (msg) => {
      // const docKey = this.state.chats[this.state.selChat]?.users.filter(
      //    (item) => item.toLowerCase() !== this.state.email
      // )[0];
      const docKey = this.state.chats[this.state.selChat]?.userid.filter(
         (item) => item !== this.state.userId
      )[0];

      //THIS IS MAIN PORTION PART
      if (this.hashString(this.state.userId) <= this.hashString(docKey)) {
         this.groupChatId = `${this.state.userId}:${docKey}`;
      } else {
         this.groupChatId = `${docKey}:${this.state.userId}`;
      }

      firestore
         .collection("chats")
         .doc(this.groupChatId)
         .update({
            messages: firebase.firestore.FieldValue.arrayUnion({
               message: msg,
               sender: this.state.email,
               uid: this.state.userId,
               timestmp: Date.now(),
            }),
            receiverHasRead: false,
         });
      // console.log("docKey", item.toLowerCase(),"ff",this.state.email)
   };
   /*For Searching Value*/
   updateSearchQuery = async (val) => {
      this.setState({
         searchVal: val,
      });
      await this.filterData();
   };
   filterData = async () => {
      const chats = await this.state.chats.filter((user) => {
         user?.users.filter((item) => {
            console.log("ITEM", item);

            return (
               item
                  .toLowerCase()
                  .indexOf(this.state.searchVal.toLowerCase()) !== -1
            );
         });
      });
   };
   updateProfile = () => {
      console.log("CHATS");
   };
   render() {
      return (
         <aside className="sidebar">
            <header className="header">
               <div
                  className="sidebar__avatar-wrapper"
                  onClick={() => this.updateProfile()}
               >
                  <img
                     src={avatar}
                     alt="Karen Okonkwo"
                     className="avatar"
                     style={{ cursor: "pointer" }}
                  />
               </div>
               <div className="sidebar__actions">
                  {/* <button className="sidebar__action" aria-label="Status">
                     <Icon
                        id="status"
                        className="sidebar__action-icon sidebar__action-icon--status"
                     />
                  </button>
                  <button className="sidebar__action" aria-label="New chat">
                     <Icon id="chat" className="sidebar__action-icon" />
                  </button> */}
                  <OptionsBtn
                     className="sidebar__action"
                     ariaLabel="Menu"
                     submitActionFn={this.submitAction}
                     iconId="menu"
                     iconClassName="sidebar__action-icon"
                     options={["New Message", "Log out"]}
                  />
               </div>
            </header>
            {/* <Alert /> */}
            {/* <div className="search-wrapper">
               <div className="search-icons">
                  <Icon id="search" className="search-icon" />
                  <button className="search__back-btn">
                     <Icon id="back" />
                  </button>
               </div>
               <input
                  className="search"
                  placeholder="Search or start a new chat"
                  onChange={(e) => this.updateSearchQuery(e.target.value)}
                  value={this.state.searchVal}
               />
            </div> */}
            <div className="sidebar__contacts">
               <ChatList
                  newChatBtn={this.newChatBtnClicked}
                  selectChatfn={this.selectChat}
                  userEmail={this.state.email}
                  chatsList={this.state.chats}
                  userId={this.state.userId}
                  selectedChatIndex={this.state.selChat}
               ></ChatList>
            </div>
            {this.state.newChatFormVisible ? null : (
               <Chat
                  userId={this.state.userId}
                  selectedChatIndex={this.state.selChat}
                  newChatFormVisibleFn={this.state.newChatFormVisible}
                  user={this.state.email}
                  chat={this.state.chats[this.state.selChat]}
                  submitMessageFn={this.submitMessage}
                  messageRef={this.messageRead}
               ></Chat>
            )}
            {this.state.newChatFormVisible ? (
               <NewChat
                  newChatSubmitFn={this.newSubmitChat}
                  goToChatFn={this.goToChat}
               ></NewChat>
            ) : null}
         </aside>
      );
   }
}

export default withRouter(Sidebar);
