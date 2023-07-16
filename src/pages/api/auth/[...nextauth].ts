import { baseQuery } from "@/services";
import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
        maxAge: 24*60*60
    },
    secret: process.env.AUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: 'Password' }
            },
            authorize: async (credentials, req) => {
                try {
                    const {email, password} = credentials as {email: string, password: string};
                    const res = await baseQuery.post('/auth/token', {
                        email: email,
                        password: password
                    });
                    
                    try {
                        const profileRes = await baseQuery.get('/auth/profile', {
                            headers: {
                                Authorization: `Bearer ${res.data.access}`
                            }
                        });

                        const user = profileRes.data.data;
                        user.access = res.data.access;
                        user.refresh = res.data.refresh;
                        return user;                        
                        
                    } catch(err: any) {
                        throw new Error('Something Went Wrong!');
                    }
                } catch(err: any) {                    
                    throw new Error(err.response.data.message.detail);
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/login'
    },
    callbacks: {
        jwt: async ({token, user}) => {
            return {...token, ...user};
        },
        session: async ({session, token, user}) => {
            session.user = token as any;            
            return session;
        }
    }
}

export default NextAuth(authOptions);