import React, { useState } from "react";
import "./Home.css";
import Button from "@mui/material/Button";
// import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";

import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { AdapterDateFns } from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import {makeStyles} from "@material-ui/core/styles";

import dayjs from "dayjs";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const Home = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const modal = {
    width: "100vw",
  };

  const [selectedDate, setSelectedDate] = useState(null);
  console.log({ selectedDate });

  const [selectedTime1, setSelectedTime1] = useState(null);
  console.log({ selectedTime1 });
  const [selectedTime2, setSelectedTime2] = useState(null);
  console.log({ selectedTime2 });

  const handleTimeChange1 = (newValue) => {
    const selectedTime = dayjs(newValue).format("HH:mm");
    setSelectedTime1(selectedTime);
  };

  const handleTimeChange2 = (newValue) => {
    const selectedTime = dayjs(newValue).format("HH:mm");
    setSelectedTime2(selectedTime);
  };
  return (
    <>
      <div className="main">
        <div className="container">
          <p className="title">Daily Sleep Tracker</p>

          <div className="add-btn">
            <div>
              <Button
                variant="contained"
                className="new-btn1"
                startIcon={<AddIcon />}
                onClick={handleClickOpen}
                sx={{
                  backgroundColor: "#5795FA",
                  borderRadius: 50,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                New Entry
              </Button>
              <BootstrapDialog
                style={modal}
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
              >
                <BootstrapDialogTitle
                  id="customized-dialog-title"
                  onClose={handleClose}
                >
                  <strong> Fill Your Details</strong>
                </BootstrapDialogTitle>
                <DialogContent dividers>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="Select Date"
                        value={selectedDate}
                        onChange={(date) => {
                          const dateString = new Date(
                            date
                          ).toLocaleDateString();
                          console.log(dateString);
                          setSelectedDate(dateString);
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["TimePicker"]}>
                      <TimePicker
                        label="Sleep time"
                        value={selectedTime1}
                        onChange={(newValue) => {
                          handleTimeChange1(newValue);
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["TimePicker"]}>
                      <TimePicker
                        label="Wake up time"
                        renderInput={(params) => <TextField {...params} />}
                        value={selectedTime2}
                        onChange={(newValue) => {
                          handleTimeChange2(newValue);
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#5795FA",
                      borderRadius: 5,
                      fontFamily: "Inter, sans-serif",
                    }}
                    autoFocus
                    onClick={handleClose}
                  >
                    Save
                  </Button>
                </DialogActions>
              </BootstrapDialog>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
