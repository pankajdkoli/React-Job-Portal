import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import './Navbar.css';
import { Link, withRouter } from 'react-router-dom';

const Navbar = () => {
    return (

        <div className="navbar">

            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className="the_menu_button" color="inherit" aria-label="menu">

                    </IconButton>
                    <Typography variant="h6" className="logo" >
                        Job Portal
                    </Typography>
                    <Link className="post_job" to="/post-job">Post a Job</Link>
                </Toolbar>
            </AppBar>

        </div>
    )
}

export default withRouter(Navbar);