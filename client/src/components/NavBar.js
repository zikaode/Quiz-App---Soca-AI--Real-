import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <>
            <div className='d-flex justify-content-between'>
                <div className="fs-2">Flash Quiz - Dzikri Arraiyan</div>
                <div className="fs-2">{(window.location.pathname.includes("/editor")) ? <Link className='btn btn-danger' to={'/'}>Keluar</Link> : <Link className='btn btn-dark' to={'/editor'}>Kelola Quiz</Link>}</div>
            </div>
            <hr />
        </>
    );
}

export default NavBar;
