import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function Home() {


    //
    const [substations, setSubstation] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        loadSubstations();
        getIPPC();
    }, [])

    const loadSubstations = async () => {
        const result = await axios.get("http://localhost:8090/substation/list_all_substation");
        setSubstation(result.data);
    }

    const deleteSubstation = async (id) => {
        await axios.delete(`http://localhost:8090/substation/${id}`);
        loadSubstations();
    }

    const [interfaceAndIPC, SetInterface] = useState("");

    const getIPPC = async () => {
        const interfaceAndIPC = await axios.get("http://localhost:8090/ping/ipDevice")
        SetInterface(interfaceAndIPC.data);
    }

    const lines = interfaceAndIPC.split('\n').filter(line => line.trim() !== '');

    return (
        <div className='container-fluid'>
            <div className="row gx-5">
                <div className="col bg-warning-subtle rounded-4">
                    <div className="text-center">Interfaces your PC
                    </div>
                    <div className="text-start p-3">
                        {lines.map((line, index) => (
                            index % 2 === 0 && (
                                <div key={index}>
                                    {line} {lines[index + 1]}
                                </div>
                            )
                        ))}
                    </div>
                </div>
                <div className="col">
                    <div className="p-3"></div>
                </div>
            </div>
            <div className='container'>
                <div className='py-4'>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Substation</th>
                                <th scope="col">IP IED</th>
                                <th scope="col">Description</th>
                                <th scope="col">Last result</th>
                                <th scope="col">Last data result</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                substations.map((substation, index) => (
                                    <tr>
                                        <th scope="row" key={index}>{index + 1}</th>
                                        <td>{substation.name}</td>
                                        <td>
                                            <a href={`http://${substation.pingId}`} target="_blank" rel="noopener noreferrer">
                                                {substation.pingId}
                                            </a>
                                        </td>
                                        <td>{substation.description}</td>
                                        <td>{substation.lastResultPing ? "Устройство в сети" : "Устройство не в сети"}</td>
                                        <td>{substation.lastDataPing}</td>
                                        <td>
                                            <Link type="button" class="btn btn-primary mx-2"
                                                to={`/substation/ping/${substation.id}`}
                                            >Ping</Link>
                                            <Link type="button" class="btn btn-warning mx-2"

                                                to={`/edit_information/${substation.id}`}
                                            >Edit</Link>
                                            <button
                                                class="btn btn-danger mx-2"
                                                onClick={() => deleteSubstation(substation.id)}
                                            >
                                                Delite</button>
                                        </td>
                                    </tr>
                                ))
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
