export const formatDate = async (isoDate: string): Promise<string> => {
    const date = new Date(isoDate);
    const formattedDate = date.toLocaleDateString('uk-UA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    return formattedDate;
};

