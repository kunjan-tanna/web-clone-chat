import React, { Component } from "react";
import {
   FormControl,
   InputLabel,
   Input,
   Button,
   Paper,
   withStyles,
   CssBaseline,
   Typography,
   Avatar,
   TextField,
   FormControlLabel,
   Checkbox,
   Box,
   Container,
   Grid,
} from "@material-ui/core";
import styles from "./styles";
import { auth, firestore, db } from "../../firebaseInit";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import theme from "../../utils/theme";
import ChatIcon from "@material-ui/icons/Chat";
const themeFile = createMuiTheme(theme);

class newChat extends Component {
   constructor() {
      super();
      this.state = {
         username: null,
         message: null,
      };
      this.groupChatId = null;
      this.userUid = null;
   }
   hashString = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
         hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
         hash = hash & hash; // Convert to 32bit integer
      }
      return hash;
   };
   handleInput = (event) => {
      event.persist();
      this.setState(() => ({
         [event.target.name]: event.target.value,
      }));
   };
   chatExists = async () => {
      const docKey = await firestore
         .collection("users")
         .onSnapshot(async (snapshot) => {
            snapshot.docs.map(async (doc) => {
               if (doc.data().email == this.state.username) {
                  this.userUid = doc.data().uid;
               }
            });
            console.log(
               "USERID",
               this.userUid,
               "CURRENT",
               auth.currentUser.uid
            );
            if (
               this.hashString(auth.currentUser.uid) <=
               this.hashString(this.userUid)
            ) {
               this.groupChatId = `${auth.currentUser.uid}:${this.userUid}`;
            } else {
               this.groupChatId = `${this.userUid}:${auth.currentUser.uid}`;
            }
            console.log("GROUPID", this.groupChatId);

            const chat = await firestore
               .collection("chats")
               .doc(this.groupChatId)
               .get();
            if (chat.exists == true) {
               this.props.goToChatFn(this.groupChatId, this.state.message);
            } else {
               this.createChat();
            }
            return chat.exists;
         });
   };
   userExists = async () => {
      const userData = await firestore.collection("users").get();
      const user = userData.docs
         .map((item) => item.data().email)
         .includes(this.state.username);
      return user;
   };
   submitNewChat = async (e) => {
      e.preventDefault();

      const userExists = await this.userExists();

      if (userExists) {
         await this.chatExists();
      }
   };
   createChat = () => {
      this.props.newChatSubmitFn({
         sendTo: this.state.username,
         message: this.state.message,
      });
   };
   buildDocKey = async () => {};
   render() {
      const { classes } = this.props;
      return (
         <>
            <ThemeProvider theme={themeFile}>
               <Container component="main" maxWidth="xs">
                  <div className={classes.paper}>
                     <Avatar className={classes.avatar}>
                        <ChatIcon />
                     </Avatar>

                     <Typography
                        component="h1"
                        variant="h5"
                        className={classes.text}
                     >
                        Send a Message!
                     </Typography>
                     <form
                        className={classes.form}
                        noValidate
                        onSubmit={(e) => this.submitNewChat(e)}
                     >
                        <TextField
                           variant="outlined"
                           margin="normal"
                           type="email"
                           required
                           fullWidth
                           className={classes.root}
                           onChange={this.handleInput}
                           id="email"
                           label="Enter Your Friend's Email"
                           name="username"
                           autoComplete="email"
                           autoFocus
                        />
                        <TextField
                           variant="outlined"
                           margin="normal"
                           required
                           className={classes.root}
                           fullWidth
                           name="message"
                           onChange={this.handleInput}
                           label="Enter Your Message"
                           id="password"
                           autoComplete="current-password"
                        />

                        <Button
                           type="submit"
                           fullWidth
                           variant="contained"
                           color="primary"
                           className={classes.submit}
                        >
                           Send
                        </Button>
                     </form>
                  </div>
               </Container>
            </ThemeProvider>
         </>
      );
   }
}

export default withStyles(styles)(newChat);
