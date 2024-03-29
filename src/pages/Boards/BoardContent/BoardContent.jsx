import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import { mapOrder } from "~/utils/sorts";
import {
  DndContext,
  MouseSensor,
  useSensor,
  TouchSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";

function BoardContent({ board }) {
  const pointerSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });

  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });
  const sensors = useSensors(pointerSensor, mouseSensor, touchSensor);
  const [orderedColumns, setOrderedColumnnsState] = useState([]);

  useEffect(() => {
    setOrderedColumnnsState(
      mapOrder(board?.columns, board?.columnOrderIds, "_id")
    );
  }, [board]);

  const handleDragEnd = (event) => {
    console.log("handleDragEnd", event);
    const { active, over } = event;

    // Kiểm tra nếu không tồn tại over (kéo linh tinh ra ngoài thì return luôn tránh lỗi)
    if (!over) return;

    //Nếu vị trí sau khi kéo thả khác với vị trí ban đầu
    if (active.id !== over.id) {
      //Lấy vị trí cũ từ thằng active
      const oldIndex = orderedColumns.findIndex((c) => c._id === active.id);
      //Lấy vị trí mới từ thằng over
      const newIndex = orderedColumns.findIndex((c) => c._id === over.id);

      //Dùng arrayMove của thằng dnd-kit để sắp xếp lại mảng column ban đầu
      //Code của arayMove ở đây: dnd-kit/packages/sortable/src/utilities/arraymove.ts
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);
      // const dndOrderedColumnsIds = dndOrderedColumns.map( c => c._id)
      //2 cái console.log dữ liệu này dùng để xử lý gọi api
      // console.log("🚀 ~ handleDragEnd ~ dndOrderedColumns:", dndOrderedColumns)
      // console.log("🚀 ~ handleDragEnd ~ dndOrderedColumnsIds:", dndOrderedColumnsIds)

      //Cập nhật lại State Columns ban đầu sau khi kéo thả
      setOrderedColumnnsState(dndOrderedColumns);
    }
  };
  return (
    <div>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <Box
          sx={{
            width: "100%",
            height: (theme) => theme.trello.boardContentHeight,
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
            p: "10px 0",
            display: "flex",
          }}
        >
          <ListColumns columns={orderedColumns} />
        </Box>
      </DndContext>
    </div>
  );
}

export default BoardContent;
