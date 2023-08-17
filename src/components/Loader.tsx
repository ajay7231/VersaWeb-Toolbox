import { CircularProgress, Backdrop } from "@mui/material";

const Loader = () => {
  return (
    //  <Box
    //    sx={{
    //      position: "absolute",
    //      top: "50%",
    //      left: "50%",
    //      transform: "translate(-50%,-50%)",
    //    }}
    //  >
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
      //   onClick={handleClose}
    >
      <CircularProgress />
    </Backdrop>
    //  </Box>
  );
};

export default Loader;
