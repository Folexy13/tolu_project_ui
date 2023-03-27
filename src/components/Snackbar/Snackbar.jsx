import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import userOBJ from "../../Classes";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes";

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
  const [data, setData] = useState([]);
  useEffect(() => {
    const handleWebhook = async (event) => {
      await userOBJ.webhook().then((res) => {
        setData(res.data);
      });
      // Handle the incoming webhook event here
    };

    window.addEventListener("webhook", handleWebhook("webhook"));

    return () => {
      window.removeEventListener("webhook", handleWebhook);
    };
  }, [messages]);

  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  if (data.length) {
    return (
      <div className={classes.root}>
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="warning">
            {`There are ${data.length} item in stock that needs revamping. `}
            <Link style={{ color: "red" }} to={ROUTES.INVENTORY}>
              Check them out
            </Link>
          </Alert>
        </Snackbar>
        )
      </div>
    );
  }
}

export default React.memo(CustomSnackbar);
