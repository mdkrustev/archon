import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import EnFlag from './ui/flags/EnFlag'
import DeFlag from './ui/flags/DeFlag'
import { useTranslationContext } from '@/i18n/TranslationContext'


export default function HeaderLanguages() {

    const { switchLanguage, locale } = useTranslationContext()

    return (

        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="mr-[15px] w-full text-center h-auto flex items-center justify-center cursor-pointer mt-0.5">
                    {locale == 'en' && <EnFlag />}
                    {locale == 'de' && <DeFlag />}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => switchLanguage('en')}><EnFlag /> EN</DropdownMenuItem>
                <DropdownMenuItem onClick={() => switchLanguage('de')}><DeFlag /> DE</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}
