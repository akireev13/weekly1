import { useState, useRef } from 'react';
import useSWR from 'swr';

const GitHubRepositories = () => {
    const InputRef = useRef();
    const [page, setPage] = useState(1);
    const [username, setUsername] = useState("");
    const perPage = 10;

    const fetcher = async (url) => {
        const res = await fetch(url);
        return res.json();
    };

    const { data, error } = useSWR(username ? `https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}` : null, fetcher);

    const handlePreviousPage = () => {
        setPage((prevPage) => prevPage - 1);
    };

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setUsername(InputRef.current.value);
        setPage(1);
    }

    return (
        <div>

            <form action='/submit-form' onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter GitHub username"
                    ref={InputRef}
                    name='input'
                    id='input'
                />
                <button>Submit</button>
            </form>
            {error && <div>Error fetching data. or no such user</div>}
            {!error && !data && username && <div>Loading...</div>}
            {data && Array.isArray(data) && !error && (
                <div>
                    <h2>Repositories for {username}</h2>
                    <ul>
                        {data.map((repo) => (
                            <li key={repo.id}>{repo.name}</li>
                        ))}
                    </ul>
                    <div>
                        <button onClick={handlePreviousPage} disabled={page === 1}>
                            Previous Page
                        </button>
                        <button onClick={handleNextPage}>Next Page</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GitHubRepositories;
