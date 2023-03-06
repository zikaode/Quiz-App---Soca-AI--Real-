import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

const Editor = () => {
    const [modal, setModal] = useState(false)
    const [quiz, setQuiz] = useState([])
    const [newQuiz, setNewQuiz] = useState({
        quizName: "",
        description: "",
        score: 0,
        time: 0
    })
    const [edit, setEdit] = useState({ status: false, id: 0 })
    const [notif, setNotif] = useState(false)
    const addQuiz = async () => {
        if (!edit.status) {
            setModal(modal => !modal)
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
        try {
            const quizzes = await axios.delete(`http://localhost:8000/quiz/${quiz[index]._id}`);
            const quizzesRefesh = await axios.get('http://localhost:8000/quiz');
            setQuiz([...quizzesRefesh.data]);
        } catch (error) {
            alert('error')
        }
    }
    const saveNewQuiz = async (e) => {
        e.preventDefault()
        if (edit.status) {
            if (newQuiz.quizName && newQuiz.description && newQuiz.score && newQuiz.time) {
                try {
                    const saveQuiz = await axios.patch(`http://localhost:8000/quiz/${edit.id}`, newQuiz)
                    const quizzes = await axios('http://localhost:8000/quiz');
                    setQuiz([...quizzes.data]);
                } catch (error) {
                    alert('error')
                }
            }
        } else {
            if (newQuiz.quizName && newQuiz.description && newQuiz.score && newQuiz.time) {
                try {
                    const saveQuiz = await axios.post('http://localhost:8000/quiz', newQuiz)
                    const quizzes = await axios('http://localhost:8000/quiz');
                    setQuiz([...quizzes.data]);
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
    const getQuestion = async () => {
        try {
            const quizzes = await axios.get('http://localhost:8000/quiz');
            setQuiz([...quizzes.data]);
        } catch (err) {
        }
    };
    useEffect(() => {
        getQuestion()
    }, []);

    return (
        <div>
            <h1 className='text-center'>EDITOR QUIZ</h1>
            <div className="col">
                <div className="card h-100 mb-3">
                    <div className={`card-body ${(!modal) ? 'd-none' : ''}`}>
                        <form onSubmit={(e) => saveNewQuiz(e)}>
                            <div className="form-group mb-3">
                                <input type="string" className="form-control" id="quizName" placeholder="Quiz Name : Math.." onChange={(e) => setNewQuiz({ ...newQuiz, quizName: e.target.value })} value={newQuiz.quizName} />
                            </div>
                            <div className="form-group mb-3">
                                <input type="textarea" className="form-control" id="description" placeholder="Description : This Quiz.." onChange={(e) => setNewQuiz({ ...newQuiz, description: e.target.value })} value={newQuiz.description} />
                            </div>
                            <div className="form-group mb-3">
                                <input type="number" className="form-control" id="score" placeholder="Score (Poin) : 10" onChange={(e) => setNewQuiz({ ...newQuiz, score: e.target.value })} value={newQuiz.score} />
                            </div>
                            <div className="form-group mb-3">
                                <input type="number" className="form-control" id="time" placeholder="Time (second) : 15" onChange={(e) => setNewQuiz({ ...newQuiz, time: e.target.value })} value={newQuiz.time} />
                            </div>
                            <button className="btn btn-primary" type='submit'>{edit.status ? 'Edit Quiz' : 'Tambah Quiz'}</button>
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
                                <h5 className="card-title">{data.quizName}</h5>
                                <p className="card-text">{data?.description ?? "Tidak Ada Deskripsi"}</p>
                            </div>
                            <div className="card-footer">
                                {/* <div className='mb-3'>
                                    <a href={`http://localhost:3000/quiz/${data._id}`} class="link-info">{`http://localhost:3000/quiz/${data._id}`}</a>
                                </div> */}
                                <div>
                                    <button className="btn btn-sm btn-outline-primary me-3" type='submit' onClick={() => editQuiz(index)}>Edit Quiz</button>
                                    <Link className="btn btn-sm btn-outline-success me-3" to={`quiz/${data._id}`}>Edit Question</Link>
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

export default Editor;
