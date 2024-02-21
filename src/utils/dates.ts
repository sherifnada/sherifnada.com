
function getDaySuffix(day: number) {
if (day > 3 && day < 21) return 'th'; // handles special cases like 11th, 12th, 13th
switch (day % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
}
}


function formatDate(date: Date) {
// Array of month names to convert month from number to name
const monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];

const day = date.getDate(); // Get day of the month
const monthIndex = date.getMonth(); // Get month (0-based index)
const year = date.getFullYear();
const suffix = getDaySuffix(day);

// Format the date string as "Month, Day, Year"
return `${monthNames[monthIndex]} ${day}${suffix}, ${year}`;
}

export {formatDate};