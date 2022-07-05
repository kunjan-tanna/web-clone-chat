// const styles = (theme) => ({
//    main: {
//       width: "auto",
//       display: "block", // Fix IE 11 issue.
//       marginLeft: theme.spacing.unit * 3,
//       marginRight: theme.spacing.unit * 3,
//       [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
//          width: 400,
//          marginLeft: "auto",
//          marginRight: "auto",
//       },
//    },
//    paper: {
//       marginTop: theme.spacing.unit * 8,
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
//          theme.spacing.unit * 3
//       }px`,
//    },
//    form: {
//       width: "100%",
//       marginTop: theme.spacing.unit,
//    },
//    submit: {
//       marginTop: theme.spacing.unit * 3,
//    },
//    noAccountHeader: {
//       width: "100%",
//    },
//    signUpLink: {
//       width: "100%",
//       textDecoration: "none",
//       color: "#303f9f",
//       fontWeight: "bolder",
//    },
//    errorText: {
//       color: "red",
//       textAlign: "center",
//    },
// });
import { withStyles, createStyles } from "@material-ui/core/styles";
const styles = (theme) =>
   createStyles({
      root: {
         "& .MuiFormLabel-root": {
            color: "#008080 !important",
         },
         "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2a2f32 !important",
         },
         "& .MuiOutlinedInput-input": {
            color: "white !important",
         },
      },

      paper: {
         marginTop: theme.spacing(8),
         display: "flex",
         flexDirection: "column",
         alignItems: "center",
      },
      avatar: {
         margin: theme.spacing(1),
         backgroundColor: "#008080",
      },
      form: {
         width: "100%", // Fix IE 11 issue.
         marginTop: theme.spacing(1),
      },
      submit: {
         margin: theme.spacing(3, 0, 2),
         color: "#1e2326",
      },
      link: {
         color: "#008080",
      },
      text: {
         color: "#008080",
      },
      errorText: {
         color: "red",
         textAlign: "center",
      },
   });

export default styles;
