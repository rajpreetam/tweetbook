import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import {
    Bars3Icon,
    MagnifyingGlassIcon,
    BellIcon,
    InboxIcon,
    ChartBarSquareIcon,
    UserCircleIcon,
    UsersIcon,
    DocumentTextIcon,
    EllipsisHorizontalIcon,
    XMarkIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';
import ThemeToggler from "@/components/utils/ThemeToggler";
import LogoutButton from "@/components/navbar/LogoutButton";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import Link from "next/link";
import Avatar from "./Avatar";
import MenuModel from "./MenuModel";
import MenuDrawer from "./MenuDrawer";

const Navbar = () => {
    const {data: session, status} = useSession();
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuModelClicked, setMenuModelClicked] = useState<boolean>(false);
    const [menuBarClicked, setMenuBarClicked] = useState<boolean>(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 0) setIsScrolled(true);
            else setIsScrolled(false);
        });
    }, [window]);
    

    return (
        <div
            className={`w-full ${isScrolled ? 'shadow-lg' : 'border-b dark:border-gray-700'} backdrop-blur-md bg-transparent sticky top-0`}
        >
            <Container>
                <MenuDrawer menuBarClicked={menuBarClicked} setMenuBarClicked={setMenuBarClicked} />
                <div className="flex items-center justify-between py-6">
                    <div className="flex items-center space-x-4">
                        <Bars3Icon className="h-6 w-6 cursor-pointer md:hidden" onClick={() => setMenuBarClicked(true)} />
                        <div className="flex items-center space-x-4 pl-2 sm:pl-10 md:pl-0">
                            <Logo size='md' />
                            <div className="flex md:hidden flex-col">
                                <p className="font-semibold">Online</p>
                                <p className="font-semibold">Communities</p>
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-10">
                        <ChartBarSquareIcon className="h-6 w-6 cursor-pointer hidden lg:block" />
                        <UserCircleIcon className="h-6 w-6 cursor-pointer hidden lg:block" />
                        <UserGroupIcon className="h-6 w-6 cursor-pointer hidden xl:block"/>
                        <DocumentTextIcon className="h-6 w-6 cursor-pointer hidden xl:block" />
                        <div className="relative xl:hidden">
                            {menuModelClicked ? (
                                <XMarkIcon className="h-6 w-6 cursor-pointer" onClick={() => setMenuModelClicked(false)}/>
                            ) : (
                                <EllipsisHorizontalIcon className="h-6 w-6 cursor-pointer" onClick={() => setMenuModelClicked(true)}/>
                            )}
                            <MenuModel clicked={menuModelClicked}/>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <MagnifyingGlassIcon className="h-6 w-6 cursor-pointer" />
                        <ThemeToggler />
                        
                        <div className={`${status==='authenticated' ? 'flex' : 'hidden'} items-center space-x-4`}>
                            <InboxIcon className="h-6 w-6 cursor-pointer hidden md:block" />
                            <BellIcon className="h-6 w-6 cursor-pointer hidden md:block" />
                            <LogoutButton />
                            <Avatar />
                        </div>

                        <div className={`${status==='authenticated' ? 'hidden' : 'flex'} items-center space-x-4`}>
                            <Link className='text-lg hidden md:block font-semibold text-black dark:text-white' href='/auth/login'>Login</Link>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Navbar;