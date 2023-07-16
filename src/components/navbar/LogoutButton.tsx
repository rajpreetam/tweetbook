import { useRouter } from 'next/router';
import { signOut } from "next-auth/react";
import {ArrowRightOnRectangleIcon} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

const LogoutButton = () => {
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
        <ArrowRightOnRectangleIcon
            className='h-6 w-6 cursor-pointer'
            onClick={handleLogout}    
        />
    );
};

export default LogoutButton;