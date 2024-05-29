/**
 * This function sorts an array of ascents in descending order based on the date of the ascent.
 * If two ascents have the same date, it further sorts them based on their creation time.
 * 
 * @param {Array} ascents - The array of ascent objects to be sorted. Each object should have 'date' and 'createdAt' properties.
 * @returns {Array} The sorted array of ascents in descending order.
 */
export const sortAscentsDescendingDate = (ascents) => {
    const sortedAscents = ascents.sort((a, b) => {
        const dateDifference = new Date(b.date) - new Date(a.date);
        if (dateDifference !== 0) {
            return dateDifference;
        } else {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
    })

    return sortedAscents;
}