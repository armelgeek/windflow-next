export const formatRelativeDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    
    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    
    if (diffInMs < minute) return 'à l’instant';
    if (diffInMs < hour) return `il y a ${Math.floor(diffInMs / minute)} min`;
    if (diffInMs < day) return `il y a ${Math.floor(diffInMs / hour)} h`;
    if (diffInMs < week) return `il y a ${Math.floor(diffInMs / day)} j`;
    if (diffInMs < month) return `il y a ${Math.floor(diffInMs / week)} sem`;
  
    return date.toLocaleDateString('fr-FR');
};
