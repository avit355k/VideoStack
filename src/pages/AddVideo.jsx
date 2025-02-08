import React, { useState } from 'react'
import axios from "axios";

const AddVideo = () => {
    const [Data, setData] = useState({
        "url": "",
        "title": "",
        "price": "",
        "desc": "",
        "genre": "",
        "category": "",
        "language": "",
    });
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const Change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    };
    const submit = async () => {
        try {
            if (Data.url === "" ||
                Data.title === "" ||
                Data.price === "" ||
                Data.desc === "" ||
                Data.genre === "" ||
                Data.category === "" ||
                Data.language === ""
            ) {
                alert("all fields are required");
            } else {
                const response = await axios.post("https://videostack.onrender.com/api/v1/add-video", Data, { headers });
                setData({
                    "url": "",
                    "title": "",
                    "price": "",
                    "desc": "",
                    "genre": "",
                    "category": "",
                    "language": "",
                });
                alert(response.data.message);
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    return (
        <div className="h-[100%] p-4 md:p-4">
            <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
                Add Video
            </h1>
            <div className="p-4 bg-zinc-800 rounded">
                <div>
                    <label className="text-zinc-400">Image</label>
                    <input
                        type="text"
                        className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                        placeholder="URL of the Image"
                        name="url"
                        value={Data.url}
                        onChange={Change}
                    />
                </div>
                <div>
                    <label className="text-zinc-400">Title</label>
                    <input
                        type="text"
                        className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                        placeholder="Title of the Video"
                        name="title"
                        value={Data.title}
                        onChange={Change}
                    />
                </div>
                <div className='mt flex gap-4'>
                    <div className='w-3/6'>
                        <label className="text-zinc-400">Genre</label>
                        <select
                            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                            placeholder="Type of the video"
                            name="genre"
                            value={Data.genre}
                            onChange={Change}
                        >
                            <option value="">Select Genre</option>
                            <option value="Drama">Drama</option>
                            <option value="Thriller">Thriller</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Romance">Romance</option>
                            <option value="Anime">Anime</option>
                            <option value="Action">Action</option>
                            <option value="Horror">Horror</option>
                            <option value="Biography">Biography</option>
                            <option value="Sports">Sports</option>
                            <option value="Science Fiction">Science Fiction</option>
                            <option value="Music">Music</option>
                        </select>
                    </div>
                    <div className="w-3/6">
                        <label className="text-zinc-400">Category of the Video</label>
                        <select
                            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                            placeholder="category of the video"
                            name="category"
                            value={Data.category}
                            onChange={Change}
                        >
                            <option value="">Select Category</option>
                            <option value="CD">CD</option>
                            <option value="DVD">DVD</option>
                        </select>
                    </div>
                </div>
                <div className="mt-4 flex gap-4">
                    <div className="w-3/6">
                        <label className="text-zinc-400">Language of the Video</label>
                        <select
                            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                            placeholder="Language of the video"
                            name="language"
                            value={Data.language}
                            onChange={Change}
                        >
                            <option value="Hindi">Hindi</option>
                            <option value="English">English</option>
                            <option value="Bengali">Bengali</option>
                            <option value="Malayalam">Malayalam</option>
                            <option value="Telegu">Telegu</option>
                            <option value="Tamil">Tamil</option>
                        </select>
                    </div>
                    <div className="w-3/6">
                        <label className="text-zinc-400">Price</label>
                        <input
                            type="number"
                            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                            placeholder="Price"
                            name="price"
                            value={Data.price}
                            onChange={Change}
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <label className="text-zinc-400">Description</label>
                    <textarea
                        className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                        rows={5}
                        placeholder="Description of the video"
                        name="desc"
                        value={Data.desc}
                        onChange={Change}
                    />
                </div>
                <button
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                    onClick={submit}
                >
                    Submit
                </button>
            </div>
        </div >
    );
};


export default AddVideo