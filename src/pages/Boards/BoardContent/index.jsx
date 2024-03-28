import Box from "@mui/material/Box";
import { useState } from "react";
import { Button, Tooltip } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ContentCut from "@mui/icons-material/ContentCut";
import Cloud from "@mui/icons-material/Cloud";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import AddCardIcon from "@mui/icons-material/AddCard";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import GroupIcon from "@mui/icons-material/Group";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";

const COLUMN_HEADER_HEIGHT = "50px";
const COLUMN_FOOTER_HEIGHT = "56px";

function BoardContent() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
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
          {/* Colmn Box */}
          <Box
            sx={{
              minWidth: "300px",
              maxWidth: "300px",
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "#333643" : "#ebecf0",
              ml: 2,
              borderRadius: "6px",
              height: "fit-content",
              maxHeight: (theme) =>
                `calc(${theme.trello.boardContentHeight} - ${theme.spacing(
                  5
                )})`,
            }}
          >
            {/* header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                height: COLUMN_HEADER_HEIGHT,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", cursor: "pointer", fontSize: "1rem" }}
              >
                Column Title
              </Typography>
              <Box>
                <Tooltip title="More Options">
                  <ExpandMoreIcon
                    sx={{ fontWeight: "bold", cursor: "pointer" }}
                    id="basic-column=dropdown"
                    aria-controls={
                      open ? "basic-menu-column-dropdown" : undefined
                    }
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  />
                </Tooltip>
                <Menu
                  id="basic-menu-column-dropdown"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-column=dropdown",
                  }}
                >
                  <MenuItem>
                    <ListItemIcon>
                      <AddIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Add new card</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ContentCopyIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Copy</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ContentCut fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Cut</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ContentPasteGoIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Paste</ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <ListItemIcon>
                      <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Remove this column</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <Cloud fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Archive this column</ListItemText>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
            {/* card */}
            <Box
              sx={{
                p: "0 5px",
                m: "0 5px",
                display: "flex",
                flexDirection: "column",
                gap: 1,
                overflowX: "hidden",
                overflowY: "auto",
                maxHeight: (theme) => `calc(
                ${theme.trello.boardContentHeight} - 
                ${theme.spacing(5)} -
                ${COLUMN_HEADER_HEIGHT} -
                ${COLUMN_FOOTER_HEIGHT}
                )`,
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#ced0da",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#bfc2cf",
                },
              }}
            >
              <Card
                sx={{
                  cursor: "pointer",
                  boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                  overflow: "unset",
                }}
              >
                <CardMedia
                  sx={{ height: 140 }}
                  image="https://images.pexels.com/photos/8500505/pexels-photo-8500505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  title="green iguana"
                />
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Bach Hop MEARN Stack</Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  ></Typography>
                </CardContent>
                <CardActions sx={{ p: " 0 4 8 4 " }}>
                  <Button size="small" startIcon={<GroupIcon />}>
                    20
                  </Button>
                  <Button size="small" startIcon={<ModeCommentIcon />}>
                    35
                  </Button>
                  <Button size="small" startIcon={<AttachEmailIcon />}>
                    6
                  </Button>
                </CardActions>
              </Card>
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              {/* Card 01 Clone */}
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
            </Box>
            {/* footer */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                height: COLUMN_FOOTER_HEIGHT,
              }}
            >
              <Button startIcon={<AddCardIcon />}>Add new card</Button>
              <Tooltip title="Drag to move">
                <DragHandleIcon cursor="pointer" />
              </Tooltip>
            </Box>
          </Box>
          {/* Colmn Box */}
          <Box
            sx={{
              minWidth: "300px",
              maxWidth: "300px",
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "#333643" : "#ebecf0",
              ml: 2,
              borderRadius: "6px",
              height: "fit-content",
              maxHeight: (theme) =>
                `calc(${theme.trello.boardContentHeight} - ${theme.spacing(
                  5
                )})`,
            }}
          >
            {/* header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                height: COLUMN_HEADER_HEIGHT,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", cursor: "pointer", fontSize: "1rem" }}
              >
                Column Title
              </Typography>
              <Box>
                <Tooltip title="More Options">
                  <ExpandMoreIcon
                    sx={{ fontWeight: "bold", cursor: "pointer" }}
                    id="basic-column=dropdown"
                    aria-controls={
                      open ? "basic-menu-column-dropdown" : undefined
                    }
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  />
                </Tooltip>
                <Menu
                  id="basic-menu-column-dropdown"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-column=dropdown",
                  }}
                >
                  <MenuItem>
                    <ListItemIcon>
                      <AddIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Add new card</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ContentCopyIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Copy</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ContentCut fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Cut</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ContentPasteGoIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Paste</ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <ListItemIcon>
                      <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Remove this column</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <Cloud fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Archive this column</ListItemText>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
            {/* card */}
            <Box
              sx={{
                p: "0 5px",
                m: "0 5px",
                display: "flex",
                flexDirection: "column",
                gap: 1,
                overflowX: "hidden",
                overflowY: "auto",
                maxHeight: (theme) => `calc(
                ${theme.trello.boardContentHeight} - 
                ${theme.spacing(5)} -
                ${COLUMN_HEADER_HEIGHT} -
                ${COLUMN_FOOTER_HEIGHT}
                )`,
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#ced0da",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#bfc2cf",
                },
              }}
            >
              <Card
                sx={{
                  cursor: "pointer",
                  boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                  overflow: "unset",
                }}
              >
                <CardMedia
                  sx={{ height: 140 }}
                  image="https://images.pexels.com/photos/8500505/pexels-photo-8500505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  title="green iguana"
                />
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Bach Hop MEARN Stack</Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  ></Typography>
                </CardContent>
                <CardActions sx={{ p: " 0 4 8 4 " }}>
                  <Button size="small" startIcon={<GroupIcon />}>
                    20
                  </Button>
                  <Button size="small" startIcon={<ModeCommentIcon />}>
                    35
                  </Button>
                  <Button size="small" startIcon={<AttachEmailIcon />}>
                    6
                  </Button>
                </CardActions>
              </Card>
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              {/* Card 01 Clone */}
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ cursor: "pointer", overflow: "unset" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
            </Box>
            {/* footer */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                height: COLUMN_FOOTER_HEIGHT,
              }}
            >
              <Button startIcon={<AddCardIcon />}>Add new card</Button>
              <Tooltip title="Drag to move">
                <DragHandleIcon cursor="pointer" />
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default BoardContent;
