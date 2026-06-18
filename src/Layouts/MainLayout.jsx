import React from 'react';
import Navbar from '../Pages/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Pages/Footer';

const MainLayout = () => {
    return (
        <div>
            <div>
                <Navbar></Navbar>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;