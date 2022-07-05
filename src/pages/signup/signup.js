import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { auth, firestore } from "../../firebaseInit";
import {
   Avatar,
   TextField,
   FormControlLabel,
   Checkbox,
   Box,
   Container,
   Grid,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import theme from "../../utils/theme";

const themeFile = createMuiTheme(theme);

class signup extends Component {
   constructor() {
      super();
      this.state = {
         email: null,
         password: null,
         Confirmpassword: null,
         signUpError: null,
      };
   }

   handleSubmit = (e) => {
      e.preventDefault();
      console.log("Hello", this.state);

      if (this.state.password === this.state.Confirmpassword) {
         //TO STORE THE DATA IN FIREBASE

         auth
            .createUserWithEmailAndPassword(
               this.state.email,
               this.state.password
            )
            .then(
               (authRes) => {
                  const userObj = {
                     email: authRes.user.email,
                     // password: authRes.user.password,
                  };
                  firestore
                     .collection("users")
                     .add({
                        email: this.state.email,
                        password: this.state.password,
                        uid: authRes.user.uid,
                     })

                     // .doc(this.state.email)
                     // .set(userObj)
                     .then(
                        () => {
                           this.props.history.push("/home");
                        },
                        (dbError) => {
                           console.log(dbError);
                           this.setState({ signUpError: dbError.message });
                        }
                     );
               },
               (authError) => {
                  console.log(authError);
                  this.setState({
                     signUpError: authError.message,
                  });
               }
            );
      } else {
         this.setState({ signUpError: "Password doesn't match" });
      }
   };

   handleInput = (event) => {
      event.persist();
      this.setState(() => ({
         [event.target.name]: event.target.value,
      }));
   };

   render() {
      const { classes } = this.props;
      return (
         <ThemeProvider theme={themeFile}>
            <Container component="main" maxWidth="xs">
               <div className={classes.paper}>
                  <Avatar className={classes.avatar}>
                     <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                     Register
                  </Typography>
                  <form
                     className={classes.form}
                     noValidate
                     onSubmit={(e) => this.handleSubmit(e)}
                  >
                     <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        className={classes.root}
                        onChange={this.handleInput}
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                     />
                     <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        className={classes.root}
                        fullWidth
                        name="password"
                        onChange={this.handleInput}
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                     />
                     <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        className={classes.root}
                        onChange={this.handleInput}
                        id="name"
                        type="password"
                        label="Confirm Your Password"
                        name="Confirmpassword"
                        autoComplete="name"
                     />
                     <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                     >
                        SignUp
                     </Button>
                     <Grid container>
                        <Grid item>
                           <Link
                              to="/login"
                              variant="body2"
                              className={classes.link}
                           >
                              {"Don't have an account? LogIn"}
                           </Link>
                        </Grid>
                     </Grid>
                  </form>
                  {this.state.signUpError ? (
                     <Typography
                        className={classes.errorText}
                        component="h5"
                        variant="h6"
                     >
                        {this.state.signUpError}
                     </Typography>
                  ) : null}
               </div>
            </Container>
         </ThemeProvider>
      );
   }
}
export default withStyles(styles)(signup);
