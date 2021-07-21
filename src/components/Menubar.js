import React, { useState } from 'react'
import { withRouter } from "react-router-dom";

import { Menu, Icon } from 'semantic-ui-react';
import './Menubar.css';

const Menubar = ({ history }) => {
    const [activeItem, setActiveItem] = useState('');

    const handleMenuClick = (link) => {
        setActiveItem(link);
        history.push(`/${link}`);
    }

    return (
        <div className="main_menu">

            <Menu icon='labeled' >
                <Menu.Item
                    name='companies'
                    active={activeItem === 'companies'}
                    onClick={() => { handleMenuClick('companies') }}
                >

                    Companies
                </Menu.Item>

                <Menu.Item
                    name='jobs'
                    active={activeItem === 'jobs'}
                    onClick={() => { handleMenuClick('jobs') }}
                >
                    Jobs
                </Menu.Item>

                <Menu.Item
                    name='post-job'
                    active={activeItem === 'post-job'}
                    onClick={() => { handleMenuClick('post-job') }}
                >
                    Post Job
                </Menu.Item>

            </Menu>



        </div>
    )
}

export default withRouter(Menubar);