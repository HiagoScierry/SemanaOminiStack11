import React, {useState} from 'react'
import logoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import './styles.css'
import api from '../../services/api'

export default function NewIncident() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')

    const history = useHistory()
    const ongId = localStorage.getItem('ongId')

    async function handleNewIncident(e){
        e.preventDefault()

        const data = {
            title,
            description,
            value,
        }

        try {
            await api.post('incidents', data, { 
                headers: {
                    Authorization: ongId
                }
            })
            history.push('/profile')
        } catch (error) {
            alert('erro ao cadastrar caso tente novamente')
        }
    }


    return (
        <div className="new-incident-conteiner">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastrar novo caso </h1>
                    <p>Descreva o caso detalhadamente para encontrar um héroi para resolver isso.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para Home

                    </Link>
                </section>
                <form action="">
                    <input 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Titulo do caso" />
                    <textarea 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Descrição" />
                    <input 
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Valor em Reais" />
                     
                    <button className="button" onClick={handleNewIncident}>Cadastrar</button>
                </form>
            </div>
        </div>
    )
}