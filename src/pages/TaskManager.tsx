import { useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from "@mui/material";
import { Task, TaskStatusType, stateType, updateTask } from "../state";
import Loader from "../components/Loader";
import EmptyState from "../components/TaskManager/EmptyState";

// Lazy-loaded components
const TaskModal = lazy(() => import("../components/TaskManager/TaskModal"));
const TaskCard = lazy(() => import("../components/TaskManager/TaskCard"));

const TaskManager = () => {
  const tasks: Task[] = useSelector((state: stateType) => state.tasks);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const progressHandler = (id: string, status: string) => {
    const idx = tasks.findIndex((task) => task.id === id);
    const nextStatusMap: { [key: string]: TaskStatusType } = {
      todo: "in-progress",
      "in-progress": "done",
      done: "todo",
    };
    const nextStatus = nextStatusMap[status];
    dispatch(updateTask({ ...tasks[idx], status: nextStatus }));
  };

  const handleOpen = () => setOpen(true);
  // const editHandler = (id: string) => {
  //   const idx = tasks.findIndex((task) => task.id === id);
  //   setEditData(tasks[idx]);
  //   setUpdate(true);
  //   handleOpen();
  // };

  return (
    <Box
      sx={{
        marginTop: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {tasks.length > 0 && (
        <Button variant="contained" onClick={handleOpen}>
          add Task
        </Button>
      )}
      <Suspense fallback={<Loader />}>
        <TaskModal open={open} setOpen={setOpen} />
      </Suspense>
      <Box
        sx={{
          marginTop: "50px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {tasks.map((task) => (
          <Suspense key={task.id} fallback={<Loader />}>
            <TaskCard handleProgess={progressHandler} data={task} />
          </Suspense>
        ))}
        {tasks.length === 0 && !open && <EmptyState handleClick={handleOpen} />}
      </Box>
    </Box>
  );
};

export default TaskManager;
