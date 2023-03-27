// import React, { useState, useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Snackbar from "@material-ui/core/Snackbar";
// import MuiAlert from "@material-ui/lab/Alert";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1),
//     },
//   },
// }));

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

// export default function CustomSnackbar({ messages }) {
//   const classes = useStyles();
//   const [open, setOpen] = useState(false);
//   const [snackbars, setSnackbars] = useState([]);
//   const handleSnackbarClose = (id) => {
//     setSnackbars((prevState) =>
//       prevState.filter((snackbar) => snackbar.id !== id)
//     );
//   };

//   useEffect(() => {
//     if (messages.length > 0) {
//       const id = new Date().getTime();
//       setSnackbars((prevState) => [
//         ...prevState,
//         { id, message: messages.flatMap((el) => el) },
//       ]);
//       setOpen(true);
//     }
//   }, [messages]);
//   const handleClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }

//     setOpen(false);
//   };

//   return (
//     <div className={classes.root}>
//       {snackbars.map((snackbar) => {
//         return (
//           <Snackbar open={open} autoHideDuration={3000} onClose={(handleClose)}>
//             <Alert onClose={(handleClose)} severity="success">
//               {snackbar.message}
//             </Alert>
//           </Snackbar>
//         );
//       })}
//     </div>
//   );
// }
// import React, { useState, useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Snackbar from "@material-ui/core/Snackbar";
// import MuiAlert from "@material-ui/lab/Alert";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1),
//     },
//   },
// }));

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

// export default function CustomSnackbar({ messages }) {
//   const classes = useStyles();
//   const [snackbars, setSnackbars] = useState([]);

//   const handleSnackbarClose = (id) => {
//     setSnackbars((prevState) =>
//       prevState.map((snackbar) =>
//         snackbar.id === id ? { ...snackbar, open: false } : snackbar
//       )
//     );
//   };

//   useEffect(() => {
//     if (messages.length > 0) {
//       const id = new Date().getTime();
//       messages.forEach((msg) =>
//         setSnackbars((prevState) => [
//           ...prevState,
//           { id, message: msg, open: true },
//         ])
//       );
//     }
//   }, [messages]);
//   console.log(snackbars);
//   return (
//     <div className={classes.root}>
//       {snackbars.map((snackbar) => (
//         <Snackbar
//           key={snackbar.id}
//           open={snackbar.open}
//           autoHideDuration={3000}
//           onClose={() => handleSnackbarClose(snackbar.id)}
//         >
//           <Alert onClose={() => handleSnackbarClose(snackbar.id)}>
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       ))}
//     </div>
//   );
// }

import React, { useState, useEffect, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CustomSnackbar({ messages }) {
  const classes = useStyles();
  const [snackbars, setSnackbars] = useState([]);

  const handleSnackbarClose = (id) => {
    setSnackbars((prevState) =>
      prevState.filter((snackbar) => snackbars.indexOf(snackbar) !== id)
    );
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbars([]);
  };
  useEffect(() => {
    if (messages.length) {
      const newSnackbars = messages.map((msg) => {
        return { id: new Date().getTime(), message: msg };
      });
      setSnackbars((prevState) => [...prevState, ...newSnackbars]);
    }
  }, [messages]);
  console.log(snackbars);
  return (
    <div className={classes.root}>
      {snackbars.map((snackbar, idx) => (
        <Snackbar
          key={idx}
          open={true}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert onClose={() => handleSnackbarClose(idx)} severity="success">
            {snackbar.message}
          </Alert>
        </Snackbar>
      ))}
    </div>
  );
}

export default React.memo(CustomSnackbar);
