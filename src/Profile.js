import react from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function Profile() {
    let { id } = useParams();
    console.log(id, 'hit');
    return <div>'Profile'</div>
}

export default Profile;