export function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
    let timeoutId: ReturnType<typeof setTimeout>;

    return (...args: Parameters<T>) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}


export const onKeyDownPreventPeriodInput = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === '.' || ev.key === ',' || ev.key === ' ') {
        ev.preventDefault();
    }
}