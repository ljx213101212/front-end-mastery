export function trim(value: string ): string {
    return value.replace(/^\s+/, '')
        .replace(/\s+$/, '')
        .replace(/\s{2,}/g, ' ');
}

export function capitalize(value:string): string {
    return value.toUpperCase();
}