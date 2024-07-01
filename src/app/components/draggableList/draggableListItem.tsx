import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import CloseIcon from "@mui/icons-material/Close";

import {TVideo} from "../../../core/models/course";

export type DraggableListItemProps = {
  item: TVideo;
  index: number;
  remove: (index: number) => void;
};

const DraggableListItem = ({ item, index, remove }: DraggableListItemProps) => {
  return (
    <Draggable draggableId={item.url} index={index}>
      {(provided, snapshot) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            background: snapshot.isDragging ? "rgb(235,235,235)" : "",
          }}
        >
          <ListItemAvatar>
            <Avatar>
              <SlideshowIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.name} secondary={item.url} />
          <CloseIcon onClick={() => remove(item.sequence)} />
        </ListItem>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
