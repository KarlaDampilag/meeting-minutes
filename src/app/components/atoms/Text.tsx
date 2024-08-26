'use client'
import { useTranslations } from 'next-intl';

const Text = ({ localeParent, localeKey }: { localeParent: string, localeKey: string }) => {
    const t = useTranslations(localeParent);

    return t(localeKey);
}

export default Text