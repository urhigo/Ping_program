import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function PingSubstation() {

  const [substation, setSubstation] = useState({
    name: "",
    pingId: "",
    description: "",
    lastResultPing: "",
    lastDataPing: ""
  });

  const [loading, setLoading] = useState(true)

  const { id } = useParams();

  useEffect(() => {
    loadSubstation();
    loadResultPing();
  }, [id]);

  const loadSubstation = async () => {
    const result = await axios.get(`http://localhost:8090/substation/${id}`);
    setSubstation(result.data);
  };

  const [answer, SetAnswer] = useState("");


  const loadResultPing = async () => {
    setLoading(true)
    const answer = await axios.get(`http://localhost:8090/ping/${id}`)
    SetAnswer(answer.data);
    loadSubstation();
    setLoading(false)
  }

  const lines = answer.split('\n').filter(line => line.trim() !== '');


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Substation Details</h2>

          <div className="card">
            <div className="card-header">
              Details of substation
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name: </b>
                  {substation.name}
                </li>
                <li className="list-group-item">
                  <b>IP: </b>
                  {substation.pingId}
                </li>
                <li className="list-group-item">
                  <b>Details: </b>
                  {substation.description}
                </li>
                <li className="list-group-item">
                  <b>Last result ping: </b>
                  {substation.lastResultPing ? " Устройство в сети" : " Устройство не в сети"}
                </li>
                <li className="list-group-item">
                  <b>Last data ping: </b>
                  {substation.lastDataPing}
                </li>
                {loading ? (
                  <div className="text-center">
                    <ClipLoader size={50} color={"#123abc"} loading={loading} />
                  </div>
                ) : (
                  <li className="list-group-item">
                    <b>Result:</b>
                    <div className="text-start">
                    {lines.map((line, index) => (
                      <div key={index}>{line}</div>
                    ))}
                    </div>
                  </li>)}
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}