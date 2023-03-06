import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Main = () => {
    const [quiz, setQuiz] = useState([]);
    const getQuizzes = async () => {
        try {
            const quizzes = await axios('http://localhost:8000/quiz');
            setQuiz([...quizzes.data]);
        } catch (err) {
        }
    };
    useEffect(() => {
        getQuizzes();
    }, []);
    return (
        <div className='mt-5'>
            <div className='mt-5'>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {quiz.map((x, index) => {
                        return (
                            <div className="col" key={index}>
                                <div className="card h-100">
                                    <img src={Math.random() > 0.5 ? "http://localhost:3000/image/image-quiz.jpeg" : "http://localhost:3000/image/quiz-1.jpg"} className="card-img-top " alt="http://localhost:3000/image/image-quiz.jpeg" />
                                    <div className="card-body">
                                        <h5 className="card-title">{x.quizName}</h5>
                                        <p className="card-text">{x?.description ?? "Tidak Ada Deskripsi"}</p>
                                    </div>
                                    <div className="card-footer">
                                        <Link className="btn btn-outline-secondary" to={`/quiz/${x._id}`}>Ikuti Quiz</Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Main;