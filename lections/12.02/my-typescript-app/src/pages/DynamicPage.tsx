import { useEffect, useState } from 'react';
import { useParams } from 'react-router'

export default function DynamicPage() {
    const params = useParams();
    console.log('props', params.id);
    const [time, setTime] = useState(0);
    // '?query=some-value&any=123'
    const queryParams = new URLSearchParams(window.location.search);
    const query = queryParams.get('query');
    console.log("#query", query);
    //window.location.search;
    
    //каждый раз при рендере компонента, а рендерится по каждому переходу по ссылке

    //действие при размаунте компонента
    useEffect(() => {
        console.log('#Dynamic render');

        const timer = setInterval(() => {
            setTime((prev) => prev + 1)
        }, 1000);

        //отписка от событий, почиститься от нее
        return () => {
            console.log('#Dynamic delete');
            clearInterval(timer);
        }
    }, []);

    return (<div className="content">
        DynamicPage <br />
        My id: {params?.id}
        Course id: {params?.courseId} <br />
        Timer: {time}
    </div>);
}