import { NavLink } from "react-router-dom";

const SidebarItem = ({ url, children }) => {
    const activeCss = "flex items-center gap-2 rounded px-3 py-2 text-sm font-medium bg-gray-100";
    const unActiveCss = "flex items-center gap-2 rounded px-3 py-2 text-sm font-medium";
    return (
        <NavLink
            to={url}
            className={({ isActive }) => (isActive ? activeCss : unActiveCss)}>
            {children}
        </NavLink>
    );
}

export default SidebarItem;