import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import { mapOrder } from "~/utils/sorts";
import {
  DndContext,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
} from "@dnd-kit/core";
import { MouseSensor, TouchSensor } from "~/customLibraries/DndkitSensors";
import { useEffect, useState,useRef } from "react";
import { arrayMove } from "@dnd-kit/sortable";

import Card from "./ListColumns/Column/ListCards/Card/Card";
import Column from "./ListColumns/Column/Column";
import { cloneDeep, isEmpty } from "lodash";
import { generatePlaceholderCard } from "~/utils/formatter";

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

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

  //Cùng 1 thời điểm chỉ có 1 phần tử đang được kéo (column hoặc card)
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemIdType, setActiveDragItemIdType] = useState(null);
  const [activeDragItemIdData, setActiveDragItemIdData] = useState(null);
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    useState(null);

  const lastOverId = useRef(null);
  
  useEffect(() => {
    setOrderedColumnnsState(
      mapOrder(board?.columns, board?.columnOrderIds, "_id")
    );
  }, [board]);

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) =>
      column.cards.map((card) => card?._id).includes(cardId)
    );
  };

  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumnnsState((prevColumns) => {
      const overCardIndex = overColumn?.cards?.findIndex(
        (card) => card._id === overCardId
      );

      let newCardIndex;
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;
      const modifier = isBelowOverItem ? 1 : 0;
      newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.cards?.length + 1;

      const nextColumns = cloneDeep(prevColumns);
      const nextActiveColumn = nextColumns.find(
        (c) => c._id === activeColumn._id
      );
      const nextOverColumn = nextColumns.find((c) => c._id === overColumn._id);

      if (nextActiveColumn) {
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          (c) => c._id !== activeDraggingCardId
        );

        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)];
        }

        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
          (c) => c._id
        );
      }

      if (nextOverColumn) {
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (c) => c._id !== activeDraggingCardId
        );
        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id,
        };
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          rebuild_activeDraggingCardData
        );

        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => !card.FE_PlaceholderCard
        );

        nextOverColumn.cardOrderIds = nextOverColumn.cards.map((c) => c._id);
      }

      return nextColumns;
    });
  };

  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemIdType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveDragItemIdData(event?.active?.data?.current);
    //Nếu là kéo card thì mới thực hiện hành động set giá trị oldColumn
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id));
    }
  };

  const handleDragOver = (event) => {
    if (activeDragItemIdType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;

    const { active, over } = event;
    // Kiểm tra nếu không tồn tại over (kéo linh tinh ra ngoài thì return luôn tránh lỗi)
    if (!over || !active) return;

    //activeDraggingCard là card đang được kéo
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData },
    } = active;
    //overCard: là cái card đang tương tác trên hoặc dưới so với cái card được kéo ở trên
    const { id: overCardId } = over;

    //Tìm 2 cái columns theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId);
    const overColumn = findColumnByCardId(overCardId);

    if (!activeColumn || !overColumn) return;

    if (oldColumnWhenDraggingCard._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      );
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    // Kiểm tra nếu không tồn tại over (kéo linh tinh ra ngoài thì return luôn tránh lỗi)
    if (!over) return;

    if (activeDragItemIdType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      //activeDraggingCard là card đang được kéo
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData },
      } = active;
      //overCard: là cái card đang tương tác trên hoặc dưới so với cái card được kéo ở trên
      const { id: overCardId } = over;

      //Tìm 2 cái columns theo cardId
      const activeColumn = findColumnByCardId(activeDraggingCardId);
      const overColumn = findColumnByCardId(overCardId);

      if (!activeColumn || !overColumn) return;

      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        );
      } else {
        //Lấy vị trí cũ từ thằng oldColumnWhenDraggingCard
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(
          (c) => c._id === activeDragItemId
        );
        //Lấy vị trí mới từ thằng over
        const newCardIndex = overColumn?.cards.findIndex(
          (c) => c._id === overCardId
        );
        const dndOrderedCards = arrayMove(
          oldColumnWhenDraggingCard?.cards,
          oldCardIndex,
          newCardIndex
        );
        //setOrderedColumnnsState(dndOrderedCards);
        setOrderedColumnnsState((prevColumns) => {
          //Clone mảng OrderedColumnnsState cũ ra 1 mảng mới rồi xử lý data rồi trả lại và cập nhật OrderedColumnnsState mới
          const nextColumns = cloneDeep(prevColumns);

          const targetColumn = nextColumns.find(
            (c) => c._id === overColumn._id
          );

          targetColumn.cards = dndOrderedCards;
          targetColumn.cardOrderIds = dndOrderedCards.map((card) => card._id);

          return nextColumns;
        });
      }
    }

    if (
      activeDragItemIdType === ACTIVE_DRAG_ITEM_TYPE.COLUMN &&
      active.id !== over.id
    ) {
      //Lấy vị trí cũ từ thằng active
      const oldColumnIndex = orderedColumns.findIndex(
        (c) => c._id === active.id
      );
      //Lấy vị trí mới từ thằng over
      const newColumnIndex = orderedColumns.findIndex((c) => c._id === over.id);

      //Dùng arrayMove của thằng dnd-kit để sắp xếp lại mảng column ban đầu
      //Code của arayMove ở đây: dnd-kit/packages/sortable/src/utilities/arraymove.ts
      const dndOrderedColumns = arrayMove(
        orderedColumns,
        oldColumnIndex,
        newColumnIndex
      );
      // const dndOrderedColumnsIds = dndOrderedColumns.map( c => c._id)
      //2 cái console.log dữ liệu này dùng để xử lý gọi api
      // console.log("🚀 ~ handleDragEnd ~ dndOrderedColumns:", dndOrderedColumns)
      // console.log("🚀 ~ handleDragEnd ~ dndOrderedColumnsIds:", dndOrderedColumnsIds)

      //Cập nhật lại State Columns ban đầu sau khi kéo thả
      setOrderedColumnnsState(dndOrderedColumns);
    }

    //những dữ liệu sau khi kéo thả này luôn phải đưa về giá trị ban đầu
    setActiveDragItemId(null);
    setActiveDragItemIdType(null);
    setActiveDragItemIdData(null);
    setOldColumnWhenDraggingCard(null);

    //Nếu vị trí sau khi kéo thả khác với vị trí ban đầu
  };
  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };
  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
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

          <DragOverlay dropAnimation={dropAnimation}>
            {!activeDragItemIdType && null}
            {activeDragItemIdType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
              <Column column={activeDragItemIdData} />
            )}
            {activeDragItemIdType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
              <Card card={activeDragItemIdData} />
            )}
          </DragOverlay>
        </Box>
      </DndContext>
    </div>
  );
}

export default BoardContent;
