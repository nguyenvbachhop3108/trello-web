import Box from "@mui/material/Box";

function BoardBar() {
  return (
    <div>
      <Box
        sx={{
          backgroundColor: "primary.dark",
          width: "100%",
          height: (theme) => theme.trello.appBoardBar,
          display: "flex",
          alignItems: "center",
        }}
      >
        BoardBar
      </Box>
    </div>
  );
}

export default BoardBar;
