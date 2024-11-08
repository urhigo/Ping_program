import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';


export default function PingAllSubstations() {

    const [substations, setSubstation] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadSubstations();
    }, [])

    const loadSubstations = async () => {
        setLoading(true)
        const result = await axios.get("http://localhost:8090/ping/all_substations");
        setSubstation(result.data);
        setLoading(false)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Result ping all substations</h2>
                    {loading ? (
                        <div className="text-center">
                            <ClipLoader size={50} color={"#123abc"} loading={loading} />
                        </div>
                    ) : (
                        <div className="card">
                            <div className="card-header">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Substation</th>
                                            <th scope="col">IP IED</th>
                                            <th scope="col">Last result</th>
                                            <th scope="col">Last data result</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {substations.map((substation, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{substation.name}</td>
                                                <td>{substation.pingId}</td>
                                                <td>{substation.lastResultPing ? "Устройство в сети" : "Устройство не в сети"}</td>
                                                <td>{substation.lastDataPing}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    <Link className="btn btn-primary my-2" to={"/"}>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
