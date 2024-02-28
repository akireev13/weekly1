import { useState } from 'react';
import useSWR from 'swr';

const GitHubRepositories = () => {
    const [username, setUsername] = useState('');
    const [page, setPage] = useState(1);
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

    return (
        <div>
            <input
                type="text"
                placeholder="Enter GitHub username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            {!Array.isArray(data) && <div>No such user!</div>
            }
            {error && <div>Error fetching data</div>}
            {!error && !data && <div>Loading...</div>}
            {data && Array.isArray(data) && (
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
