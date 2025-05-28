"use client";

import { useSession, signIn } from "next-auth/react";
import { BanIcon, CircleXIcon, XIcon } from "lucide-react"
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
import AppleIcon from "./ui/icons/AppleIcon";
import { useState } from "react";
import { useDynamicValue } from "@/contexts/DynamicValueContext";

export default function HeaderAuth() {

    const [open, setOpen] = useState(false)
    const { data: session, status } = useSession();
    const { t } = useTranslationContext()

    const {values, setValue} = useDynamicValue()

    if (status === "loading") return <div className="p-[5px]">{t('loading')}...</div>;
    return (
        <>
            {session ? (
                <HeaderProfile />
            ) : (
                <AlertDialog open={values.openLoginForm} onOpenChange={(value) => setValue('openLoginForm', value)}>
                    <AlertDialogTrigger className="cursor-pointer flex" asChild>
                        <Button variant={"ghost"} className="text-[18px]">Log In <LogInIcon className="ml-[10px]" size={25} /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <div className="flex justify-end">
                                <AlertDialogCancel>
                                    <XIcon className="" onClick={() => AlertDialogCancel} />
                                </AlertDialogCancel>
                            </div>
                            <AlertDialogTitle className="text-center">{t('loginFormTitle')}</AlertDialogTitle>
                            <AlertDialogDescription className="flex justify-center  pt-[10px]">
                                <Button className="cursor-pointer" variant={'outline'} onClick={() => signIn("google")}><GoogleIcon />{t('signInWith')} Google</Button>
                            </AlertDialogDescription>
                            <AlertDialogDescription className="flex justify-center  pt-[10px]">
                                <Button className="cursor-pointer" variant={'outline'} onClick={() => signIn("google")}><AppleIcon />{t('signInWith')} Apple</Button>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="pb-[40px]"></AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}

        </>
    );
}