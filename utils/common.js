export const formatTimestamp = (mongoTimestamp) => {
    if (!mongoTimestamp) return null;

    const date = new Date(mongoTimestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12; // Convert to 12-hour format and handle midnight (0)

    return `${day} ${month} ${year} • ${hours}:${minutes} ${ampm}`;
};
