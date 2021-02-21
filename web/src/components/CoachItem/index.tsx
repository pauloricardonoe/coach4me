import React from 'react';

import api from '../../services/api';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

export interface Coach {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
  class_schedule: [{
    from: number;
    to: number;
    week_day: number;
  }]
}

interface CoachItemProps {
  coach: Coach;
}

const CoachItem: React.FC<CoachItemProps> = ({ coach }) => {
  function createNewConnection() {
    api.post('connections', {
      coach_id: coach.id,
    });
  }

  function minuteToHour(minutos: number) {
    let hora = Math.trunc(minutos / 60);
    let minuto = (hora - (minutos / 60)) * 60;

    return hora.toLocaleString('pt-BR', { minimumIntegerDigits: 2 }) + ':' + minuto.toLocaleString('pt-BR', { minimumIntegerDigits: 2 });
  }

  function dayOfWeek(dia: number) {
    let Dias = [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado'
    ];

    return Dias[dia];
  }


  return (
    <article className="coach-item">
      <header>
        <img src={coach.avatar} alt={coach.name} />
        <div>
          <strong>{coach.name}</strong>
          <span>{coach.subject}</span>
        </div>
      </header>

      <p>{coach.bio}</p>

      <div id="divhorarios">
        <br/>
        <strong>Horários</strong>

        {coach.class_schedule.map((horario) => {
          return <p>{minuteToHour(horario.from)} - {minuteToHour(horario.to)} - {dayOfWeek(horario.week_day)}</p>;
        })}
      </div>

      <footer>
        <p>Preço/Hora
          <strong>R$ {coach.cost}</strong>
        </p>
        
        <a
          target="_blank" 
          onClick={createNewConnection} 
          href={`https://wa.me/${coach.whatsapp}`}
        >
          <img src={whatsappIcon} alt="Whatsapp"/>
          Entrar em contato
        </a>
      </footer>
    </article>
  );
}

export default CoachItem;
