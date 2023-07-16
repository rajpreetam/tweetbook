import { isTokenExpired } from "@/utils";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

const AuthProvider = () => {
    const session = useSession();

    useEffect(() => {
        const encodedAccess = session.data?.user.refresh ?? '';
        if(session.status === 'authenticated' && isTokenExpired(encodedAccess))
            signOut();
                
    }, [session]); 

    return null;
};

export default AuthProvider;