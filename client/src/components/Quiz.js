import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { actions as userQuizSliceActions } from '../store/userQuiz.slice'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { dumpQuiz } from '../dump';

const Quiz = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const userQuiz = useSelector(state => state.userQuiz);
    const trace = useSelector(state => state.userQuiz.trace);
    const dispatch = useDispatch();
    const [name, setName] = useState(false);
    const [quiz, setQuiz] = useState('');
    const [correctCheck, setCorrectCheck] = useState(-1);
    const [wrongCheck, setWrongCheck] = useState(-1);
    const [countdown, setCountdown] = useState(0);
    const [timeCountdown, setTimeCountdown] = useState(0);
    const [time, setTime] = useState(0);
    const answer = (x, e) => {
        clearTimeout(countdown);
        setCorrectCheck(userQuiz.data.quiz[trace].correct_answer);
        if (x != userQuiz.data.quiz[trace].correct_answer) {
            setWrongCheck(x);
            dispatch(userQuizSliceActions.setUnCorrect());
        } else dispatch(userQuizSliceActions.setCorrect());
        const timeOut = setTimeout(() => {
            e.target.checked = false;
            dispatch(userQuizSliceActions.setAnswer({ answer: x }));
            dispatch(userQuizSliceActions.nextQuiz(timeOut));
            setCorrectCheck(-1); setWrongCheck(-1);
            setTimeCountdown(time);
            if (trace + 1 >= userQuiz.total) navigate('/result');
        }, 1000);
    }
    const nameChange = (e) => {
        dispatch(userQuizSliceActions.setName({ name: e.target.value }));
    }
    const nameSubmit = (e) => {
        e.preventDefault();
        if (userQuiz.name) {
            setName(true);
            dispatch(userQuizSliceActions.getQuiz(quiz));
            dispatch(userQuizSliceActions.nextQuiz());
            setTimeCountdown(time);
        }
    }
    useEffect(() => {
        axios
            .get(`http://localhost:8000/quiz/${id}`)
            .then(res => {
                console.log(res.status, res.data.time);
                dispatch(userQuizSliceActions.reset());
                setQuiz(res.data);
                setTime(res.data.time);
            })
            .catch(err => {
                if (err.response.status == 422) {
                    navigate('/');
                } else if (err.response.status == 404) {
                    alert(err.response.data.massage);
                    navigate('/');
                }
            });
    }, []);
    useEffect(() => {
        if (userQuiz.total == 0) {
            console.log('Start A Quiz')
        }
        else if (trace < userQuiz.total) {
            const var_countdown = setTimeout(() => {
                dispatch(userQuizSliceActions.setAnswer({ answer: -1 }));
                dispatch(userQuizSliceActions.setUnCheck());
                dispatch(userQuizSliceActions.nextQuiz(var_countdown));
                setCorrectCheck(-1); setWrongCheck(-1);
                setTimeCountdown(time);
                if (trace + 1 >= userQuiz.total) navigate('/result');
            }, time * 1000);
            setCountdown(var_countdown);
        };
        const interval = setInterval(() => {
            setTimeCountdown(timeCountdown => timeCountdown - 0.05);
        }, 50);
        return () => {
            clearInterval(interval);
        }
    }, [trace]);
    return (
        <>
            {name && (trace + 1 <= userQuiz.total) ? <div>
                <div className='mt-5 mx-auto text-center'><h4>Selamat Mengerjakan - {userQuiz.name}</h4></div>
                <div className="card mt-3">
                    <div style={{ height: "4px", width: `${100 * (timeCountdown / time)}%`, backgroundColor: "darkcyan" }}></div>
                    <div className="card-header">
                        <h5 className="card-title">Pertanyaan Ke - ({trace + 1} / {userQuiz.total}) <span style={{ float: "right", clear: "right" }}>{Math.ceil(timeCountdown)}</span></h5>
                        <p className="card-text mt-3">{userQuiz.data.quiz[trace].question}</p>
                    </div>
                    <div className="card-body">
                        <div className="container text-center">
                            <div className="row row-cols-2">
                                <div className="col"><div className={"my-2 py-2 px-3 border rounded-3" + (correctCheck == 0 ? ' bg-success' : '') + (wrongCheck == 0 ? ' bg-danger' : '')}> <div className="form-check">
                                    <input className="form-check-input" type="radio" name="select-answer" id="select-answer1" onClick={(e) => answer(0, e)} />
                                    <label className="form-check-label" htmlFor="select-answer1">
                                        {userQuiz.data.quiz[trace].answer[0]}
                                    </label>
                                </div> </div></div>
                                <div className="col"><div className={"my-2 py-2 px-3 border rounded-3" + (correctCheck == 1 ? ' bg-success' : '') + (wrongCheck == 1 ? ' bg-danger' : '')}> <div className="form-check">
                                    <input className="form-check-input" type="radio" name="select-answer" id="select-answer2" onClick={(e) => answer(1, e)} />
                                    <label className="form-check-label" htmlFor="select-answer2">
                                        {userQuiz.data.quiz[trace].answer[1]}
                                    </label>
                                </div> </div></div>
                                <div className="col"><div className={"my-2 py-2 px-3 border rounded-3" + (correctCheck == 2 ? ' bg-success' : '') + (wrongCheck == 2 ? ' bg-danger' : '')}> <div className="form-check">
                                    <input className="form-check-input" type="radio" name="select-answer" id="select-answer3" onClick={(e) => answer(2, e)} />
                                    <label className="form-check-label" htmlFor="select-answer3">
                                        {userQuiz.data.quiz[trace].answer[2]}
                                    </label>
                                </div> </div></div>
                                <div className="col"><div className={"my-2 py-2 px-3 border rounded-3" + (correctCheck == 3 ? ' bg-success' : '') + (wrongCheck == 3 ? ' bg-danger' : '')}> <div className="form-check">
                                    <input className="form-check-input" type="radio" name="select-answer" id="select-answer4" onClick={(e) => answer(3, e)} />
                                    <label className="form-check-label" htmlFor="select-answer4">
                                        {userQuiz.data.quiz[trace].answer[3]}
                                    </label>
                                </div> </div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : <div className='mt-5'>
                <form onSubmit={nameSubmit} className="my-auto">
                    <div className="input-group mb-5">
                        <input type="text" className="form-control" placeholder="Username" onChange={nameChange} />
                        <button className="btn btn-outline-secondary" type='submit'>Ikuti Quiz</button>
                        <Link className="btn btn-outline-danger" to="/">Kembali</Link>
                    </div>
                </form></div>}
        </>
    );
}

export default Quiz;
