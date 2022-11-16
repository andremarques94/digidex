import React from 'react';
import { useState } from 'react';
import DigiList from './DigiList';
import Search from './Search';
import { Button } from 'reactstrap';

const fetchDigi = async page => {
    const resp = await fetch(`https://www.digi-api.com/api/v1/digimon?page=${page}`);
    const data = await resp.json();

    return data;
};

const DigiApp = () => {
    const [digimons, setDigimons] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [page, setPage] = useState(0);

    const onClick = () => {
        fetchDigi(page).then(data => {
            setDigimons(prev => [...prev, ...data.content]);
            setFilteredList(prev => [...prev, ...data.content]);
        });
        setPage(prev => prev + 1);
        console.log(digimons);
    };

    const handleOnChange = event => {
        event.preventDefault();
        const elemList = event.target.value;
        const filtered = digimons.filter(elem =>
            elem.name.toLowerCase().includes(elemList.toLowerCase())
        );
        setFilteredList([...filtered]);
    };

    /*const handleOnSubmit = (event) => {
       
        event.preventDefault();
        const newElem = event.target['0'].value;
        setList(elem => [...elem, newElem]);
        setFilteredList(elem => [...elem, newElem]);
        
    }*/

    return (
        <>
            <hr />
            <Search onChange={handleOnChange} />
            <hr />
            <DigiList filteredList={filteredList} />
            <hr />
            <div class="container">
                <div class="row">
                    <div class="col text-center">
                        <Button onClick={onClick} color="primary" size="lg">
                            {' '}
                            MORE{' '}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DigiApp;
