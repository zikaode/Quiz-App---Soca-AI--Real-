import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

const EditorQuestion = () => {
    const [modal, setModal] = useState(false)
    const [quiz, setQuiz] = useState([])
    const [newQuiz, setNewQuiz] = useState({
        question: "",
        answer: ['', '', '', ''],
        correct_answer: 0,
    })
    const [edit, setEdit] = useState({ status: false, id: 0 })
    const [notif, setNotif] = useState(false)
    const addQuiz = async () => {
        if (!edit.status) {
            setModal(modal => !modal)
            console.log(newQuiz)
        } else {
            setEdit({ status: false, id: 0 })
            setNewQuiz({
                quizName: "",
                description: "",
                score: 0,
                time: 0
            })
        }
    }
    const editQuiz = async (index) => {
        setModal(modal => !modal)
        setEdit({ status: true, id: quiz[index]._id, })
        setNewQuiz({
            ...newQuiz,
            quizName: quiz[index].quizName,
            description: quiz[index].description,
            score: quiz[index].score,
            time: quiz[index].time,
        })
    }
    const deleteQuiz = async (index) => {
        const path = window.location.pathname.split('/')
        try {
            const quizzes = await axios.delete(`http://localhost:8000/question/${quiz[index]._id}`);
            const question = await axios(`http://localhost:8000/question/on/${path[3]}`);
            setQuiz([...question.data]);
        } catch (error) {
            alert('error')
        }
    }
    const saveNewQuiz = async (e) => {
        e.preventDefault()
        if (edit.status) {
            if (newQuiz.quizName && newQuiz.description && newQuiz.score && newQuiz.time) {
                const path = window.location.pathname.split('/')
                try {
                    const saveQuiz = await axios.patch(`http://localhost:8000/quiz/${edit.id}`, newQuiz)
                    const question = await axios(`http://localhost:8000/question/on/${path[3]}`);
                    setQuiz([...question.data]);
                } catch (error) {
                    alert('error')
                }
            }
        } else {
            if (newQuiz.quizName && newQuiz.description && newQuiz.score && newQuiz.time) {
                const path = window.location.pathname.split('/')
                try {
                    const saveQuiz = await axios.post('http://localhost:8000/quiz', newQuiz)
                    const question = await axios(`http://localhost:8000/question/on/${path[3]}`);
                    setQuiz([...question.data]);
                } catch (error) {
                    alert('error')
                }
            }
        }
        setModal(modal => !modal)
        setEdit({ status: false, id: 0 })
        setNewQuiz({
            quizName: "",
            description: "",
            score: 0,
            time: 0
        })
    }
    const getQuizzes = async () => {
        try {
            const path = window.location.pathname.split('/')
            const question = await axios(`http://localhost:8000/question/on/${path[3]}`);
            setQuiz([...question.data]);
            console.log(question)
        } catch (err) {
        }
    };
    useEffect(() => {
        getQuizzes()
    }, []);

    return (
        <div>
            <h1 className='text-center'>EDITOR QUESTION</h1>
            <div className="col">

                <div className="card h-100 mb-3">
                    <div className={`card-body ${(!modal) ? 'd-none' : ''}`}>
                        <form onSubmit={(e) => saveNewQuiz(e)}>
                            <h5 className='text-center'>Pertanyaan</h5>
                            <div className="form-group mb-3">
                                <input type="string" className="form-control" id="question" placeholder="Question : Berapa 20 + 10?" onChange={(e) => setNewQuiz({ ...newQuiz, question: e.target.value })} value={newQuiz.question} />
                            </div>
                            <h5 className='text-center mt-3'>Jawaban</h5>
                            <div className="input-group mb-3">
                                <div className="input-group-text">
                                    <input className="form-check-input mt-0" type="radio" value="0" aria-label="Radio button for following text input" />
                                </div>
                                <input type="string" className="form-control" id="description" placeholder="Answer : A. 10" onChange={(e) => setNewQuiz({ ...newQuiz, answer: [...newQuiz.answer] })} value={newQuiz.answer[0]} />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-text">
                                    <input className="form-check-input mt-0" type="radio" value="1" aria-label="Radio button for following text input" />
                                </div>
                                <input type="string" className="form-control" id="description" placeholder="Answer : B. 20" onChange={(e) => setNewQuiz({ ...newQuiz, answer: ([...newQuiz.answer][1] = e.target.value) })} value={newQuiz.answer[1]} />
                            </div><div className="input-group mb-3">
                                <div className="input-group-text">
                                    <input className="form-check-input mt-0" type="radio" value="2" aria-label="Radio button for following text input" />
                                </div>
                                <input type="string" className="form-control" id="description" placeholder="Answer : C. 30" onChange={(e) => setNewQuiz({ ...newQuiz, answer: ([...newQuiz.answer][2] = e.target.value) })} value={newQuiz.answer[2]} />
                            </div><div className="input-group mb-3">
                                <div className="input-group-text">
                                    <input className="form-check-input mt-0" type="radio" value="3" aria-label="Radio button for following text input" />
                                </div>
                                <input type="string" className="form-control" id="description" placeholder="Answer : D. 40" onChange={(e) => setNewQuiz({ ...newQuiz, answer: ([...newQuiz.answer][3] = e.target.value) })} value={newQuiz.answer[3]} />
                            </div>
                            <h5 className='text-center'>Jawaban</h5>
                            <button className="btn btn-primary" type='submit'>{edit.status ? 'Edit Question' : 'Tambah Question'}</button>
                        </form>
                    </div>
                    <div className="card-footer d-flex justify-content-center" onClick={addQuiz} style={{ cursor: 'pointer' }} >
                        <img className='' src="http://localhost:3000/image/plus.png" height={'16px'} style={{ userSelect: 'none' }} />
                    </div>
                </div>
                {quiz.map((data, index) => {
                    return (
                        <div className="card h-100 mb-3" key={index}>
                            <div className="card-body">
                                <h5 className="card-title">{data.question}</h5>
                                <ul itemType='circle' >
                                    {data.answer.map((dataAnswer, indexAnswer) => {
                                        return (
                                            <li key={indexAnswer} className={(indexAnswer == data.correct_answer) ? 'text-success fw-bold' : ''}>{dataAnswer}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className="card-footer">
                                {/* <div className='mb-3'>
                                    <a href={`http://localhost:3000/quiz/${data._id}`} class="link-info">{`http://localhost:3000/quiz/${data._id}`}</a>
                                </div> */}
                                <div>
                                    <button className="btn btn-sm btn-outline-primary me-3" type='submit' onClick={() => editQuiz(index)}>Edit Quiz</button>
                                    <Link className="btn btn-sm btn-outline-success me-3" to={`/editor/quiz/${data._id}`}>Edit Question</Link>
                                    <button className="btn btn-sm btn-outline-danger me-3 float-end" type='submit' onClick={() => confirm("Anda Akan Menghapus Quiz Ini, Yakin?") ? deleteQuiz(index) : ''}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                    </svg></button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div >
    );
}

export default EditorQuestion;
