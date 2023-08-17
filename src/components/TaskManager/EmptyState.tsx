import { Typography, Button, Box, Stack, useMediaQuery } from "@mui/material";

const EmptyState = ({ handleClick }: { handleClick: () => void }) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  return (
    <Box
      sx={{
        marginLeft: 0,
        marginRight: 0,
        borderRadius: 8,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          backgroundColor: "primary.main",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottom: "1px solid",
          borderBottomColor: "darkgray",
          height: "40px",
        }}
        // backgroundColor="gray.50"
        // borderTopLeftRadius={8}
        // borderTopRightRadius={8}
        // borderBottom="1px solid"
        // borderBottomColor="gray.200"
        // height="40px"
      />
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={2}
        p={isNonMobileScreens ? 16 : 2}
        borderRadius={8}
      >
        <Typography variant={isNonMobileScreens ? "h1" : "h3"}>
          You haven’t added any tasks.
        </Typography>
        <Typography variant={isNonMobileScreens ? "h4" : "h6"}>
          Welcome 👋🏼 Let’s create a task.
        </Typography>
        <Button
          onClick={handleClick}
          variant="contained"
          sx={{
            marginTop: "20px",
            maxWidth: "200px",
          }}
        >
          Add Task
        </Button>
      </Stack>
    </Box>
  );
};

export default EmptyState;
