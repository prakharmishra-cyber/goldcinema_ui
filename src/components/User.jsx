import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Switch from '@material-ui/core/Switch';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Box, Button, InputAdornment, TextField, Modal } from '@material-ui/core';
import { Search, Visibility, Block, Edit, Close } from '@material-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { collection, getDocs, doc, updateDoc, increment, addDoc, query, startAt, endAt, orderBy, limit, where, startAfter, endBefore, limitToLast } from 'firebase/firestore';
import db from '../firebase/config.js'
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { AmountContext } from '../App.js';
import axios from 'axios';
import BASE_URL from '../api_url.js';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));



export default function User() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(true);
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [new_balance, setNew_balance] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [CurrBalanceId, setCurrBalanceId] = useState(null);
    const [CurrBalance, setCurrBalance] = useState(0);
    const [searchField, setSearchField] = useState('');
    const [start, setStart] = useState(1);
    const [end, setEnd] = useState(10);
    const amountDetails = useContext(AmountContext);
    const [lastItem, setLastItem] = useState(0);
    const [startItem, setStartItem] = useState(null);
    const [pageData, setPageData] = useState(null);

    
    const getUsers = async () => {
        const options =  {
            page: 1,
            limit: 10, 
        };
        const users_data = await axios.post(`${BASE_URL}/get_paginated_user`, {
            options
        }).then(({data})=>data);
        //console.log(users_data);
        var temp = []; 
        setPageData(users_data);
        users_data.docs.forEach((doc) => {
            temp = [...temp, { ...doc, user_id: doc._id }];
        });
        setRows(temp);
    }

    const getNextPage = async() => {

        if(pageData.hasNextPage===false) {
            return;
        }
        const options =  {
            page: pageData.nextPage,
            limit: 10, 
        };
        const users_data = await axios.post(`${BASE_URL}/get_paginated_user`, {
            options
        }).then(({data})=>data);
        //console.log(users_data);
        var temp = []; 
        setPageData(users_data);
        users_data.docs.forEach((doc) => {
            temp = [...temp, { ...doc, user_id: doc._id }];
        });
        setRows(temp);
    }

    const getPrevPage = async() => {
        if(pageData.hasPrevPage===false) {
            return;
        }
        const options =  {
            page: pageData.prevPage,
            limit: 10, 
        };
        const users_data = await axios.post(`${BASE_URL}/get_paginated_user`, {
            options
        }).then(({data})=>data);
        //console.log(users_data);
        var temp = []; 
        setPageData(users_data);
        users_data.docs.forEach((doc) => {
            temp = [...temp, { ...doc, user_id: doc._id }];
        });
        setRows(temp);
    }

    const getUsers_cstm = async () => {
        if(searchField.length===0) {
            getUsers();
            return;
        }
        const filtered = await axios.post(`${BASE_URL}/search_users`, { searchField:searchField }).then(({data})=>data);
        //console.log(filtered);
        var temp = [];
        filtered.forEach((doc) => {
                temp = [...temp, { ...doc, user_id: doc._id }];    
                setRows(temp); 
        });
        
    }

    useEffect(() => {
        if (localStorage.getItem('name') === null) {
            navigate('/dummyUser/Login');
        }
        getUsers();
    }, []);


    useEffect(()=>{
        getUsers_cstm();
    },[searchField]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const updateBalance = async () => {
        
        if (new_balance >= 0) {
            await axios.post(`${BASE_URL}/update_balance`, {
                new_balance: new_balance,
                user_id: CurrBalanceId
            })
                .then((responses) => {
                    toast('Balance Updated Successfully!');
                    getUsers();
                    setNew_balance(0);
                    setIsVisible(false);
                    setCurrBalanceId('');
                    document.getElementById('balance_input').value = 0;
                })
                .catch((err) => toast('Something went wrong', err))
        }

    }

    const blockUser = async(UserId) => {
        await axios.post(`${BASE_URL}/add_blocked_users`, {
            user_id:UserId
        })
        .then(()=>toast('User Blocked'))
        .catch((error)=>toast('Something went wrong'));
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        User
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: '1', justifyContent: 'end' }}>
                        <Typography variant="div" sx={{ fontSize: '10px' }}>Automatic</Typography>
                        <Switch />
                        <Typography variant='div' sx={{ fontSize: '10px' }}>Manual</Typography>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <Typography>RTR Dashboard</Typography>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {['Dashboard', 'Withdrawals', 'Amount Setup', 'User', 'Transactions', 'Access', 'Feedback', 'Logout'].map((text, index) => (
                        <Link to={`/dummyUser/${text}`}>
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        </Link>
                    ))}
                </List>

            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />

                <Box>
                    <TextField
                        placeholder='Search'
                        variant='outlined'
                        fullWidth
                        onChange={e=>setSearchField(e.target.value)}
                        InputProps={
                            {
                                endAdornment:
                                    <InputAdornment>
                                        <Search />
                                    </InputAdornment>
                            }

                        }
                    />
                </Box>

                <Box className='mt-5'>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table" size='small'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Mobile Number</TableCell>
                                    <TableCell align="right">Referal Code</TableCell>
                                    <TableCell align="right">Verified</TableCell>
                                    <TableCell align="right">Wallet Amount</TableCell>
                                    <TableCell align='right'>Withdrawal Password</TableCell>
                                    <TableCell align='right'>Login Password</TableCell>
                                    <TableCell align="right">Short Plans (No.)</TableCell>
                                    <TableCell align="right">Long Plans (No.)</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.reverse().map((row, row_index) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.mobno}
                                        </TableCell>
                                        <TableCell align="right">{row.user_invite}</TableCell>
                                        <TableCell align="right">Yes</TableCell>
                                        <TableCell align="right">{"Rs." + row.balance}</TableCell>
                                        <TableCell align='right'>{row.wpwd}</TableCell>
                                        <TableCell align='right'>{row.pwd}</TableCell>
                                        <TableCell align="right">{row.boughtShort}</TableCell>
                                        <TableCell align="right">{row.boughtLong}</TableCell>

                                        <TableCell align="right">
                                            <Box sx={{ display: 'flex', justifyContent: "end" }}>
                                                
                                                <IconButton onClick={() => {
                                                    navigate('/dummyUser/user_details', { state: row })
                                                }}><Visibility /></IconButton>
                                                <IconButton onClick={() => {
                                                    //console.log(row.user_id);
                                                    setIsVisible(true);
                                                    setCurrBalanceId(row.user_id);
                                                    setCurrBalance(row.balance)
                                                }}><Edit />

                                                </IconButton>
                                                <IconButton onClick={()=>{
                                                    blockUser(row.mobno)
                                                }}><Block/></IconButton>
                                            </Box>

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box component='div' sx={{mt:1}}>
                        <Paper>
                            <div className='p-2 flex justify-between items-center'>
                                <Button variant='contained' color="primary" onClick={()=>{
                                    getPrevPage();
                                }} >back</Button>
                                <div>{pageData?.page} of {pageData?.totalPages} pages</div>
                                <Button variant='contained' color="primary" onClick={()=>{
                                    getNextPage();
                                    
                                }}>next</Button>
                            </div>
                        </Paper>
                    </Box>
                </Box>
            </main>
            <div className={`border-2 border-gray-200 rounded-lg text-white p-4 ${isVisible ? 'visible' : 'invisible'} 
            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-400`}>
                <div className="text-right">
                    <Close onClick={() => { setIsVisible(false); setNew_balance(0) }} />
                </div>
                <h1 className='mb-2 text-xl'>Update Wallet balance</h1>
                <input onChange={(e) => setNew_balance(e.target.value)} type="number" name="balance" id="balance_input" placeholder='Enter New Balance' className='p-2 rounded-lg text-black outline-none mt-2' />
                <div className='flex gap-2 mt-4'>
                    <button className='bg-green-500 p-2 rounded-lg' onClick={() => {
                        updateBalance();
                    }}>Ok</button>
                    <button className='bg-red-400 p-2 rounded-lg' onClick={() => {
                        setIsVisible(false);
                        setNew_balance(0);
                    }}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
