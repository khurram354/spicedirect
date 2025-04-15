import AdminInfobar from "@/components/adminlayout/AdminInfobar";
import AdminSidebar from "@/components/adminlayout/AdminSidebar";

const DashboardLayout = ({ children }) => {
    return (
        <>
            <AdminSidebar />
            <AdminInfobar />
            {children}
        </>
    )
}
export default DashboardLayout