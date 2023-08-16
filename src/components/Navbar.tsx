import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const options = [
  {
    name: "Textanalyzer",
    path: "/",
  },
  {
    name: "Quote Generator",
    path: "/quote-generator",
  },
  {
    name: "Task Manager",
    path: "/task-manager",
  },
];

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const { palette } = useTheme();
  const [name, setName] = React.useState("Textanalyzer");
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  React.useEffect(() => {
    // get route path to set name
    const path = window.location.pathname;
    if (path === "/") {
      setName("Textanalyzer");
    } else if (path === "/quote-generator") {
      setName("Quote Generator");
    } else if (path === "/task-manager") {
      setName("Task Manager");
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        height: "60px",
        justifyContent: "center",
        backgroundColor: palette.common.white,
      }}
    >
      <Button
        sx={{
          color: palette.primary.contrastText,
          fontSize: "20px",
          fontWeight: "bold",
        }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {name}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.name}
            onClick={() => {
              setName(option.name);
              navigate(option.path);
              handleClose();
            }}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default Navbar;
