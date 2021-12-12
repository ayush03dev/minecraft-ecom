import React, { useState } from 'react';
import { Button, IconButton, Menu, MenuItem, AppBar, Toolbar, Typography, useMediaQuery, createStyles, Container } from '@mui/material';
import { Box } from '@mui/system';
import { useTheme } from '@emotion/react';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from 'react-router-dom';

const styles = {

    navWrapper: {
        display: {
            md: 'block',
            xs: 'none'
        }
    },

    menu: {
        display: {
            md: 'none',
            xs: 'block-inline'
        }
    },

    navButton: {
        padding: '1rem 1.5rem',
        // margin: '0 1rem'
    }
}

function Navbar() {
    const [isOpen, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const onClick = event => {
        setOpen(!isOpen);
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false)
      };

    if (!isMobile && isOpen) {
        setOpen(false);
    }
    return (
        <div>
            <AppBar position='static' sx={{background: '#171C28', padding: '1rem 0'}}>
            <Container maxWidth='lg'>
                <Toolbar>

                <Box component="div" sx={{ color: 'white', flexGrow: '1' }}>
                <img src='/concordia2.png' style={{width:'200px'}} alt='logo'/>

                </Box>
                <Box sx={styles.navWrapper}>

                <Button sx={styles.navButton} color="inherit">Home</Button>
                <Button component={Link} to={'/store/category/ranks'} sx={styles.navButton} color="inherit">Store</Button>          
                </Box>
                <div>
                {isMobile ? <IconButton onClick={onClick} color='inherit'><MenuIcon/></IconButton> : <></>}
                    <Menu
                    open={isOpen}
                    onClose={handleClose}
                    anchorEl={anchorEl}
                    sx={{'.MuiMenu-paper': {
                        background: '#171C28',
                        color: 'white',
                        padding: '1rem'
                    }}}
                   >
                    <MenuItem>Home</MenuItem>
                    <MenuItem>Store</MenuItem>
                    <MenuItem>About</MenuItem>
                    </Menu>
                </div>
                </Toolbar>
                </Container>
            </AppBar>
        </div>
    )
}

export default Navbar;
