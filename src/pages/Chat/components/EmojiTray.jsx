import React from "react";
import Icon from "components/Icon";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const emojiTabs = [
   { icon: "recent", label: "Recent emojis", active: true },
   { icon: "emojiPeople", label: "People emojis", active: false },
   { icon: "emojiNature", label: "Nature emojis", active: false },
   { icon: "emojiFood", label: "Food emojis", active: false },
   { icon: "emojiActivity", label: "Activity emojis", active: false },
   { icon: "emojiTravel", label: "Travel emojis", active: false },
   { icon: "emojiObjects", label: "Object emojis", active: false },
   { icon: "emojiSymbols", label: "Symbol emojis", active: false },
   { icon: "emojiFlags", label: "Flag emojis", active: false },
];

const EmojiTray = ({ showEmojis, newMessage, setNewMessage }) => {
   const addEmoji = (emoji) => {
      console.log("EVV", emoji.native);
      setNewMessage(newMessage + emoji.native);
   };

   return (
      <div
         className={`emojis__wrapper ${
            showEmojis ? "emojis__wrapper--active" : ""
         }`}
      >
         {/* <div className="emojis__tabs">
            {emojiTabs.map((tab) => (
               <div
                  className={`emojis__tab ${
                     tab.active ? "emojis__tab--active" : ""
                  }`}
                  key={tab.label}
               >
                  <button aria-label={tab.label} key={tab.icon}>
                     <Icon id={tab.icon} className="emojis__tab-icon" />
                  </button>
               </div>
            ))}
         </div> */}
         <div className="emojis__content">
            <Picker
               onSelect={addEmoji}
               theme={"dark"}
               //    className="emoji-mart emoji-mart-dark"
            />
         </div>
      </div>
   );
};

export default EmojiTray;
