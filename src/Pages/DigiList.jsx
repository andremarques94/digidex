import React from 'react';
import {Row} from 'reactstrap';
import DigiCard from './DigiCard';


const DigiList = ({filteredList}) => {
     
    return (
        <Row >
            {filteredList?.map((digi) =>  <DigiCard digimon={digi} />)}
        </Row>
    )
}

export default DigiList;
