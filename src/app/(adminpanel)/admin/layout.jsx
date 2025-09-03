import AdminSidebar from "@/components/adminlayout/AdminSidebar";

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex h-screen">
            <div className="bg-primary text-white">
                <AdminSidebar />
            </div>

            <div className="flex-1 overflow-auto p-4">
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout;
