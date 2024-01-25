import React, { useState }from 'react';
import { useDispatch } from 'react-redux';

const PlantForm = () => {
    const dispatch = useDispatch();

    const defaultState = {
        name: '',
        kingdom: '',
        clade: '',
        order: '',
        family: '',
        subfamily: '',
        genus: ''
    }
    
    //Initial state is an OBJECT, with keys id and name
    let [newPlant, setPlant] = useState(defaultState);

    const handleNameChange = (event) => {
        //Similar to in redux -- we dont want to get rid of the id field when we update name
        setPlant({...newPlant, [event.target.placeholder]: event.target.value})
    }

    const addNewPlant = event => {
        event.preventDefault();
        dispatch({ type: 'POST_PLANT', payload: newPlant });
        //updates the next plant to have a new id
        setPlant(defaultState);
    }

    // ("name", "kingdom", "clade", "order", "family", "subfamily", "genus")
    return (
        <div>
            <h3>This is the form</h3>
            <form onSubmit={addNewPlant}>
                <input type='text' placeholder='name' value={newPlant.name} onChange={handleNameChange} />
                <input type='text' placeholder='kingdom' value={newPlant.kingdom} onChange={handleNameChange} />
                <input type='text' placeholder='clade' value={newPlant.clade} onChange={handleNameChange} />
                <input type='text' placeholder='order' value={newPlant.order} onChange={handleNameChange} />
                <input type='text' placeholder='family' value={newPlant.family} onChange={handleNameChange} />
                <input type='text' placeholder='subfamily' value={newPlant.subfamily} onChange={handleNameChange} />
                <input type='text' placeholder='genus' value={newPlant.genus} onChange={handleNameChange} />
                <input type='submit' value='Add New Plant' />
            </form>
        </div>
    );
}


export default PlantForm;
