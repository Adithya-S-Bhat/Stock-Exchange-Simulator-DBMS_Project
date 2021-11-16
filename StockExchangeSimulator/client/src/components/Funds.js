import React,{useEffect} from 'react';
import Axios from 'axios';



export default function Funds(){
    const [margin, setMargin] = React.useState('');
    const initialisation=async()=>{
        let id = localStorage.getItem("id");
        let user_id = {id};
        await Axios.post(
            "http://localhost:8000/users/getFunds",
            user_id
        ).then((response)=>{
            setMargin(response.data.margin);
            console.log(response.data.margin)
        });
    }

    useEffect(()=>{
        initialisation();
    },[]);

    return (
        <div>
            <p>Margin Available for yeshas maharaj is {margin} </p>
            </div>
    );
}