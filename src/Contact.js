import react from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';


function Contact() {
    let navigate = useNavigate();
    let location = useLocation();
    let params = useParams();
    console.log(params, 'hit');
    console.log(location);
    return <div>'Contact' <button onClick={() => {navigate('/')}}>Chgange to home</button></div>
}

export default Contact;