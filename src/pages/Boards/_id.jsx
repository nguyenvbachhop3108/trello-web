import Container from "@mui/material/Container";
import AppBar from "../../components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import { useEffect, useState } from "react";
import { fetchGetBoardAPI } from "~/apis";
import { mockData } from "~/apis/mock-data";

function Board() {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const bId = "66161c782e170065711b89b9";

    fetchGetBoardAPI(bId).then((board) => {
      setBoard(board);
    });
  }, []);
  return (
    <>
      <Container
        disableGutters
        maxWidth={false}
        sx={{ height: "100vh", backgroundColor: "primary.main" }}
      >
        <AppBar></AppBar>
        <BoardBar board={mockData?.board}></BoardBar>
        <BoardContent board={mockData?.board}></BoardContent>
      </Container>
    </>
  );
}

export default Board;
