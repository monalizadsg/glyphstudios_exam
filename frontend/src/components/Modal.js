import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 24px",
  },
}));

const Modal = ({ isOpen, onClose, title, children }) => {
  const classes = useStyles();
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth disableBackdropClick>
      <div className={classes.title}>
        <Typography variant='h6'>{title}</Typography>
        <IconButton aria-label='close' onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
