import { useNavigate } from 'react-router'

export default function TestNavigate() {
    const navigate = useNavigate();

    return <button onClick={()=> navigate('/external/navigate')}>Navigator</button>
}