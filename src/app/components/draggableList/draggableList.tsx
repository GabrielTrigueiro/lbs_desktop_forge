import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import DraggableListItem from "./draggableListItem";
import React from "react";
import { Box } from "@mui/material";
import {TVideos} from "../../../core/models/course";

export type DraggableListProps = {
  items: TVideos;
  onDragEnd: OnDragEndResponder;
  remove: (index: number) => void;
};

const DraggableList = React.memo(
  ({ items, onDragEnd, remove }: DraggableListProps) => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-list">
          {(provided) => (
            <Box ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((item, index) => (
                <DraggableListItem
                  remove={remove}
                  index={index}
                  item={item}
                  key={item.url}
                />
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
);

export default DraggableList;
