'use client'
import { useTranslations } from 'next-intl';

const Text = ({ localeParent, localeKey, params }: { localeParent: string, localeKey: string, params?: any }) => {
    const t = useTranslations(localeParent);

    if (params) {
        return t(localeKey, params);
    } else {
        return t(localeKey);
    }
}

export default Text