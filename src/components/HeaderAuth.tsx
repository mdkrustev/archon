"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { BanIcon, Camera, GoalIcon, LogIn, LogOutIcon } from "lucide-react"
import { Button } from "./ui/button";
import { useTranslation } from 'react-i18next'

import { LogInIcon } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useTranslationContext } from "@/i18n/TranslationContext";
import Google from "next-auth/providers/google";
import GoogleIcon from "./ui/icons/GoogleIcon";

export default function HeaderAuth() {
    const { data: session, status } = useSession();
    const { t } = useTranslationContext()

    if (status === "loading") return <p>Loading...</p>;
    return (
        <>

            {session ? (
                <>
                    <Button variant={"ghost"} className="cursor-pointer" onClick={() => signOut()}><LogOutIcon /> Sign Out</Button>
                </>
            ) : (
                <AlertDialog>
                    <AlertDialogTrigger className="cursor-pointer flex" asChild>
                        <Button variant={"ghost"}>Log In <LogInIcon className="ml-[10px]" size={25} /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-center">{'Login with you Google account'}</AlertDialogTitle>
                            <AlertDialogDescription className="flex justify-center  pt-[10px]">
                                <Button className="cursor-pointer" variant={'outline'} onClick={() => signIn("google")}><GoogleIcon /> Sign in with Google</Button>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <div className="flex justify-center w-full pt-[10px]">
                                <AlertDialogCancel><BanIcon />{t('cancel')}</AlertDialogCancel>
                            </div>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}

        </>
    );
}