import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';


function PlantList() {
    const dispatch = useDispatch();

    const reduxState = useSelector(store => store.plantList);

    useEffect(() => {
        dispatch({type: 'FETCH_GARDEN'})
    }, []); 

    const handleDelete = (event) => {
        dispatch({type: 'DELETE_PLANT', payload: event.target.id})
    }

    return (
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Kingdom</th>
                        <th>Clade</th>
                        <th>Order</th>
                        <th>Family</th>
                        <th>Subfamily</th>
                        <th>Genus</th>
                        <th></th>
                    </tr>
                {reduxState.map(plant => (
                    <tr key={plant.id}>
                        <td>{plant.name}</td>
                        <td>{plant.kingdom}</td>
                        <td>{plant.clade}</td>
                        <td>{plant.order}</td>
                        <td>{plant.family}</td>
                        <td>{plant.subfamily}</td>
                        <td>{plant.genus}</td>
                        <td><button id={plant.id} onClick={handleDelete}>Delete</button></td>
                    </tr> 
            ))}
                </tbody>
            </table>
    );
}

export default PlantList;
