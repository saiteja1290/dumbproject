import React, { useEffect, useState } from 'react';
import axios from "axios";
import Spinner from '../components/spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReact, faNodeJs, faJs } from '@fortawesome/free-brands-svg-icons'

const Contest_1 = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table');

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/books')
            .then((response) => {
                // Sort books array in descending order of ratings
                const sortedBooks = response.data.data.sort((a, b) => b.rating - a.rating);

                // Adjust overall rank based on new order
                sortedBooks.forEach((book, index) => {
                    book.overall_rank = index + 1;
                });

                // Adjust branch rank based on new order within each branch
                const branches = {};
                sortedBooks.forEach((book) => {
                    const branch = book.branch;
                    if (!branches[branch]) {
                        branches[branch] = 1;
                    } else {
                        branches[branch]++;
                    }
                    book.branch_rank = branches[branch];
                });

                setBooks(sortedBooks);
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
                <h1 className="text-3xl font-bold">Leaderboard</h1>
            </header>
            {/* Better Table  */}
            <div class="relative overflow-x-auto m-8 rounded-md">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Username
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Branch
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Overall Rank
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Branch Rank
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Rating
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{book.username}</td>
                                <td className="px-6 py-4">{book.branch}</td>
                                <td className="px-6 py-4">{book.overall_rank}</td>
                                <td className="px-6 py-4">{book.branch_rank}</td>
                                <td className="px-6 py-4">{book.rating}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Contest_1;
