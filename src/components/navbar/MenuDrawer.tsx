import {
    XMarkIcon,
    UserIcon,
    ChartBarSquareIcon,
    InboxIcon,
    UserGroupIcon,
    DocumentTextIcon,
    PhotoIcon,
    FolderIcon,
    Cog8ToothIcon,
    UserCircleIcon,
    UsersIcon,
    BellIcon
} from "@heroicons/react/24/outline";
import { FunctionComponent } from "react";
import { Container } from "../ui/Container";
import DrawerMenuAvatar from "./DrawerMenuAvatar";
import { useSession } from "next-auth/react";
import { Logo } from "../ui/Logo";

interface MenuDrawerProps {
    menuBarClicked: boolean
    setMenuBarClicked: (value: boolean) => void;
};

const menuItem = [
    {
        title: 'PERSONAL',
        menu: [
            {
                icon: <UserIcon className="h-6 w-6" />,
                title: 'Profile'
            },
            {
                icon: <ChartBarSquareIcon className="h-6 w-6" />,
                title: 'Timeline'
            },
            {
                icon: <InboxIcon className="h-6 w-6" />,
                title: 'Inbox'
            },
            {
                icon: <BellIcon className="h-6 w-6" />,
                title: 'Notification'
            }
        ]
    },
    {
        title: 'COMMUNITY',
        menu: [
            {
                icon: <UserGroupIcon className="h-6 w-6" />,
                title: 'Groups'
            },
            {
                icon: <DocumentTextIcon className="h-6 w-6" />,
                title: 'Pages'
            }
        ]
    },
    {
        title: 'MEDIA',
        menu: [
            {
                icon: <PhotoIcon className="h-6 w-6" />,
                title: 'Photos'
            },
            {
                icon: <FolderIcon className="h-6 w-6" />,
                title: 'Documents'
            }
        ]
    },
]

const unAuthenticatedMenuItems = [
    {
        icon: <ChartBarSquareIcon className="h-6 w-6" />,
        title: 'Activity'
    },
    {
        icon: <UserCircleIcon className="h-6 w-6" />,
        title: 'Members'
    },
    {
        icon: <UserGroupIcon className="h-6 w-6" />,
        title: 'Groups'
    },
    {
        icon: <DocumentTextIcon className="h-6 w-6" />,
        title: 'Page'
    },
]

const MenuDrawer: FunctionComponent<MenuDrawerProps> = ({
    menuBarClicked,
    setMenuBarClicked
}) => {
    const {data: session, status} = useSession();
    return (
        <div className={`absolute top-0 left-0 w-full h-screen z-20 bg-inherit bg-gray-100 dark:bg-slate-900 md:hidden ${menuBarClicked ? '' : 'hidden'}`}>
            <div className="border-b dark:border-gray-700">
                <Container>
                    <div className="flex items-center justify-between py-6">
                        {status === 'authenticated' ? (
                            <DrawerMenuAvatar />
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Logo size='md' />
                                <div className="flex flex-col">
                                    <p className="font-semibold">Online</p>
                                    <p className="font-semibold">Communities</p>
                                </div>
                            </div>
                        )}
                        <XMarkIcon className="h-6 w-6 cursor-pointer md:hidden" onClick={() => setMenuBarClicked(false)} />
                    </div>
                </Container>
            </div>
            <Container>
                {status === 'authenticated' ? (
                    <div className="flex flex-col space-y-10 py-10">
                        {menuItem.map( item => (
                            <div className="flex flex-col space-y-4" key={item.title}>
                                <h1 className="font-semibold">{item.title}</h1>
                                <div className="flex flex-col space-y-4 px-4">
                                    {item.menu.map(subItem => (
                                        <div key={subItem.title} className="flex items-center space-x-4 cursor-pointer">
                                            {subItem.icon}
                                            <h1>{subItem.title}</h1>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <div className="flex items-center space-x-4 px-4 absolute bottom-10">
                            <Cog8ToothIcon className="h-6 w-6" />
                            <h1>Account Settings</h1>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col space-y-4 p-4">
                        {unAuthenticatedMenuItems.map(item => (
                            <div key={item.title} className={`flex items-center space-x-4 px-4 cursor-pointer ${item.title==='Activity' ? 'unauth-drawer-menu-active' : ''}`}>
                                {item.icon}
                                <h1>{item.title}</h1>
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
};

export default MenuDrawer;