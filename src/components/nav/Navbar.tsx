
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/images/medlog.jpg';
import { NavLink, useNavigate } from 'react-router-dom';
import type { RootState } from '../../app/store';
import { logout } from '../../features/users/userSlice';


const Navbar = () => {
    const userrole = useSelector((state: RootState) => state.user.user?.role);
    const userToken = useSelector((state: RootState) => state.user.token);
    const isAdmin = userrole === 'admin';
    const isDoctor = userrole === 'doctor';
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return (
        <div>
            <div className="navbar bg-base-700 shadow-sm h-25 bg-gradient-to-br from-blue-700 via-blue-500 to-blue-500">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul

                            className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow text-base-content bg-gray-700 h-[60vh]">
                            <ul className="menu  px-1">
                                <li className="font-bold text-lg">
                                    <NavLink to="/">Home</NavLink>
                                </li>
                                <li className="font-bold text-lg">
                                    <NavLink to="/about">About</NavLink>
                                </li>

                                <li className="font-bold text-lg">
                                    <NavLink to={isAdmin ? '/admin/dashboard' : isDoctor ? '/doctor/dashboard' : '/user/dashboard'}>
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li className="font-bold text-lg">
                                    <NavLink to="/contact">Contacts</NavLink>
                                </li>
                                {!userToken && (
                                    <>
                                        <li className="font-bold text-lg list-none">
                                            <NavLink to="/register">Register</NavLink>
                                        </li>
                                        <li className="font-bold text-lg list-none">
                                            <NavLink to="/login">Login</NavLink>
                                        </li>
                                    </>
                                )}
                                {userToken && (
                                    <>
                                        <button
                                            className="btn btn-primary flex mx-auto mr-2"
                                            onClick={() => {
                                                dispatch(logout());
                                                navigate("/")
                                            }}
                                        >
                                            LogOut
                                        </button>
                                    </>
                                )}
                            </ul>
                        </ul>
                    </div>


                    <img src={logo} alt="" className="w-30 h-26 ml-8 hidden sm:block " />
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 ">
                        <li className="font-bold text-lg">
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li className="font-bold text-lg">
                            <NavLink to="/about">About</NavLink>
                        </li>
                        <li className="font-bold text-lg">
                            <NavLink to={isAdmin ? '/admin/dashboard' : isDoctor ? '/doctor/dashboard' : '/user/dashboard'}>
                                Dashboard
                            </NavLink>
                        </li>
                        <li className="font-bold text-lg">
                            <NavLink to="/contact">Contacts</NavLink>
                        </li>

                    </ul>
                </div>
                <div className="navbar-end">
                    <div className='flex gap-4 mr-4'>

                        {!userToken && (
                            <>
                                <li className="font-bold text-lg list-none">
                                    <NavLink to="/register">Register</NavLink>
                                </li>
                                <li className="font-bold text-lg list-none">
                                    <NavLink to="/login">Login</NavLink>
                                </li></>)}

                        {userToken && (
                            <>
                                <button
                                    className="btn btn-primary flex mx-auto mr-2"
                                    onClick={() => {
                                        dispatch(logout());
                                        navigate("/")
                                    }}
                                >
                                    LogOut
                                </button>
                            </>
                        )}


                    </div>

                </div>
            </div >
        </div >
    )
}

export default Navbar;