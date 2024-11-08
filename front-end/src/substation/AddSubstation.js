import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AddSubstation() {

    let navigate = useNavigate()


    const [substation, setSubstation] = useState({
        name: "",
        pingId: "",
        description: ""
    })

    const { name, pingId, description } = substation

    const onInputeChange = (e) => {
        setSubstation({ ...substation, [e.target.name]: e.target.value })
    }


    const onSubmit = async (e) => {

        e.preventDefault();
        await axios.post("http://localhost:8090/substation/add_new_substation", substation)
        navigate("/")
    }

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
                                onChange={(e) => onInputeChange(e)} />
                            <label htmlFor='Name' className='form-label'>
                                ID
                            </label>
                            <input
                                type={"text"}
                                className='form-control'
                                placeholder='Enter id of device'
                                name='pingId'
                                value={pingId}
                                onChange={(e) => onInputeChange(e)} />
                            <label htmlFor='Name' className='form-label'>
                                Description
                            </label>
                            <input
                                type={"text"}
                                className='form-control'
                                placeholder='Enter descriprion'
                                name='description'
                                value={description}
                                onChange={(e) => onInputeChange(e)} />
                        </div>
                        <button type='submit' className='btn btn-outline-primary'>Submit</button>
                        <Link className='btn btn-outline-danger mx-2' to="/">Cancel</Link>
                    </form>
                </div>
            </div>

        </div>
    )
}
