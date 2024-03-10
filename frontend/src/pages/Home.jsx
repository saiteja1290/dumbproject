import React, { useEffect, useState } from 'react';
import axios from "axios";
import Spinner from '../components/spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReact, faNodeJs, faJs } from '@fortawesome/free-brands-svg-icons'

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table');

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/books')
            .then((response) => {
                setBooks(response.data.data);
                // console.log(response.data.data)
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="bg-gray-900 text-white min-h-screen">

            <header className="p-4 text-center">
                <h1 className="text-3xl font-bold">My Bookstore</h1>
            </header>
            <div className='flex justify-center items-center'>
                <h1 className='text-3xl my-8'></h1>
                <Link to='/books/create'>
                    <MdOutlineAddBox className='text-sky-200 text-3xl'></MdOutlineAddBox>
                </Link>
            </div>
            <main className="container mx-auto mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {books.map((book) => (
                        <div
                            key={book.id}
                            className="bg-indigo-900 p-4 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold">{book.username}</h2>
                            <p className="text-grey-100">{book.rating}</p>
                            <div className="mt-4 space-x-2">
                                <button className="bg-purple-600 text-white px-2 py-1 rounded">
                                    <Link to={`/books/details/${book._id}`}>Details</Link>
                                </button>
                                <button className="bg-purple-400 text-white px-2 py-1 rounded">
                                    <Link to={`/books/edit/${book._id}`}>Edit</Link>
                                </button>
                                <button className="bg-purple-600 text-white px-2 py-1 rounded">
                                    <Link to={`/books/delete/${book._id}`}>Delete Book</Link>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <footer className="py-4 text-center text-white-400">
                Made with
                <br />
                <span className='m-2 text-2xl'>mongoDB</span>
                <span className='m-2 text-2xl'>express<FontAwesomeIcon icon={faJs} /></span>
                <span className='m-2 text-2xl'><FontAwesomeIcon icon={faReact} /></span>
                <span className='m-2 text-2xl'><FontAwesomeIcon icon={faNodeJs} /></span>
            </footer>
        </div>
    );
};

export default Home;