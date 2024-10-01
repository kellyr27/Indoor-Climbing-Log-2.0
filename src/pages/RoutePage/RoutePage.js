import React from 'react';
import Template1 from '../../templates/Template1';
import RouteCard from './components/RouteCard';
import CreateAscentFab from '../../components/CreateAscentFab/CreateAscentFab';
import BookmarkedAscentsFab from '../../components/BookmarkedAscentsFAB';


const RoutePage = () => {

    return (
        <>
            <Template1>
                <RouteCard />
            </Template1>
            <CreateAscentFab />
            <BookmarkedAscentsFab />
        </>
    );
}

export default RoutePage;