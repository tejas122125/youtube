import { youtubeData } from "@/constants";

export  async function fetchData (name:string){

try {
    
const data = youtubeData
// console.log(data);

return data

} catch (error) {
throw new Error(String(error))     
}

}