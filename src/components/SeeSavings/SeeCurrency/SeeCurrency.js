import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { getShowCoin } from '../../../services/apis/savingsService';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function SeeCurrency({coins}) {
    const [value, setValue] = useState(0);
    const [selectedCurrency, setselectedCurrency] = useState(false);

    const handleChange = (event, newValue) => {
        const coin = event.target.getAttribute('alt')
        setValue(newValue);
        getShowCoin(coin).then(resp => setselectedCurrency(resp)).catch(error => console.log(error))
    };

    return (
        <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                {coins?.map(({img, value}, key) =>(
                    <Tab label={<img src={img} className="tab-currency" alt={value} />} {...a11yProps(key)} key={key}/>
                ))}
            </Tabs>
        </Box>
        {selectedCurrency && (coins?.map((coin, key) =>(
            <TabPanel value={value} index={key} key={key}>
                Monedas de {coin?.value}
                <br/>              
                Cantidad de monedas: {selectedCurrency?.currentAmount}
                <br/>
                Cantidad de dinero: {selectedCurrency?.currentValue}
            </TabPanel>
        )))}
       
        </Box>
    );
}