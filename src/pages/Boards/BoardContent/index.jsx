import Box from "@mui/material/Box";

function BoardContent() {
  return (
    <div>
      <Box
        sx={{
          backgroundColor: "primary.main",
          width: "100%",
          height: (theme) =>
            `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.appBoardBar})`,
          display: "flex",
          alignItems: "center",
        }}
      >
        BoardContent
      </Box>
    </div>
  );
}

export default BoardContent;
