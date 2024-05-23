import React from 'react';

import Template1 from '../../templates/Template1';
import CreateAscentFab from '../../components/CreateAscentFab/CreateAscentFab';
import { Paper, Typography } from '@mui/material';
// import DeleteButtonWithDialog from '../../components/DeleteButtonWithDialog/DeleteButtonWithDialog';
import { getAreas, getRoutes, getAscents } from '../../services/apis';
import * as XLSX from 'xlsx';
import MyButton from '../../components/MyButton';


const SettingsPage = () => {

	const handleExportExcel = async () => {
		// Get all user data
		const routesData = await getRoutes()
		const ascentsData = await getAscents()
		const areasData = await getAreas()

		// Manipulate route data to fit excel format
		routesData.forEach(route => {
			delete route._id
			delete route.__v
			delete route.user
			delete route.createdAt
			delete route.updatedAt
			delete route.id
			delete route.ascents

			route.area = route.area.name
		})

		// Manipulate ascent data to fit excel format
		ascentsData.forEach(ascent => {
			delete ascent._id
			delete ascent.__v
			delete ascent.user
			delete ascent.createdAt
			delete ascent.updatedAt

			ascent.routeName = ascent.route.name
			ascent.routeGrade = ascent.route.grade
			ascent.routeArea = ascent.route.area.name

			// Change route date to YYYY-MM-DD format
			const date = new Date(ascent.date)
			ascent.date = date.toISOString().split('T')[0]

			delete ascent.route
		})

		// Manipulate area data to fit excel format
		areasData.forEach(area => {
			delete area._id
			delete area.__v
			delete area.user
			delete area.createdAt
			delete area.updatedAt
			delete area.id
		})

		const routesDataWithNewHeaders = routesData.map(route => {
			return {
				"Name": route.name,
				"Grade": route.grade,
				"Colour": route.colour,
				"Area": route.area
			}
		})
		const ascentsDataWithNewHeaders = ascentsData.map(ascent => {
			return {
				"Date": ascent.date,
				"Route Name": ascent.routeName,
				"Route Grade": ascent.routeGrade,
				"Route Area": ascent.routeArea,
				"Tick Type": ascent.tickType,
				"Notes": ascent.notes
			}
		})
		const areasDataWithNewHeaders = areasData.map(area => {
			return {
				"Name": area.name,
				"Steepness": area.steepnessTags.join(", ")
			}
		})

		// Create a new workbook
		const wb = XLSX.utils.book_new();

		// Convert the data to worksheet
		const routesWs = XLSX.utils.json_to_sheet(routesDataWithNewHeaders);
		const ascentsWs = XLSX.utils.json_to_sheet(ascentsDataWithNewHeaders);
		const areasWs = XLSX.utils.json_to_sheet(areasDataWithNewHeaders);

		// Add the worksheet to the workbook
		XLSX.utils.book_append_sheet(wb, routesWs, "Routes");
		XLSX.utils.book_append_sheet(wb, ascentsWs, "Ascents");
		XLSX.utils.book_append_sheet(wb, areasWs, "Areas");
	
		// Write the workbook to a file

		// get todays date YYYY-MM-DD
		const today = new Date();
		const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
		XLSX.writeFile(wb, `ClimbingLog-${date}.xlsx`);

	}

    return (
        <>

            <Template1>
                <Paper sx={{minHeight: '60vh', borderRadius: 6, m: 2, p: 3, bgcolor: 'rgba(254, 250, 250, 0.95)'}}>
                    <Typography variant="h4" align="center" sx={{ pt: 2, mb: 3, fontWeight: 'bold' }}>
                        Your Settings
                    </Typography>
					<MyButton
						buttonText='Export Data' 
						handleClick={handleExportExcel}
					/>
                    {/* <DeleteButtonWithDialog
                        handleDelete={handleDelete}
                        buttonText="Delete Account"
                        dialogText="Are you sure you want to delete your account? This action cannot be undone."
                    /> */}
                </Paper>
            </Template1>
            <CreateAscentFab />
        </>
    );
}

export default SettingsPage;