import React, { useState } from 'react';
// import BackButton from '../components/BackButton';
// import Spinner from '../components/Spinner';
import Spinner from '../components/spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useSnackbar } from 'notistack';

const CreateBook = () => {
    const [username, setusername] = useState('');
    const [branch, setbranch] = useState('');
    const [overall_rank, setoverall_rank] = useState('');
    const [branch_rank, setbranch_rank] = useState('');
    const [rating, setrating] = useState('');
    const [loading, setloading] = useState(false);

    const navigate = useNavigate();

    const handlebook = () => {
        const data = {
            username,
            branch,
            overall_rank,
            branch_rank,
            rating
        };
        setloading(true);
        axios
            .post('http://localhost:5555/books', data)
            .then(() => {
                setloading(false);
                navigate('/');
            })
            .catch((error) => {
                setloading(false);
                console.log("Error:", error)
            })
    }
    return (
        // <div className='p-4'>
        //     {/* <BackButton /> */}
        //     <h1 className='text-3xl my-4'>Create Book</h1>
        //     {loading ? <Spinner /> : ''}
        //     <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        //         <div className='my-4'>
        //             <label className='text-xl mr-4 text-gray-500'>Title</label>
        //             <input
        //                 type='text'
        //                 value={title}
        //                 onChange={(e) => setTitle(e.target.value)}
        //                 className='border-2 border-gray-500 px-4 py-2 w-full'
        //             />
        //         </div>
        //         <div className='my-4'>
        //             <label className='text-xl mr-4 text-gray-500'>Author</label>
        //             <input
        //                 type='text'
        //                 value={author}
        //                 onChange={(e) => setAuthor(e.target.value)}
        //                 className='border-2 border-gray-500 px-4 py-2  w-full '
        //             />
        //         </div>
        //         <div className='my-4'>
        //             <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
        //             <input
        //                 type='number'
        //                 value={publishyear}
        //                 onChange={(e) => setpublishyear(e.target.value)}
        //                 className='border-2 border-gray-500 px-4 py-2  w-full '
        //             />
        //         </div>
        //         <button className='p-2 bg-sky-300 m-8' onClick={handlebook}>
        //             Save
        //         </button>
        //     </div>
        // </div>
        <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center">
            <div className="bg-purple-900 p-4 rounded-lg shadow-lg w-96">
                <div className="text-center">
                    <h1 className="text-3xl my-4">Edit Book</h1>
                    {/* {loading ? <Spinner /> : ''} */}
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-white-400">username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                        className="border-2 border-white-400 px-4 py-2 w-full focus:outline-none focus:border-purple-600 rounded text-black"
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-white-400">branch</label>
                    <input
                        type="text"
                        value={branch}
                        onChange={(e) => setbranch(e.target.value)}
                        className="border-2 border-white-400 px-4 py-2 w-full focus:outline-none focus:border-purple-600 rounded text-black"
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-white-400">Overall Rank</label>
                    <input
                        type="number"
                        value={overall_rank}
                        onChange={(e) => setoverall_rank(e.target.value)}
                        className="border-2 border-white-400 px-4 py-2 w-full focus:outline-none focus:border-purple-600 rounded text-black"
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-white-400">Branch Rank</label>
                    <input
                        type="number"
                        value={branch_rank}
                        onChange={(e) => setbranch_rank(e.target.value)}
                        className="border-2 border-white-400 px-4 py-2 w-full focus:outline-none focus:border-purple-600 rounded text-black"
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-white-400">Rating</label>
                    <input
                        type="number"
                        value={rating}
                        onChange={(e) => setrating(e.target.value)}
                        className="border-2 border-white-400 px-4 py-2 w-full focus:outline-none focus:border-purple-600 rounded text-black"
                    />
                </div>

                <button
                    className="p-2 bg-purple-600 hover:bg-purple-700 text-white m-8 rounded"
                    onClick={handlebook}
                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default CreateBook
