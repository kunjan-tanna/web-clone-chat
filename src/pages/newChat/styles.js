// const styles = (theme) => ({
//    main: {
//       width: "auto",
//       display: "block", // Fix IE 11 issue.
//       marginLeft: theme.spacing() * 3,
//       marginRight: theme.spacing() * 3,
//       [theme.breakpoints.up(400 + theme.spacing() * 3 * 2)]: {
//          width: 400,
//          marginLeft: "auto",
//          marginRight: "auto",
//       },
//    },
//    paper: {
//       padding: `${theme.spacing() * 2}px ${theme.spacing() * 3}px ${
//          theme.spacing() * 3
//       }px`,
//       position: "absolute",
//       width: "350px",
//       top: "50px",
//       left: "calc(50% + 150px - 175px)",
//    },
//    input: {},
//    form: {
//       width: "100%",
//       marginTop: theme.spacing(),
//    },
//    submit: {
//       marginTop: theme.spacing() * 3,
//    },
//    errorText: {
//       color: "red",
//       textAlign: "center",
//    },
// });

// export default styles;
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
         position: "absolute",
         width: "350px",
         top: "50px",
         left: "calc(50% + 150px - 175px)",
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
