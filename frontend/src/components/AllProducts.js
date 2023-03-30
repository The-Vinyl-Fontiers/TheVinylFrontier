const AllProducts = () =>{
    const [vinyls,setVinyls]=useState();
    async function fetchVinyls(){
        try{
            const response=await fetch("http://localhost:3000/api/vinyls");
            const vinylData=await response.json();
            setVinyls(vinylData)
            
        }catch (error){
            alert ("Error has occured")
        }
    }
}
export default AllProducts