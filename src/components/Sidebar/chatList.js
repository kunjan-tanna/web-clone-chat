import React, { Component } from "react";
import Icon from "components/Icon";
import formatTime from "utils/formatTime";

import avatar from "assets/images/avatar-blank.jpg";
import moment from "moment";

class chatList extends Component {
   newChat = () => {
      this.props.newChatBtn();
   };
   selectChat = (index) => {
      this.props.selectChatfn(index);
   };

   userIsSender = (chat) =>
      chat.messages[chat.messages.length - 1].sender === this.props.userEmail;
   render() {
      if (this.props.chatsList.length > 0) {
         return (
            <div>
               {this.props.chatsList.map((item, index) => {
                  if (item.userid.includes(this.props.userId)) {
                     return (
                        <list
                           className="sidebar-contact"
                           key={index}
                           onClick={() => this.selectChat(index)}
                           // to={`/chat/${index}`}
                           selected={this.props.selectedChatIndex == index}
                        >
                           <div className="sidebar-contact__avatar-wrapper">
                              <img
                                 src={item.image ? item.image : avatar}
                                 alt="Karen Okonkwo"
                                 className="avatar"
                              />

                              {/* <img
                              src={contact.profile_picture}
                              alt={contact.profile_picture}
                              className="avatar"
                           /> */}
                           </div>
                           <div className="sidebar-contact__content">
                              <div className="sidebar-contact__top-content">
                                 <h2 className="sidebar-contact__name">
                                    {
                                       item.users.filter(
                                          (_user) =>
                                             _user !== this.props.userEmail
                                       )[0]
                                    }
                                 </h2>
                                 <span className="sidebar-contact__time">
                                    {item.messages.length > 0 &&
                                       moment(
                                          item.messages[
                                             item.messages.length - 1
                                          ].timestmp
                                       ).format("LT")}
                                    {/* {formatTime(lastMessage.time)} */}
                                 </span>
                              </div>
                              <div className="sidebar-contact__bottom-content">
                                 <p className="sidebar-contact__message-wrapper">
                                    {/* {lastMessage.status && (
								   <Icon
									  id={
										 lastMessage?.status === "sent"
											? "singleTick"
											: "doubleTick"
									  }
									  aria-label={lastMessage?.status}
									  className={`sidebar-contact__message-icon ${
										item.receiverHasRead === true
											? "sidebar-contact__message-icon--blue"
											: ""
									  }`}
								   />
								)} */}
                                    {/* <span>HII</span> */}
                                    <span
                                       className={`sidebar-contact__message ${
                                          item.receiverHasRead === false &&
                                          !this.userIsSender(item)
                                             ? "sidebar-contact__message--unread"
                                             : ""
                                       }`}
                                    >
                                       {item.messages.length > 0 ? (
                                          item.messages[
                                             item.messages.length - 1
                                          ].message.substring(0, 30)
                                       ) : (
                                          <i> typing...</i>
                                       )}
                                    </span>
                                 </p>
                                 <div className="sidebar-contact__icons">
                                    {/* {contact.pinned && (
								   <Icon id="pinned" className="sidebar-contact__icon" />
								)} */}

                                    {item.receiverHasRead === false &&
                                       !this.userIsSender(item) && (
                                          <span className="sidebar-contact__unread">
                                             <i className="fa fa-bell"></i>
                                             {/* {contact.unread} */}
                                          </span>
                                       )}
                                    <button aria-label="sidebar-contact__btn">
                                       <Icon
                                          id="downArrow"
                                          className="sidebar-contact__icon sidebar-contact__icon--dropdown"
                                       />
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </list>
                     );
                  } else {
                     return null;
                  }
               })}
            </div>
         );
      } else {
         return <h1> SORRY</h1>;
      }
   }
}

export default chatList;
