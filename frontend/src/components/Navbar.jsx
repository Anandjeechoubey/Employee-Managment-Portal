import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="navbar">
            <h2>Employee Managment Portal</h2>
            <div>
                <NavLink exact to={"/create"} className="nav" activeClassName="nav__selected">
                    Add Employee
                </NavLink>
                <NavLink exact to={"/"} className="nav" activeClassName="nav__selected">
                    List Employee
                </NavLink>
                <NavLink exact to={"/logout"} className="nav" activeClassName="nav__selected">
                    Logout
                </NavLink>
            </div>
        </div>
    )
}

export default Navbar
