import { useParams, Outlet } from 'react-router'

export default function ExternalPage() {
    const params = useParams();

    return (<div className="content">
        ExternalPage <br />

        <div>
            <Outlet />
        </div>
    </div>);
}