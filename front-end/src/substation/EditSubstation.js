import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditSubstation() {

    let navigate = useNavigate();
    const { id } = useParams();

    const [substation, setSubstation] = useState({
        name: "",
        pingId: "",
        description: ""
    });

    const { name, pingId, description } = substation;

    const onInputChange = (e) => {
        setSubstation({ ...substation, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadSubstation();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8090/substation/edit_information/${id}`, substation);
        navigate("/");
    };

    const loadSubstation = async () => {
        const result = await axios.get(`http://localhost:8090/substation/${id}`);
        setSubstation(result.data);
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>
                                Substation
                            </label>
                            <input
                                type={"text"}
                                className='form-control'
                                placeholder='Enter name of substation'
                                name='name'
                                value={name}
                                onChange={(e) => onInputChange(e)} />
                            <label htmlFor='PingId' className='form-label'>
                                ID
                            </label>
                            <input
                                type={"text"}
                                className='form-control'
                                placeholder='Enter id of device'
                                name='pingId'
                                value={pingId}
                                onChange={(e) => onInputChange(e)} />
                            <label htmlFor='Description' className='form-label'>
                                Description
                            </label>
                            <input
                                type={"text"}
                                className='form-control'
                                placeholder='Enter description'
                                name='description'
                                value={description}
                                onChange={(e) => onInputChange(e)} />
                        </div>
                        <button type='submit' className='btn btn-outline-primary'>Submit</button>
                        <Link className='btn btn-outline-danger mx-2' to="/">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
