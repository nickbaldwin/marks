import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

import './Content.css';

export const Content = () => {
    return (
        <div className="page">
            <Sidebar />

            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};
