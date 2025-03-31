import supabase from "./supabaseClient";

const token = async() => {
    const { data, error } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    return token; 
}
 
export default token; 