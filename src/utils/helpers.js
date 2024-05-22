import {format} from 'date-fns';

// Function to convert date object to d mmm yyyy format
const dateToDisplay = (date) => {
    try {
        return format(new Date(date), 'd MMM yyyy');
    } catch (error) {
        return null
    }
}

const getDifficultyClassification = (grade) => {
    if (grade <= 16) {
        return 0;
    } else if ((grade > 16) && (grade <= 19)) {
        return 1;
    } else if ((grade > 19) && (grade <= 22)) {
        return 2;
    } else if ((grade > 22) && (grade <= 25)) {
        return 3;
    } else {
        return 4;
    }
}

const getDifficultyBackgroundColour = (grade) => {
	const classification = getDifficultyClassification(grade);
    switch (classification) {
        case 0:
            return '#66b320';
        case 1:
            return '#f9e11a';
        case 2:
            return '#f29a14';
        case 3:
            return '#cc2c28';
        case 4:
            return '#9f247b';
		default:
			return '#000000';
    }
}

export {
    dateToDisplay,
	getDifficultyClassification,
	getDifficultyBackgroundColour
};