import { useEffect } from "react";

const AllProducts=(props)=>{
    const{setLoggedIn,vinyls,fetchVinyls}=props;
    try{
        const fetchData=async () =>{
        try {response = await fetch('http://localhost:3000:/',{
            header: {
                'Content-Type':'application/json',
            }
        });
        const {data} = await response.json();
        return data.posts
            
        }catch(error){
            alert ("error fetching posts")}
    }}
//INCOMPLETE
}
export default AllProducts