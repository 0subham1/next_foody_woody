"use client";
import React from "react";
import { Snackbar, Alert } from "@mui/material";
const CustomSnack = ({ openSnack, handleClose, msg, type }) => {
  return (
    <div>
      <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={type} //error success
          variant="filled"
          sx={{ width: "100%" }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomSnack;
