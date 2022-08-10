import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
import avatar from "../../images/avatar1.png";
import companyLogo from "../../images/companyLogo.png";
// import BadgeVisibility from "../../UI/BadgeNotification";


async function logout(e) {
    e.preventDefault();
    console.log(localStorage.getItem("name"));
    console.log(localStorage.getItem("token"));
    const token = localStorage.getItem("token");
    // const name = localStorage.getItem("name");
    console.log(token);
    // console.log(name);
    const res = await fetch("http://localhost:5001/api/admin/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 200) {

      console.log("logout successful");
      localStorage.clear();
      window.location.href = "/login";
    }
    
  
  } 

const pages = [];
const settings = ['Profile', 'Account'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#FCB900', boxShadow: 7, height: 80 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <img src={companyLogo} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}  style={{width:"50px", height:"50px"}}/>
            {/* <BadgeVisibility/> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Cricket
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Cricket
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                
                <Avatar alt="Remy Sharp" src={avatar} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
                ))}
               <MenuItem onClick={logout}>
                    <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;








// 

// export default function MiniSideBar() {
//     const theme = useTheme();
//     const [open, setOpen] = React.useState(false);
//     const [anchorEl, setAnchorEl] = React.useState(null);
//     const open1 = Boolean(anchorEl);
//     const handleDrawerOpen = () => {
//         setOpen(true);
//     };
//     const handleDrawerClose = () => {
//         setOpen(false);
//     };
//     const handleClick = (event) => {
//         setAnchorEl(event.currentTarget);
//     };
//     const handleClose = () => {
//         setAnchorEl(null);
//     };
//     return (
//         <Box sx={{ display: 'flex' }}>
//             <CssBaseline />
//             <AppBar position="fixed" open={open}>
//                 <Toolbar>
//                     <IconButton
//                         color="inherit"
//                         aria-label="open drawer"
//                         onClick={handleDrawerOpen}
//                         edge="start"
//                         sx={{
//                             marginRight: '36px',
//                             ...(open && { display: 'none' }),
//                         }}
//                     >
//                         <MenuIcon />
//                     </IconButton>
//                     <Typography variant="h6" noWrap component="div">
//                         Admin Dashboard
//                     </Typography>
//                     <Box sx={{ flexGrow: 1 }} />
//                     <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
//                         <Tooltip title="Logout">
//                             <IconButton color="inherit" onClick={logout}>
//                                 <ExitToAppIcon />
//                             </IconButton>
//                         </Tooltip>
//                     </Box>
//                     <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
//                         <IconButton
//                             size="large"
//                             aria-label="show more"
//                             id="long-button"
//                             aria-controls="long-menu"
//                             aria-expanded={open1 ? 'true' : undefined}
//                             aria-haspopup="true"
//                             onClick={handleClick}
//                         >
//                             <MoreVertIcon />
//                         </IconButton>
//                         <Menu
//                             id="long-menu"
//                             MenuListProps={{
//                                 'aria-labelledby': 'long-button',
//                             }}
//                             anchorEl={anchorEl}
//                             open={open1}
//                             onClose={handleClose}
//                             PaperProps={{
//                                 sx: {
//                                     width: '20ch',
//                                 },
//                             }}
//                         >
//                             <MenuItem onClick={logout}>
//                                 <ListItemIcon>
//                                     <ExitToAppIcon fontSize="small" />
//                                 </ListItemIcon>
//                                 <Typography variant="inherit">Logout</Typography>
//                             </MenuItem>
//                         </Menu>
//                     </Box>
//                 </Toolbar>
//             </AppBar>
//             <Drawer variant="permanent" open={open}>
//                 <Toolbar

//                     sx={{   
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'flex-end',
//                         px: [1],
//                     }}
//                 >
//                     <IconButton onClick={handleDrawerClose}>
//                         {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
//                     </IconButton>
//                 </Toolbar>
//                 <Divider />
                // <List>
                //     <ListItem button component={Link} to="/dashboard">
                //         <ListItemIcon>
                //             <DashboardIcon />
                //         </ListItemIcon>
                //         <ListItemText primary="Dashboard" />
                //     </ListItem>
                //     <ListItem button component={Link} to="/users">
                //         <ListItemIcon>
                //             <PeopleIcon />
                //         </ListItemIcon>
                //         <ListItemText primary="Users" />
                //     </ListItem>
                //     <ListItem button component={Link} to="/products">
                //         <ListItemIcon>
                //             <ShoppingCartIcon />
                //         </ListItemIcon>
                //         <ListItemText primary="Products" />
                //     </ListItem>
                //     <ListItem button component={Link} to="/orders">
                //         <ListItemIcon>
                //             <BarChartIcon />
                //         </ListItemIcon>
                //         <ListItemText primary="Orders" />
                //     </ListItem>
                //     <ListItem button component={Link} to="/settings">
                //         <ListItemIcon>
                //             <SettingsIcon />
                //         </ListItemIcon>
                //         <ListItemText primary="Settings" />
                //     </ListItem>
                // </List>
//             </Drawer>
//             <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//                 <Toolbar />
//                 {/* <RoutesPage /> */}
//             </Box>
//         </Box>
//     );
// }


