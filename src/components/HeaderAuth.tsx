"use client";

import { useSession, signIn } from "next-auth/react";
import { BanIcon } from "lucide-react"
import { Button } from "./ui/button";

import { LogInIcon } from "lucide-react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useTranslationContext } from "@/i18n/TranslationContext";
import GoogleIcon from "./ui/icons/GoogleIcon";
import HeaderProfile from "./HeaderProfile";

export default function HeaderAuth() {
    
    const { data: session, status } = useSession();
    const { t } = useTranslationContext()

    if (status === "loading") return <div className="p-[5px]">{t('loading')}...</div>;
    return (
        <>
            {session ? (
                <HeaderProfile />
            ) : (
                <AlertDialog>
                    <AlertDialogTrigger className="cursor-pointer flex" asChild>
                        <Button variant={"ghost"} className="text-[18px]">Log In <LogInIcon className="ml-[10px]" size={25} /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-center">{'Login with you Google account'}</AlertDialogTitle>
                            <AlertDialogDescription className="flex justify-center  pt-[10px]">
                                <Button className="cursor-pointer" variant={'outline'} onClick={() => signIn("google")}><GoogleIcon /> {t('signInWith')} Google</Button>
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