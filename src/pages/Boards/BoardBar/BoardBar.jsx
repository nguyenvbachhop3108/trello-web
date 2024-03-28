import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip from "@mui/material/Tooltip";
import avatar from "~/assets/avatar.jpg";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { capitalizeFirstLetter } from "~/utils/formatter";

const BAR_MENU = {
  color: "white",
  bgcolor: "transparent",
  border: "none",
  paddingX: "5px",
  borderRadius: "4px",
  ".MuiSvgIcon-root": {
    color: "white",
  },
  "&:hover": {
    bgcolor: "primary.50",
  },
};
function BoardBar({ board }) {
  return (
    <div>
      <Box
        sx={{
          backgroundColor: "white",
          width: "100%",
          height: (theme) => theme.trello.appBoardBar,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          overflowX: "auto",
          paddingX: 2,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Chip
            sx={BAR_MENU}
            icon={<DashboardIcon />}
            label={board?.title}
            clickable
          />
          <Chip
            sx={BAR_MENU}
            icon={<VpnLockIcon />}
            label={capitalizeFirstLetter(board?.type)}
            clickable
          />
          <Chip
            sx={BAR_MENU}
            icon={<AddToDriveIcon />}
            label="Add To Google Drives"
            clickable
          />
          <Chip
            sx={BAR_MENU}
            icon={<OfflineBoltIcon />}
            label="Automation"
            clickable
          />
          <Chip
            sx={BAR_MENU}
            icon={<FilterListIcon />}
            label="Filters"
            clickable
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Button
            sx={{
              color: "white",
              borderColor: "white",
              "&:hover": { borderColor: "white" },
            }}
            variant="outlined"
            startIcon={<PersonAddIcon />}
          >
            Invite
          </Button>
          <AvatarGroup
            max={6}
            sx={{
              "& .MuiAvatar-root": {
                width: 34,
                height: 34,
                fontSize: 16,
                border: "none",
                color: "white",
                cursor: "pointer",
                "&:first-of-type": { bgcolor: "#a4b0be" },
              },
            }}
          >
            <Tooltip title="Bách Hợp Account">
              <Avatar alt="Remy Sharp" src={avatar} />
            </Tooltip>
            <Tooltip title="Bách Hợp Account">
              <Avatar alt="Remy Sharp" src={avatar} />
            </Tooltip>
            <Tooltip title="Bách Hợp Account">
              <Avatar alt="Remy Sharp" src={avatar} />
            </Tooltip>
            <Tooltip title="Bách Hợp Account">
              <Avatar alt="Remy Sharp" src={avatar} />
            </Tooltip>
            <Tooltip title="Bách Hợp Account">
              <Avatar alt="Remy Sharp" src={avatar} />
            </Tooltip>
            <Tooltip title="Bách Hợp Account">
              <Avatar alt="Remy Sharp" src={avatar} />
            </Tooltip>
            <Tooltip title="Bách Hợp Account">
              <Avatar alt="Remy Sharp" src={avatar} />
            </Tooltip>
            <Tooltip title="Bách Hợp Account">
              <Avatar alt="Remy Sharp" src={avatar} />
            </Tooltip>
          </AvatarGroup>
        </Box>
      </Box>
    </div>
  );
}

export default BoardBar;
