const SidebarItem = ({ children }) => {

    return (
        <div className="flex items-center gap-2 rounded px-3 py-2 text-sm font-medium">
           {children}
        </div>
    );
}

export default SidebarItem;