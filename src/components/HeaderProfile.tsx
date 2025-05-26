'use client'

import { LogOutIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useRouter } from 'next/navigation'
import { useTranslationContext } from "@/i18n/TranslationContext"
import { useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'

export default function HeaderProfile() {
  const router = useRouter()
  const { t, locale } = useTranslationContext()
  const { data: session } = useSession()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const getInitials = (name?: string | null) => {
    return name
      ?.split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase() || '?'
  }

  useEffect(() => {
    if (isSigningOut && !session?.user) {
        alert('test')
      router.push(`/${locale}`)
    }
  }, [session?.user, isSigningOut, locale, router])

  const handleSignOut = async () => {
    setIsSigningOut(true)
    await signOut({ redirect: true })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="ml-[15px] pl-[5px] pr-[5px] cursor-pointer outline-none">
        {session?.user?.image ? (
          <Avatar>
            <AvatarImage src={session.user.image} alt={session.user.name || 'Avatar'} />
            <AvatarFallback>{getInitials(session.user.name)}</AvatarFallback>
          </Avatar>
        ) : (
          <Avatar>
            <AvatarFallback>{getInitials(session?.user?.name)}</AvatarFallback>
          </Avatar>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOutIcon className="w-4 h-4 mr-2" />
          {t('signOut')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}