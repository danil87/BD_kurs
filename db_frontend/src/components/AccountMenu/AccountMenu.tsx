import { Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar } from "@mui/material";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import './AccountMenu.css';

const menuItem = [
    {
        title: 'Общие',
        path: '/cabinet'
    },
    {
        title: 'Дети',
        path: 'child'
    },
    {
        title: 'Записи',
        path: 'record'
    }
];

const AccountMenu = () => {
    const drawerWidth = 240;
    return (
        <Box className="AccountMenu">
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                        position: 'static'
                    },
                }}
                open
            >
                <div>
                    <Toolbar />
                    <List>
                        {menuItem.map((item, index) => (
                            <Link key={index} to={item.path} style={{ textDecoration: 'none' }}>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemText primary={item.title} sx={{ color: 'gray' }} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </div>
            </Drawer>
        </Box >
    );
};

export default AccountMenu;