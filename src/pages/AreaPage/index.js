import React from 'react';

import Template1 from '../../templates/Template1';
import AreaCard from './components/AreaCard';
import CreateAscentFab from '../../components/CreateAscentFab/CreateAscentFab';

const AscentPage = () => {

    return (
        <>
            <Template1>
                <AreaCard />
            </Template1>
            <CreateAscentFab />
        </>
    );
}

export default AscentPage;