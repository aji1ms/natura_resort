import SideMenu from "../../components/admin/Sidemenu"
import { SIDE_ADMIN_DATA } from "../../utils/Data"

const Dashboard = () => {
    return (
        <div>
            <SideMenu menuData={SIDE_ADMIN_DATA} isFixed={true} />
            Dashboard
        </div>
    )
}

export default Dashboard;
