import Box from "@mui/material/Box";
import Column from "./Column/Column";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

function ListColumns({ columns }) {
  return (
    <>
      <SortableContext items={columns?.map( c => c._id)} strategy={horizontalListSortingStrategy}>
        <Box
          sx={{
            bgcolor: "inherit",
            width: "100%",
            overflowX: "auto",
            overflowY: "hidden",
            display: "flex",
            "&::-webkit-scrollbar-track": { m: 2 },
          }}
        >
          {columns?.map((column) => (
            <Column key={column._id} column={column} />
          ))}

          <Box sx={{}}>
            <Button
              startIcon={<AddIcon />}
              sx={{
                minWidth: "200px",
                maxWidth: "200px",
                bgcolor: "#ffffff3d",
                borderRadius: "6px",
                mx: 2,
                height: "fit-content",
                color: "white",
                width: "100%",
                justifyContent: "flex-start",
                pl: 2.5,
                py: 1,
              }}
            >
              Add new column
            </Button>
          </Box>
        </Box>
      </SortableContext>
    </>
  );
}

export default ListColumns;
