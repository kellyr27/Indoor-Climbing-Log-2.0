export const sortAreasAscendingName = (areas) => {
    const sortedAreas = areas.sort((a, b) => {
        return a.name.localeCompare(b.name);
    })

    return sortedAreas;
}