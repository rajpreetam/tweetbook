import { FunctionComponent, ReactNode } from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loading from "@/components/utils/Loading";
import Navbar from "../navbar/Navbar";
import { Container } from "@/components/ui/Container";

export interface LayoutProps {
    title?: string;
    content?: string;
    children: ReactNode;
};

const Layout: FunctionComponent<LayoutProps> = ({
    title = 'TweetBook',
    content = 'Let\'s connect together on tweetbook - Home',
    children
}) => {
    const router = useRouter();
    const session = useSession();
    
    if(session.status === 'loading') return <Loading />;
    
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta content={content}/>
            </Head>
            <div>
                <Navbar />
                <Container>
                    {children}
                </Container>
            </div>
        </>
    );
};

export default Layout;