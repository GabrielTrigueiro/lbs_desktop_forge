import React from 'react';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import AppsIcon from '@mui/icons-material/Apps';
import ReorderIcon from '@mui/icons-material/Reorder';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../core/redux/store';

interface Props {
  change: () => void;
}

const IOSSwitch = styled((props: SwitchProps & { switchState: boolean }) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme, switchState }) => ({
  width: 50,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    transform: switchState ? 'translateX(1.5em)' : 'none',
    color: '#fff',
    '& + .MuiSwitch-track': {
      backgroundColor: switchState ? '#F2C94C' : '#E0E0E0',
      opacity: 1,
      border: 0,
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.5,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E0E0E0' : '#E0E0E0',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

export const SwitchProductList: React.FC<Props> = ({ change }) => {
  const { switchState } = useSelector((state: RootState) => state.sale);
  
  return (
    <Box sx={{ marginBottom: "7px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
      <IOSSwitch sx={{ mr: 1 }} onClick={change} switchState={switchState} />
      {switchState ? (
        <AppsIcon sx={{ fontSize: '2rem' }} color={"disabled"} />
      ) : (
        <ReorderIcon sx={{ fontSize: '2rem' }} color={"disabled"} />
      )}
    </Box>
  );
};
