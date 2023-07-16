import { useSession } from "next-auth/react";

const DrawerMenuAvatar = () => {
    const {data: session, status} = useSession();
    return (
        <div className="flex items-center space-x-4 cursor-pointer">
            <div className="h-12 w-12 rounded-full bg-purple-500" />
            <div>
                <h1 className="text-lg text-gray-700 dark:text-gray-200">{session?.user.user.username}</h1>
                <p className="text-sm">My Account</p>
            </div>
        </div>
    );
};

export default DrawerMenuAvatar;