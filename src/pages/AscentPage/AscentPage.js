import React from 'react';

import Template1 from '../../templates/Template1';
import AscentCard from './components/AscentCard';
import CreateAscentFab from '../../components/CreateAscentFab/CreateAscentFab';

const AscentPage = () => {

    return (
        <>
            <Template1>
                <AscentCard />
            </Template1>
            <CreateAscentFab />
        </>
    );
}

export default AscentPage;