import Box from "@mui/material/Box";
import ModeSelect from "../ModeSelect";
import AppsIcon from "@mui/icons-material/Apps";
import { ReactComponent as TrelloLogo } from "../../assets/trello.svg";
import { SvgIcon, Typography } from "@mui/material";
import WorkSpaces from "./Menus/WorkSpaces";
import Recent from "./Menus/Recent";
import Starred from "./Menus/Starred";
import Templates from "./Menus/Templates";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Badge from "@mui/material/Badge";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Tooltip from "@mui/material/Tooltip";
import HelpIcon from "@mui/icons-material/Help";
import Profiles from "./Menus/Profiles";

function AppBar() {
  return (
    <div>
      <Box
        px={2}
        sx={{
          width: "100%",
          height: (theme) => theme.trello.appBarHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <AppsIcon sx={{ color: "primary.main" }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <SvgIcon
              component={TrelloLogo}
              inheritViewBox
              fontSize="small"
              sx={{ color: "primary.main" }}
            />
            <Typography
              variant="span"
              sx={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "primary.main",
              }}
            >
              Trello
            </Typography>
          </Box>
          <WorkSpaces />
          <Recent />
          <Starred />
          <Templates />

          <Button variant="outlined">Outlined</Button>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            id="outlined-search"
            label="Search..."
            type="search"
            size="small"
          />
          <ModeSelect />
          <Tooltip title="Notifications" sx={{ cursor: "pointer" }}>
            <Badge color="secondary" variant="dot">
              <NotificationsNoneIcon sx={{ color: "primary.main" }} />
            </Badge>
          </Tooltip>
          <Tooltip title="Notification" sx={{ cursor: "pointer" }}>
            <HelpIcon sx={{ color: "primary.main" }} />
          </Tooltip>
          <Profiles />
        </Box>
      </Box>
    </div>
  );
}

export default AppBar;
