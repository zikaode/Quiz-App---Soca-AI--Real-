import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { actions as userQuizSliceActions } from '../store/userQuiz.slice'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const Result = () => {
    const [leader, setLeader] = useState([]);
    const [rank, setRank] = useState(0);
    const dispatch = useDispatch();
    const userQuiz = useSelector(state => state.userQuiz);
    const getLeader = async () => {
        if (userQuiz.name) {
            try {
                const resPost = await axios.post('http://localhost:8000/quiz_history', {
                    quiz_id: userQuiz.data._id,
                    username: userQuiz.name,
                    join_at: userQuiz.joinAt,
                    answer: {
                        correct: userQuiz.result.correct,
                        unCorrect: userQuiz.result.unCorrect,
                        detail: [...userQuiz.answer]
                    },
                    score: userQuiz.result.score
                });
                const resGet = await axios.get(`http://localhost:8000/quiz_history/${userQuiz.data._id}`);
                setLeader([...resGet.data]);
                setRank(resPost.data.rank);
            } catch (error) {
            }
        }
    };
    useEffect(() => {
        getLeader()
    }, []);
    return (
        <div>
            <h3 className='text-center mt-5'>Quiz Result</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Nama : </td>
                        <td>{userQuiz.name}</td>
                    </tr>
                    <tr>
                        <td>Rangking : </td>
                        <td>{rank + 1}</td>
                    </tr>
                    <tr>
                        <td>Jawaban Benar : </td>
                        <td>{userQuiz.result.correct}</td>
                    </tr>
                    <tr>
                        <td>Jawaban Salah : </td>
                        <td>{userQuiz.result.unCorrect}</td>
                    </tr>
                    <tr>
                        <td>Tidak Dijawab : </td>
                        <td>{userQuiz.result.unCheck}</td>
                    </tr>
                    <tr>
                        <td>Total Score : </td>
                        <td>{userQuiz.result.score}</td>
                    </tr>
                </tbody>
            </table><div className='d-flex gap-2'>
                <Link type="button" className="btn btn-secondary" style={{ flexBasis: '50%' }} to={'/'}>Kembali</Link>
                <Link type="button" className="btn btn-primary" style={{ flexBasis: '50%' }} to={'/quiz/' + userQuiz.data._id}>Ulangi</Link>
            </div >
            <hr />
            <h3 className='my-3 text-center'>LeaderBoard</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {leader ? leader.map((x, index) => {
                        return (<tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{x.username}</td>
                            <td>{x.score}</td>
                        </tr>);
                    }) : ''}
                </tbody>
            </table>
        </div >
    );
}

export default Result;
