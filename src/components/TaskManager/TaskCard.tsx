import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
  capitalize,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Task, deleteTask } from "../../state";
import { DeleteSweep, EditNote } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import TaskModal from "./TaskModal";
import { truncate } from "../../algos";

type TaskCardProps = {
  handleProgess: (id: string, status: string) => void;
  data: Task;
};

const CircularProgressCustom = ({ value }: { value: number }) => {
  return (
    <Box sx={{ position: "relative" }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        }}
        value={100}
      />
      <CircularProgress
        variant="determinate"
        color="primary"
        value={value}
        sx={{
          position: "absolute",
          left: 0,
        }}
      />
    </Box>
  );
};

const TaskCard = ({ handleProgess, data }: TaskCardProps) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [edit, setEdit] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setEdit(true);
  };

  useEffect(() => {
    if (data.status === "todo") setProgress(0);
    else if (data.status === "in-progress") setProgress(50);
    else setProgress(100);
  }, [data.status]);
  return (
    <>
      <TaskModal open={edit} setOpen={setEdit} data={data} update={true} />
      <Grid
        container
        sx={{
          width: isNonMobileScreens ? "40vw" : "90vw",
          padding: "10px",
          alignItems: "center",
          justifyContent: "space-evenly",
          height: "80px",
          bgcolor: "primary.white",
          borderRadius: "10px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            flexDirection: "column",

            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" color="grey">
            Task
          </Typography>
          <Box
            sx={{
              maxWidth: isNonMobileScreens ? "200px" : "100px",
            }}
          >
            <Typography fontSize={isNonMobileScreens ? 16 : 12} color="black">
              {capitalize(truncate(data.title, 15))}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box>
            <Typography variant="h6" color="grey">
              Priority
            </Typography>
            <Typography
              variant="h5"
              fontSize={isNonMobileScreens ? 16 : 12}
              color={
                data.priority === "high"
                  ? "red"
                  : data.priority === "medium"
                  ? "orange"
                  : "green"
              }
            >
              {capitalize(data.priority)}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={() => handleProgess(data.id, data.status)}
            sx={{
              borderRadius: "10px",
              bgcolor: "lightgrey",
              color: "GrayText",
              fontSize: isNonMobileScreens ? "0.6rem" : "0.4rem",
              fontWeight: "bold",
              width: isNonMobileScreens ? "80px" : "0px",
            }}
          >
            {data.status.split("-").join(" ")}
          </Button>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgressCustom value={progress} />
        </Grid>
        <Grid
          item
          xs={1}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton onClick={() => handleEdit()} aria-label="edit">
            <EditNote
              sx={{
                color: "primary.main",
                fontSize: isNonMobileScreens ? "2rem" : "1.5rem",
              }}
            />
          </IconButton>
        </Grid>
        <Grid
          item
          xs={1}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            onClick={() => dispatch(deleteTask(data.id))}
            aria-label="delete"
          >
            <DeleteSweep
              sx={{
                color: "red",
                fontSize: isNonMobileScreens ? "2rem" : "1.5rem",
              }}
            />
          </IconButton>
        </Grid>
      </Grid>
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: isNonMobileScreens ? "40vw" : "90vw",
          height: "80px",
          bgcolor: "primary.white",
          borderRadius: "10px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <TaskModal open={edit} setOpen={setEdit} data={data} update={true} />
        <Box>
          <Typography variant="h6" color="grey">
            Task
          </Typography>
          <Box
            sx={{
              maxWidth: isNonMobileScreens ? "200px" : "100px",
            }}
          >
            <Typography variant="h5" color="black">
              {capitalize(truncate(data.title, 20))}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="h6" color="grey">
            Priority
          </Typography>
          <Typography
            variant="h5"
            color={
              data.priority === "high"
                ? "red"
                : data.priority === "medium"
                ? "orange"
                : "green"
            }
          >
            {capitalize(data.priority)}
          </Typography>
        </Box>
        <Button
          onClick={() => handleProgess(data.id, data.status)}
          sx={{
            borderRadius: "10px",
            bgcolor: "lightgrey",
            color: "GrayText",
            fontSize: "0.6rem",
            fontWeight: "bold",
            width: "80px",
          }}
        >
          {data.status.split("-").join(" ")}
        </Button>
        <CircularProgressCustom value={progress} />
        <IconButton onClick={() => handleEdit(data.id)} aria-label="edit">
          <EditNote
            sx={{
              color: "primary.main",
              fontSize: "2rem",
            }}
          />
        </IconButton>
        <IconButton
          onClick={() => dispatch(deleteTask(data.id))}
          aria-label="delete"
        >
          <DeleteSweep
            sx={{
              color: "red",
              fontSize: "2rem",
            }}
          />
        </IconButton>
      </Box> */}
    </>
  );
};

export default TaskCard;
