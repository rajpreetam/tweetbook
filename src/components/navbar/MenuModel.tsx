import { ChartBarSquareIcon, DocumentTextIcon, UserCircleIcon, UserGroupIcon, UsersIcon } from "@heroicons/react/24/outline";
import { FunctionComponent } from "react";

interface MenuModelProps {
    clicked: boolean;
};

const MenuModel: FunctionComponent<MenuModelProps> = ({clicked}) => {
    return (
        <div className={`absolute top-10 -right-4 pl-4 pr-10 py-4 rounded-md shadow-lg z-10 ${clicked ? 'flex' : 'hidden'} flex-col bg-gray-200 dark:bg-slate-800`}>
            <div className="flex items-center cursor-pointer space-x-4 lg:hidden">
                <ChartBarSquareIcon className="h-6 w-6" />
                <h1>Activity</h1>
            </div>
            <div className="flex items-center cursor-pointer space-x-4 lg:hidden mt-4">
                <UserCircleIcon className="h-6 w-6" />
                <h1>Members</h1>
            </div>
            <div className="flex items-center cursor-pointer space-x-4 mt-4 lg:mt-0">
                <UserGroupIcon className="h-6 w-6"/>
                <h1>Groups</h1>
            </div>
            <div className="flex items-center cursor-pointer space-x-4 mt-4">
                <DocumentTextIcon className="h-6 w-6" />
                <h1>Page</h1>
            </div>
        </div>
    )
};

export default MenuModel;