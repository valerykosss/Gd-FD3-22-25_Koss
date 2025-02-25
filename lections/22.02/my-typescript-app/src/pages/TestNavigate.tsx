import { useNavigate } from 'react-router'
// import { nameContext} from '../contexts/nameContext';
import { useNameContext } from '../contexts/nameContext';
// import { useContext } from 'react';

export default function TestNavigate() {
    const navigate = useNavigate();
    //decompose
    // const {name} = useContext(nameContext);
    const {name} = useNameContext();

    return <button onClick={()=> navigate('/external/navigate')}>Navigator Name ({name}) </button>
}