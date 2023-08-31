import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks:{
        async session({session,user}) {
            // session.tok = '67321774ygrgg42';

            return session;
        }
    }
}

export default NextAuth(authOptions);