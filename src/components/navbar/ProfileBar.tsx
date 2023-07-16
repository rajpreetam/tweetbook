import { FunctionComponent } from "react";
import { signOut, useSession } from "next-auth/react";
import {
    ArrowRightOnRectangleIcon,
    BellIcon,
    ChartBarSquareIcon,
    FolderIcon,
    InboxIcon,
    PhotoIcon,
    PlayCircleIcon,
    UserCircleIcon,
    UserGroupIcon,
    UserIcon,
    UsersIcon
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

interface ProfileBarProps {
    profileClicked: boolean;
};

const menuItems = [
    {
        title: 'Profile',
        icon: <UserCircleIcon className="h-6 w-6" />
    },
    {
        title: 'Account',
        icon: <UserIcon className="h-6 w-6" />
    },
    {
        title: 'Timeline',
        icon: <ChartBarSquareIcon className="h-6 w-6" />
    },
    {
        title: 'Notifications',
        icon: <BellIcon className="h-6 w-6" />
    },
    {
        title: 'Messages',
        icon: <InboxIcon className="h-6 w-6" />
    },
    {
        title: 'Friends',
        icon: <UsersIcon className="h-6 w-6" />
    },
    {
        title: 'Groups',
        icon: <UserGroupIcon className="h-6 w-6" />
    },
    {
        title: 'Photos',
        icon: <PhotoIcon className="h-6 w-6" />
    },
    {
        title: 'Documents',
        icon: <FolderIcon className="h-6 w-6" />
    },
    {
        title: 'Videos',
        icon: <PlayCircleIcon className="h-6 w-6" />
    },
];

const ProfileBar: FunctionComponent<ProfileBarProps> = ({
    profileClicked
}) => {
    const {data: session, status} = useSession();
    const router = useRouter();
    const handleLogout = async () => {
        await signOut()
            .then(() => {
                toast.success('Logged Out Successfully!');
            })
            .finally(() => {
                router.push('/');
            });
    };
    return (
        <div className={`absolute ${profileClicked ? 'flex': 'hidden'} flex-col top-14 -right-4 min-w-[300px] rounded-md bg-gray-100 dark:bg-slate-900 z-40 shadow-lg shadow-gray-400 dark:shadow-slate-800 p-4 cursor-default space-y-6`}>
            <div className="flex items-center space-x-2 cursor-pointer">
                <div className="h-10 w-10 bg-purple-500 dark:bg-purple-600 rounded-full" />
                <div className="flex flex-col">
                    <h1 className="font-semibold text-sm">{session?.user.user.first_name}</h1>
                    <p className="font-light text-sm">@{session?.user.user.username}</p>
                </div>
            </div>
            <div className="flex flex-col px-1 space-y-4">
                {menuItems.map(item => (
                    <div key={item.title} className="flex items-center space-x-4">
                        {item.icon}
                        <h1>{item.title}</h1>
                    </div>
                ))}
            </div>
            <div className="border-b dark:border-slate-700" />
            <div
                className="flex items-center space-x-4 cursor-pointer"
                    onClick={handleLogout}
            >
                <ArrowRightOnRectangleIcon className='h-6 w-6'/>
                <p>Logout</p>
            </div>
        </div>
    );
};

export default ProfileBar;