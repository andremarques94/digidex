import React, { useEffect } from 'react';
import { useState } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Button, Collapse } from 'reactstrap';

/**
 *
 * digi-api.com/api/v1/digimon/id to get the digimon with specific id
 */

const fetchDigi = async id => {
    const resp = await fetch(`https://www.digi-api.com/api/v1/digimon/${id}`);
    const data = await resp.json();
    return data;
};

const DigiCard = ({ digimon }) => {
    const [desc, setDesc] = useState(undefined);
    const [isOpen, setIsOpen] = useState(false);
    const [img, setImg] = useState();

    const toggle = () => setIsOpen(!isOpen);

    console.log(digimon);

    useEffect(() => {
        fetchDigi(digimon.id).then(resp => {
            setImg(resp.images[0].href);

            setDesc(
                resp.descriptions['1'].language === 'en_us'
                    ? resp.descriptions['1'].description
                    : resp.descriptions['0'].description
            );
        });
    }, [digimon.id]);

    return (
        desc && (
            <Card key={digimon.name} style={{ width: '18rem' }} className="text-center">
                <img alt="Sample" src={img} />
                <CardBody>
                    <CardTitle tag="h5">{digimon.name}</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                        {digimon.level}
                    </CardSubtitle>
                    <Button onClick={toggle} color="warning" style={{ marginBottom: '1rem' }}>
                        {' '}
                        Description{' '}
                    </Button>
                    <Collapse isOpen={isOpen}>
                        <CardBody>{desc}</CardBody>
                    </Collapse>
                </CardBody>
            </Card>
        )
    );
};

export default DigiCard;
