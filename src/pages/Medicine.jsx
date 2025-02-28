import React, { useState } from 'react';
import './Medicine.css';
import Medicines from 'E:/Projects/Project-2/src/components/Medicines.jsx';


const Medicine = () => {
    const [results, setResults] = useState([]);

    return (
        <section className="container section section__height" id="doctors">
         <Medicines/>
        </section>
    );
}

export default Medicine;
