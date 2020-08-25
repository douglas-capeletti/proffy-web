import React from 'react'

import whatsAppIcon from '../../assets/images/icons/whatsapp.svg'
import { Classe, createConnection } from '../../services/api';

import './styles.css'

interface TeacherItemPropos {
    teacher: Classe
}

const TeacherItem: React.FunctionComponent<TeacherItemPropos> = ({ teacher }) => {

    function handleCreateConnection(){
        createConnection({user_id : teacher.user_id})
    }

    return (
        <article className="teacher-item">
            <header>
                <img src="http://lorempixel.com/400/200/" alt="Foto de perfil" />
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>
            <p>
                {teacher.bio}
            </p>
            <footer>
                <p>
                    Preço/Hora:
                    <strong>{`R$ ${teacher.cost},00`}</strong>
                </p>
                <a target="_blank" rel="noopener noreferrer" onClick={handleCreateConnection} href={` https://wa.me/${teacher.whatsapp}?text=Ol%C3%A1%2C%20encontrei%20seu%20perfil%20no%20Proffy%0Apodemos%20conversar%3F`} >
                    <img src={whatsAppIcon} alt="Whatsapp" />
                    Entrar em contato
                </a>
            </footer>
        </article>
    );
}

export default TeacherItem;