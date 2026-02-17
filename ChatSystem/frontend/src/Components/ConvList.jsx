import { useEffect, useState } from "react";
import axios from 'axios';
const ConvList = ({setSelectedConv}) => {

    const [convs, setConvs] = useState([]);

    useEffect(() => 
    {
        const fetchConvs = async () => 
        {
            try 
            {
                const res = await axios.get("http://localhost:5001/getAllConv", {withCredentials: true});
                if(res.status===200) setConvs(res.data.data);
            }
            catch (err)
            {
                console.log(err.message);
            }
        }

        fetchConvs();
    }, []);

    return ( 
        <div>
            {
                convs.map((conv) => (
                    <div key={conv._id} onClick={setSelectedConv(conv)}> 
                        {conv._id}
                    </div>
                ))
            }
        </div>
     );
}
 
export default ConvList;