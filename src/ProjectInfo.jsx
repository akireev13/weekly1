import { useParams } from "react-router-dom";
import useSWR from "swr";

function ProjectInfo() {
    const { username, repo } = useParams();

    const fetcher = async (url) => {
        const res = await fetch(url);
        return res.json();
    };

    const { data, error } = useSWR(username ? `https://api.github.com/repos/${username}/${repo}` : null, fetcher);
    const description = data?.description;

    return (
        <>
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
            {error && (<p>Error ocurred.</p>)}
            {!error && !description && (<p>No description ((</p>)}
            {!error && description && (<>
                <h2>Description for "{repo}" repository:</h2>
                <p>{description}</p>
            </>)}
        </>
    );
}

export default ProjectInfo;
