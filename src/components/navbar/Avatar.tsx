import { useSession } from "next-auth/react";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import ProfileBar from "./ProfileBar";

const Avatar = () => {
    const {data: session, status} = useSession();
    const divRef: MutableRefObject<any> = useRef(null);
    const [profileClicked, setProfileClicked] = useState(false);

    useEffect(() => {
        const clickedOutsideHandler = (event: MouseEvent) => {
            if(divRef.current && !divRef.current.contains(event.target)){
                setProfileClicked(false);
            }
        }

        document.addEventListener('mousedown', clickedOutsideHandler);

        return () => {
            document.removeEventListener('mousedown', clickedOutsideHandler);
        };

    }, []);
    return (
        <div
            className="hidden relative md:flex items-center space-x-2 cursor-pointer"
            ref={divRef}
            onClick={() => setProfileClicked(true)}
        >
            <ProfileBar profileClicked={profileClicked} />
            <h1 className="text-lg text-gray-700 dark:text-gray-200 font-semibold underline underline-offset-4">{session?.user.user.username}</h1>
            <div className="h-12 w-12 rounded-full bg-purple-500" />
        </div>
    );
};

export default Avatar;