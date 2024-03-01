import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";

function User() {

    const nav = useNavigate();

    function handleHomeClick() {
        nav('/');
    }

    const { username } = useParams();

    const perPage = 10;
    const [page, setPage] = useState(1);

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
    return (<>{error && <div>Error fetching data. or no such user</div>}
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
        )
        }
        <button onClick={handleHomeClick}>Go to home page</button>

    </>);
}

export default User;