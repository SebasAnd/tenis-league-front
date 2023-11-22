import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {cookies} from 'next/headers';



export const options: NextAuthOptions ={
    
    providers : [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
          }),
          CredentialsProvider({
            name:"Credentials",
            credentials: {
                username:{
                    label: "Username",
                    type: "text",
                    placeholder : "your-username"
                },
                password:{
                    label: "Password",
                    type: "password",
                    placeholder : "your-password"
                }
            },
            async authorize(credentials, req){
                try {
                    const res = await fetch(process.env.APP_URL+"/checkUser" ,{
                        method: 'POST', 
                        headers: {
                          'Content-Type': 'application/json',
                          // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: JSON.stringify({username:credentials?.username, password:credentials?.password})
                    });                
                    const data = await res.json();
                    const user = data[0];
                    
                    if(credentials?.username === user.email && credentials?.password === user.password){
                        const cookiesList = cookies() as any;
                        user['image'] = "" +user.is_admin;                   
                        return user as any;
                        
    
                    }
                    else{
                        return null;
    
                    }
                 }catch (error) {
                    return null;
                 }
                
            }


          }),
          

    ]
}