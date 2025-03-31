import supabase from "./supabaseClient"

const userId = async () => {
    const {data,error} = await supabase.auth.getUser(); 
    const user = data.user?.id; 
    return userId; 
}

export default userId; 