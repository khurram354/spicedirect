import BlogTemplete from "@/components/adminlayout/createblog/BlogTemplete";
import call_api from "@/helper/Api";
export default async function page({params}) {
    const id = (await params).id;
    const resp = await call_api.getsingleblog(id);  
    if(resp.length === 0){notFound()}
    
    return(
        <>
        <BlogTemplete type = {'editBlog'} blog = { resp } blogid = {id}/>
        </>
    )
    
}