import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api'
import './styles.css'

import logoImg from '../../assets/logo.svg'


export default function Profile() {
    const history = useHistory()
    const [incidents, setIncidents] = useState([])
    const ongName = localStorage.getItem('ongName')
    const ongId = localStorage.getItem('ongId')



    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then(Response => {
            setIncidents(Response.data)

        })
    }, [ongId])
    async function handleDeleteIncident(id) {
        try {
          await api.delete(`incidents/${id}`, {
            headers: {
              Authorization: ongId
            }
          });
    
          setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err) {
          alert("Erro ao deletar o caso");
        }
      }

    function handleLogout(){
        localStorage.clear()
        history.push('/')
    }

    return (
        <div className="profile-conteiner">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span>Ben vinda, {ongName}</span>

                <Link className="button" to="/incidents/new"> Cadastrar novo caso</Link>
                <button type='button' onClick={handleLogout}>
                    <FiPower size={18} color="#e02048" />
                </button>
            </header>

            <h1> Casos cadastrados </h1>

            <ul>
                {incidents.map(incidents => (
                    <li key={incidents.id}>
                        <strong>CASO :</strong>
                        <p>{incidents.title}</p>

                        <strong>Descrição :</strong>
                        <p>{incidents.description}</p>

                        <strong>Valor :</strong>
                        <p>{ Intl.NumberFormat('pt-BR' ,{ style : 'currency', currency:'BRL'}).format(incidents.value) }</p>

                        <button type="button" onClick={()=> handleDeleteIncident(incidents.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}