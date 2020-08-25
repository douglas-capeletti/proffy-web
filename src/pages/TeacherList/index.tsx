import React, { useState, FormEvent } from 'react'

import PageHeader from '../../Components/PageHeader'
import TeacherItem from '../TeacherItem'
import Input from '../../Components/Input'
import Select from '../../Components/Select/index';

import './styles.css'
import { getClasses, Classe } from '../../services/api';

export default function TeacherList() {

    const [teachers, setTeachers] = useState(Array<Classe>())

    const [subjectValue, setSubject] = useState('')
    const [weekDayValue, setWeekDay] = useState('')
    const [timeValue, setTime] = useState('')

    function handleSearchTeachers(event: FormEvent) {
        event.preventDefault();

        getClasses({
            subject: subjectValue,
            week_day: weekDayValue,
            time: timeValue
        }, (result) => setTeachers(result))
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os Proffys disponíveis">
                <form id="search-teachers" onSubmit={handleSearchTeachers}>
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
                    <Select
                        label="Dia da semana"
                        name="week_day"
                        options={[
                            { label: 'Domingo', value: '0' },
                            { label: 'Segunda-feira', value: '1' },
                            { label: 'Terça-feira', value: '2' },
                            { label: 'Quarta-feira', value: '3' },
                            { label: 'Quinta-feira', value: '4' },
                            { label: 'Sexta-feira', value: '5' },
                            { label: 'Sábado', value: '6' }
                        ]}
                        value={weekDayValue}
                        onValueChange={setWeekDay}
                    />
                    <Input type="time" label="Hora" name="time" value={timeValue} onValueChange={setTime} />
                    <button type="submit">
                        Buscar
                    </button>
                </form>
            </PageHeader>

            <main>
                {teachers.map(teacher => <TeacherItem key={teacher.id} teacher={teacher} /> )}
            </main>

        </div>
    )
}