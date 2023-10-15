import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import SpreadTab from './components/SpreadTab';
import MoneylineTab from './components/MoneylineTab';
import TotalTab from './components/TotalTab';

export default function App() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Spread" value="1" />
            <Tab label="Moneyline" value="2" />
            <Tab label="Over and Under" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <SpreadTab/>
        </TabPanel>
        <TabPanel value="2">
          <MoneylineTab/>
        </TabPanel>
        <TabPanel value="3">
          <TotalTab/>
        </TabPanel>
      </TabContext>
    </Box>
  );
}