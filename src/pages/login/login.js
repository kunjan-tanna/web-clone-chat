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
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {
   Avatar,
   TextField,
   FormControlLabel,
   Checkbox,
   Box,
   Container,
   Grid,
} from "@material-ui/core";
import theme from "../../utils/theme";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
const themeFile = createMuiTheme(theme);
class login extends Component {
   constructor() {
      super();
      this.state = {
         email: null,
         password: null,
         loginError: null,
      };
   }

   handleSubmit = (e) => {
      e.preventDefault();
      //TO STORE THE DATA IN FIREBASE

      auth
         .signInWithEmailAndPassword(this.state.email, this.state.password)
         .then(
            (authRes) => {
               console.log("AA", authRes.user);

               if (authRes) {
                  this.props.history.push("/home");
               }
            },
            (authError) => {
               console.log(authError);
               this.setState({
                  loginError: authError.message,
               });
            }
         );
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

                  <Typography
                     component="h1"
                     variant="h5"
                     className={classes.text}
                  >
                     Login
                  </Typography>
                  <form
                     className={classes.form}
                     noValidate
                     onSubmit={(e) => this.handleSubmit(e)}
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

                     <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                     >
                        LogIn
                     </Button>
                     <Grid container>
                        <Grid item>
                           <Link
                              to="/signup"
                              variant="body2"
                              className={classes.link}
                           >
                              {"Don't have an account? Sign Up"}
                           </Link>
                        </Grid>
                     </Grid>
                  </form>
                  {this.state.loginError ? (
                     <Typography
                        className={classes.errorText}
                        component="h5"
                        variant="h6"
                     >
                        {this.state.loginError}
                     </Typography>
                  ) : null}
               </div>
            </Container>
         </ThemeProvider>
      );
   }
}
export default withStyles(styles)(login);
