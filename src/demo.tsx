import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import { ButtonBase, Icon, Box, Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem } from "@material-ui/core";

const options = ["Customer Name (New Entry)", "Sales Order No", "Purchase Order No"];

export default function InputAdornments() {
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState<string>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current?.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    handleClose(event);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
    <Box>
      <TextField
        margin="dense"
        placeholder="Search"
        id="outlined-start-adornment"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon>search</Icon>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <ButtonBase
                ref={anchorRef}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                <p>{options[selectedIndex]}</p>
                <Icon>arrow_drop_down</Icon>
              </ButtonBase>
            </InputAdornment>
          )
        }}
        variant="outlined"
      />
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal placement='bottom-end'>
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  {options.map((opt, index) => {
                    return (
                      <MenuItem onClick={event => handleMenuItemClick(event, index)} selected={index === selectedIndex}>
                        {opt}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}
