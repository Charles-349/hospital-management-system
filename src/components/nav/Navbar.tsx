
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/images/medlog.jpg';
import { NavLink, useNavigate } from 'react-router-dom';
import type { RootState } from '../../app/store';
import { logout } from '../../features/users/userSlice';

const Navbar = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const userToken = useSelector((state: RootState) => state.user.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAdmin = user?.role === 'admin';
    const isDoctor = user?.role === 'doctor';

    const getProfilePath = () => {
        if (isAdmin) return '/admin/dashboard/profile';
        if (isDoctor) return '/doctor/dashboard/profile';
        return '/user/dashboard/profile';
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div className="navbar bg-gradient-to-br from-blue-700 via-blue-500 to-blue-500 shadow-sm h-20">
            {/* Navbar Start */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" data-test="medical-mobile-menu-bars">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-gray-700 rounded-box w-52 h-[60vh] text-white" data-test="medical-ul-menu">
                        <li className="font-bold text-lg"><NavLink to="/">Home</NavLink></li>
                        <li className="font-bold text-lg"><NavLink to="/about">About</NavLink></li>
                        {userToken && (
                            <li className="font-bold text-lg">
                                <NavLink to={isAdmin ? '/admin/dashboard' : isDoctor ? '/doctor/dashboard' : '/user/dashboard'}>
                                    Dashboard
                                </NavLink>
                            </li>
                        )}
                        <li className="font-bold text-lg"><NavLink to="/contact">Contacts</NavLink></li>
                        {!userToken ? (
                            <>
                                <li className="font-bold text-lg"><NavLink to="/register">Register</NavLink></li>
                                <li className="font-bold text-lg"><NavLink to="/login">Login</NavLink></li>
                            </>
                        ) : (
                            <li>
                                <button className="btn btn-sm btn-error w-full" onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
                <img src={logo} alt="Logo" className="w-15 h-15 ml-8 hidden sm:block rounded-lg" />
            </div>

            {/* Navbar Center */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-white">
                    <li className="font-bold text-lg"><NavLink to="/">Home</NavLink></li>
                    <li className="font-bold text-lg" data-test="desktop-nav-about"><NavLink to="/about">About</NavLink></li>
                    {userToken && (
                        <li className="font-bold text-lg">
                            <NavLink to={isAdmin ? '/admin/dashboard' : isDoctor ? '/doctor/dashboard' : '/user/dashboard'}>
                                Dashboard
                            </NavLink>
                        </li>
                    )}
                    <li className="font-bold text-lg" data-test="desktop-nav-contact"><NavLink to="/contact">Contacts</NavLink></li>
                </ul>
            </div>

            {/* Navbar End */}
            <div className="navbar-end mr-4">
                {!userToken ? (
                    <div className="flex gap-4">
                        <NavLink className="font-bold text-lg text-white" data-test="desktop-nav-register" to="/register">Register</NavLink>
                        <NavLink className="font-bold text-lg text-white" data-test="desktop-nav-login" to="/login">Login</NavLink>
                    </div>
                ) : (
                    <div className="flex items-center gap-3 text-amber-300">
                        <span className="hidden sm:inline font-semibold text-md">
                            {user?.firstName} {user?.lastName}
                        </span>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 h-10 rounded-full ring ring-white ring-offset-2">
                                    <img
                                        alt="User avatar"
                                        src={
                                            user?.image_url ||
                                            'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
                                        }
                                        className="object-cover w-full h-full rounded-full"
                                    />
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white text-gray-800 rounded-box w-52">
                                <li><NavLink to={getProfilePath()}>Profile</NavLink></li>
                                <li><button onClick={handleLogout}>Logout</button></li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
