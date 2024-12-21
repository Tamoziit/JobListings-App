export function timeAgo(postedTime: string): string {
    const currentTime = new Date();
    const postedDate = new Date(postedTime);

    const diffInSeconds = Math.floor((currentTime.getTime() - postedDate.getTime()) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
    };

    for (const [unit, seconds] of Object.entries(intervals)) {
        const count = Math.floor(diffInSeconds / seconds);
        if (count > 0) {
            return `${count} ${unit}${count > 1 ? 's' : ''} ago`;
        }
    }

    return "just now";
}
