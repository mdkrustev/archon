import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import EnFlag from './flags/EnFlag'
import DeFlag from './flags/DeFlag'
import { useTranslationContext } from '@/i18n/TranslationContext'


export default function HeaderLanguages() {

    const { switchLanguage, locale } = useTranslationContext()

    return (

        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="w-6 mr-[10px] -mt-[5px] h-auto flex items-center justify-center cursor-pointer">
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
