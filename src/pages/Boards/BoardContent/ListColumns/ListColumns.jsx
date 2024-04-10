import Box from "@mui/material/Box";
import Column from "./Column/Column";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { toast } from "react-toastify";

function ListColumns({ columns }) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  const toggleOpenNewColumnForm = () =>
    setOpenNewColumnForm(!openNewColumnForm);

  const addNewColumn = () => {
    if (!newColumnTitle) {
      toast.error("Please enter column title!");
      return;
    }
    toggleOpenNewColumnForm()
    setNewColumnTitle("")
  };
  return (
    <>
      <SortableContext
        items={columns?.map((c) => c._id)}
        strategy={horizontalListSortingStrategy}
      >
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
          {!openNewColumnForm ? (
            <Box onClick={toggleOpenNewColumnForm}>
              <Button
                startIcon={<AddIcon />}
                sx={{
                  minWidth: "200px",
                  maxWidth: "20px",
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
                Add New Column
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                minWidth: "250px",
                maxWidth: "250px",
                bgcolor: "#ffffff3d",
                borderRadius: "6px",
                mx: 2,
                height: "fit-content",
                bgColor: "#ffffff3d",
                flexDirection: "column",
                display: "flex",
                gap: 1,
                p: 1,
              }}
            >
              <TextField
                label="Enter column title..."
                type="text  "
                size="small"
                varriant="outlined"
                autoFocus
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
                sx={{
                  "& label": { color: "white" },
                  "& input": { color: "white" },
                  "& label.Mui-focused": { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                  },
                }}
              />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button
                  variant="contained"
                  color="success"
                  size="sm"
                  onClick={addNewColumn}
                >
                  Add Column
                </Button>
                <CloseIcon
                  fontSize="small"
                  sx={{
                    color: "black",
                    cursor: "pointer",
                    "&:hover": {
                      color: (theme) => theme.palette.warning.light,
                    },
                  }}
                  onClick={toggleOpenNewColumnForm}
                />
              </Box>
            </Box>
          )}
        </Box>
      </SortableContext>
    </>
  );
}

export default ListColumns;
