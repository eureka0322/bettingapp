import * as React from 'react';
import axios from 'axios';
import {Card, CardHeader, CardContent, Typography, Box} from '@mui/material'
import { makeStyles  } from 'tss-react/mui';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const useStyles = makeStyles()((theme) => {
  return {
    tableCell: {
      padding: 8
    },
    cardContent: {
      padding: 8,
      "& > :last-child": {
        paddingBottom: 8,
      },
    }
  }
});

export default function MoneylineTab() {
  const {classes} = useStyles();
  const [betevoList, setBetevoList] = React.useState([]);

  const getAllList = async () => {
    try {
      await axios
        .get('https://betting-app-tl.onrender.com/api/moneyline')
//        .get('http://localhost:5000/api/moneyline')
        .then((response) => {
          setBetevoList(response.data);
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  React.useEffect(() => {
    getAllList();
  }, []);

  return (
    <Box sx={{width: '100%'}}>
      {
        betevoList.map((betevo)=> (
          <Card key={betevo.key} sx={{border: '1px solid #3b82f6', marginTop: 2}}>
            <CardHeader
              title={betevo.visitor_team+' VS '+betevo.home_team}
              titleTypographyProps={{variant:'subtitle2' }}
              sx={{
                background: '#3b82f6',
                color: 'white',
                padding: '8px 16px'
              }}
            >
            
            </CardHeader>
            <CardContent className={classes.cardContent}>
              <Table sx={{minWidth: 320}} aria-label='betting app table'>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableCell}>Team</TableCell>
                    <TableCell className={classes.tableCell}>BETEVO88</TableCell>
                    <TableCell className={classes.tableCell}>SPORTS411</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={betevo.key+"1"}>
                    <TableCell className={classes.tableCell}>{betevo.visitor_team}</TableCell>
                    <TableCell className={classes.tableCell}>{betevo.betevo_visitor_money_line_info}</TableCell>
                    <TableCell className={classes.tableCell}>{betevo.sport_visitor_money_line_info}</TableCell>
                  </TableRow>
                  <TableRow key={betevo.key+"2"}>
                    <TableCell className={classes.tableCell}>{betevo.home_team}</TableCell>
                    <TableCell className={classes.tableCell}>{betevo.betevo_home_money_line_info}</TableCell>
                    <TableCell className={classes.tableCell}>{betevo.sport_home_money_line_info}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))
      }
    </Box>
  );
}
