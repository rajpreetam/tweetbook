import NextAuth from "next-auth";

declare module 'next-auth' {
    interface Session {
        user: {
            id: number;
            user: {
                email: string;
                username: string;
                first_name: string | null;
                last_name: string | null;
            }
            dob: Date | null;
            gender: string | null;
            profile_picture: string;
            cover_picture: string;
            bio: string | null;
            relationship_status: string | null;
            access: string;
            refresh: string;
        }
    }
};