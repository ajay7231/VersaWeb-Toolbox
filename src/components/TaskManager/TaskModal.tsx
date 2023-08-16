import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
import { Task, addTask, updateTask } from "../../state";
import { uuid } from "../../algos";
import {
  Backdrop,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  useMediaQuery,
  Modal,
  IconButton,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { Close } from "@mui/icons-material";

const style = {
  position: "absolute",
  height: "500px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alighItems: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40vw",
  bgcolor: "#fff",
  borderRadius: "20px",
  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  p: 4,
};

type Priority = "high" | "medium" | "low";
type TaskModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  update?: boolean;
  data?: Task | null;
};

export default function TaskModal({
  open,
  setOpen,
  update,
  data,
}: TaskModalProps) {
  // const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [taskTitle, setTaskTitle] = useState<string>(data ? data.title : "");
  const [selectedValue, setSelectedValue] = useState<Priority>(
    data ? data.priority : "low"
  );
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value as Priority);
  };
  const dispatch = useDispatch();

  // if enter is pressed, submit the form

  const handleSubmit = () => {
    if (data && update) {
      // update task
      dispatch(
        updateTask({
          ...data,
          priority: selectedValue,
          title: taskTitle,
        })
      );
    } else {
      dispatch(
        addTask({
          id: uuid(),
          priority: selectedValue,
          title: taskTitle,
          status: "todo",
        })
      );
    }
    // add task to state
    // close modal
    handleClose();
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        sx={{
          color: "rgba(0, 0, 0, 0.5)",
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleClose();
        }}
      >
        <Box
          sx={{
            position: "absolute",
            height: "500px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alighItems: "center",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isNonMobileScreens ? "40vw" : "90vw",
            bgcolor: "#fff",
            borderRadius: "20px",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            p: 4,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
          <Typography
            sx={{
              fontWeight: "bold",
            }}
            variant="h2"
            component="h2"
          >
            Add Task
          </Typography>
          <TextField
            id="task-description"
            onChange={(e) => setTaskTitle(e.target.value)}
            value={taskTitle}
            label="Task"
            placeholder="Type your task here..."
            variant="outlined"
          />
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              <Typography variant="h6" component="h2">
                Priority
              </Typography>
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={selectedValue}
              onChange={handleChange}
            >
              <FormControlLabel
                value="high"
                control={<Radio color="error" />}
                label="High"
              />
              <FormControlLabel
                value="medium"
                control={<Radio color="warning" />}
                label="Medium"
              />
              <FormControlLabel
                value="low"
                control={<Radio color="success" />}
                label="Low"
              />
            </RadioGroup>
          </FormControl>
          <Button
            // onKeyDown={(e) => {
            //   if (e.key === "Enter") {
            //     handleSubmit();
            //   }
            // }}
            disabled={taskTitle == ""}
            onClick={handleSubmit}
            variant="contained"
          >
            Add Task
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
