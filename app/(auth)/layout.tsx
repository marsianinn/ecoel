import React from"react";
import type{Metadata}from"next";
import{Inter}from"next/font/google";
import{ClerkProvider}from"@clerk/nextjs";
import{dark}from"@clerk/themes";
import"../globals.css";
const inter = Inter({subsets:["latin"]});
export const metadata: Metadata={
title:"Авторизация ЭкоЭл Journal",
description:"Создайте ваш аккаунт для общения ✨",};
export default function RootLayout({children,
}:{children:React.ReactNode;}){
return (<><head><meta name="yandex-verification" content="7eaf324d55c594d4" /></head><ClerkProvider appearance={{ baseTheme: dark, }}>
    <html lang='en'>
        <body className={`${inter.className} bg-dark-1`}>{children}</body></html>
</ClerkProvider></>);}