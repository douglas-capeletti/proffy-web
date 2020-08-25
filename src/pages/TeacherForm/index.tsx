import React, { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import PageHeader from '../../Components/PageHeader';
import Input from '../../Components/Input';
import Textarea from '../../Components/TextArea/index';
import Select from '../../Components/Select/index';
import { postClasses } from '../../services/api';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css'

export default function TeacherForm() {

    const history = useHistory();

    const emptyScheduleItem = { week_day: -1, from: '', to: '' }

    const [scheduleItems, setScheduleItems] = useState([emptyScheduleItem])

    const [nameValue, setName] = useState('')
    const [avatarValue, setAvatar] = useState('')
    const [whatsappValue, setWhatsapp] = useState('')
    const [bioValue, setbio] = useState('')
    const [subjectValue, setSubject] = useState('')
    const [costValue, setCost] = useState('')

    function addScheduleItem() {
        setScheduleItems([...scheduleItems, emptyScheduleItem])
    }

    function setScheduleItemInList(position: number, field: string, value: string) {
        const updateScheduleItems = scheduleItems.map((item, index) => {
            if (index === position) {
                return { ...item, [field]: value }
            }
            return item;
        })
        setScheduleItems(updateScheduleItems);
    }

    function handleCreateClass(event: FormEvent) {
        event.preventDefault();

        const body = {
            subject: subjectValue,
            cost: Number(costValue),
            name: nameValue,
            avatar: avatarValue,
            whatsapp: whatsappValue,
            bio: bioValue,
            schedule: scheduleItems
        }
        console.log(body)

        postClasses(body, () => history.push('/'))
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher este formulário."
            />
            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input label="Nome Completo" name="name" value={nameValue} onValueChange={setName} ></Input>
                        <Input label="Avatar" name="avatar" value={avatarValue} onValueChange={setAvatar} ></Input>
                        <Input label="Whatsapp" name="whatsapp" value={whatsappValue} onValueChange={setWhatsapp} ></Input>
                        <Textarea label="Biografia" name="bio" value={bioValue} onValueChange={setbio} ></Textarea>
                    </fieldset>
                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select
                            label="Matéria"
                            name="subject"
                            options={[
                                { label: 'Matemática', value: 'matematica' },
                                { label: 'Química', value: 'quimica' },
                                { label: 'Física', value: 'fisica' }
                            ]}
                            value={subjectValue}
                            onValueChange={setSubject}
                        />
                        <Input label="Custo hora/aula" name="cost" value={costValue} onValueChange={setCost}></Input>
                    </fieldset>
                    <fieldset>
                        <legend>
                            Horários disponíveis
                        <button type="button" onClick={addScheduleItem}>
                                + Novo horário
                        </button>
                        </legend>
                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select
                                        label="Dia da semana"
                                        name="week_day"
                                        value={scheduleItem.week_day}
                                        options={[
                                            { label: 'Domingo', value: '0' },
                                            { label: 'Segunda-feira', value: '1' },
                                            { label: 'Terça-feira', value: '2' },
                                            { label: 'Quarta-feira', value: '3' },
                                            { label: 'Quinta-feira', value: '4' },
                                            { label: 'Sexta-feira', value: '5' },
                                            { label: 'Sábado', value: '6' }
                                        ]}
                                        onValueChange={(value: string) => setScheduleItemInList(index, 'week_day', value)}
                                    />
                                    <Input
                                        name="from"
                                        label="Das"
                                        type="time"
                                        value={scheduleItem.from}
                                        onValueChange={(value: string) => setScheduleItemInList(index, 'from', value)}
                                    />
                                    <Input
                                        name="to"
                                        label="às"
                                        type="time"
                                        value={scheduleItem.to}
                                        onValueChange={(value: string) => setScheduleItemInList(index, 'to', value)}
                                    />
                                </div>
                            );
                        })}
                    </fieldset>
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso Importante!" />
                            Importante<br />
                            Preencha todos os dados.
                        </p>
                        <button type="submit" >Salvar cadastro</button>
                    </footer>
                </form>
            </main>
        </div>
    )
}