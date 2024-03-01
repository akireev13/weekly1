import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Form() {
    const InputRef = useRef();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/${InputRef.current.value}`);
    }
    return (

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
    );
}

export default Form;
