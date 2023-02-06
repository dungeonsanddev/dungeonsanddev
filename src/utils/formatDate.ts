export const formatDate = (date: Date | string) => {
    const newDate = new Date(date);
    if (typeof navigator === 'undefined') {
        return newDate.toLocaleDateString('de-DE');
    }
    return Intl.DateTimeFormat(navigator.language || 'de-DE').format(newDate);
}