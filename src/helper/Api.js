const frontEndURL = process.env.NEXT_PUBLIC_BASE_URL;
const backEndURL =  process.env.BASE_URL;

const fetchData = async (url, method = 'GET', rbody = null) => {
  try {
    const isFormData = rbody instanceof FormData;
    const options = {
      method,
      headers: isFormData ? undefined : {
        'Content-Type': 'application/json',
      },
      body: rbody ? (isFormData? rbody : JSON.stringify(rbody)) : null,
      cache: 'no-store',
    };
    if (method === 'GET') {
      delete options.body;
    }
    const response = await fetch(url, options);
    const result = await response.json();
    if(result.success !== undefined && !result.success){
      console.log(`Error in response: ${result.message || 'unknown error'}`); return [];
    }; return result;    
  } catch (error) { console.log(`Error fetch data`, error);
    return [];
  }
}

const getallcategories = async () =>{return await fetchData(`${frontEndURL}/api/get_allcategories`);};
const getallmenucategories = async () => {return await fetchData(`/api/get_all_menu_categories`);};
const getmenucategories = async () => {return await fetchData(`${frontEndURL}/api/get_all_menu_categories`);};
const get_allsubcategories = async () => {return await fetchData(`${frontEndURL}/api/getallsubcategories`);};
const gethomebanners = async () => {const resp = await fetchData(`${frontEndURL}/api/get_all_banners`); return resp?.banners || []}
const getallcuisines = async () => {const resp = await fetchData(`${backEndURL}/api/get_all_cuisines`); return resp?.cuisines}
const getallhomeblog = async () => {const resp = await fetchData(`${backEndURL}/api/get_all_blogs`); return resp?.blogs}
const getsingleblog = async (id) => {const resp = await fetchData(`${backEndURL}/api/get_blog_byid/${id}`); return resp?.blog;}
const logoutuser = async () => {return await fetchData(`/api/logout`);}
const getallhomeslider = async() => {return await fetchData(`${frontEndURL}/api/get_all_homeslider_images`)}
const get_allhomeslider = async() => {return await fetchData(`/api/get_all_homeslider_images`)}
const deletehomeslider = async (id) => {return await fetchData(`${frontEndURL}/api/delete_homeslider/${id}`,'DELETE');}
const getallsupplierimages = async() => {return await fetchData(`${frontEndURL}/api/get_all_supplier_images`)} 
const getall_adminsupplierimages = async() => {return await fetchData(`/api/get_all_supplier_images`)} 
const deletesupplierslider = async (id) => {return await fetchData(`/api/delete_supplier_slider/${id}`,'DELETE');}
const getallterms = async() => {return await fetchData(`${frontEndURL}/api/get_terms_conditions`);}
const getallproducts = async (rbody) => {return await fetchData(`/api/get_allproducts`,'POST', rbody)};
const createblog = async (rbody) => {return await fetchData(`${frontEndURL}/api/create_new_blog`, 'POST', rbody);}
const updatecuisine = async (rbody) => {return await fetchData(`/api/add_product_cuisine`, 'POST', rbody);}
const updatespcategory = async (rbody) => {return await fetchData(`/api/add_special_categories`,'POST', rbody);}
const sendemail = async (rbody) => {return await fetchData(`/api/send_email`, 'POST', rbody);}
const addtofavourite = async (rbody) => {return await fetchData(`${frontEndURL}/api/add_favourite`, 'POST', rbody);}
const uploadproductimages = async (productId,formData) => {return await fetchData(`/api/upload_product_image/${productId}`, 'POST', formData);}
const editbannerimages = async (bannerId,formData) => {return await fetchData(`/api/edit_banners_images/${bannerId}`, 'POST', formData);}
const signupuser = async (rbody) => {return await fetchData(`/api/sign_up`, 'POST', rbody);}
const loginuser = async (rbody) => {return await fetchData(`/api/login`, 'POST', rbody);}
const createsubcategory = async (rbody) => {return await fetchData(`/api/create_sub_category`, 'POST', rbody);}
const createsubsubcategory = async (rbody) => {return await fetchData(`/api/create_sub_sub_category`, 'POST', rbody);}
const getallsubcategories = async (rbody = {proId:''}) => {return await fetchData(`/api/get_all_sub_categories`,'POST', rbody);}
const getallsubsubcategories = async(rbody = {proId:''}) => {return await fetchData(`/api/get_all_sub_sub_categories`,'POST',rbody);}
const addsubcategory = async (rbody) => {return await fetchData(`/api/add_sub_category`, 'POST', rbody);}
const addsubsubcategory = async (rbody) => {return await fetchData(`/api/add_sub_sub_category`, 'POST', rbody);}
const addhomeslider = async (formData) => {return await fetchData(`${frontEndURL}/api/add_home_slider`, 'POST', formData);}
const addsupplierslider = async (formData) => {return await fetchData(`/api/add_supplier_slider`, 'POST', formData);}
const registerpromotionemail = async (rbody) => {return await fetchData(`${frontEndURL}/api/register_promo_email`, 'POST', rbody);}
const upsertterms = async (rbody) => {return await fetchData(`${frontEndURL}/api/upsert_terms_conditions`, 'POST', rbody);}
const adddynamicterms = async (rbody) => {return await fetchData(`${frontEndURL}/api/add_new_dynamic_terms`, 'POST', rbody);}

const call_api = {
  getallcategories,
  getallproducts,
  gethomebanners,
  getallcuisines,
  createblog,
  getallhomeblog,
  getsingleblog,
  updatecuisine,
  updatespcategory,
  sendemail,
  addtofavourite,
  uploadproductimages,
  editbannerimages,
  signupuser,
  loginuser,
  logoutuser,
  createsubcategory,
  getallsubcategories,
  createsubsubcategory,
  getallsubsubcategories,
  addsubcategory,
  addsubsubcategory,
  getallmenucategories,
  addhomeslider,
  getallhomeslider,
  deletehomeslider,
  addsupplierslider,
  getallsupplierimages,
  deletesupplierslider,
  registerpromotionemail,
  getallterms,
  upsertterms,
  adddynamicterms,
  get_allsubcategories,
  getmenucategories,
  getall_adminsupplierimages,
  get_allhomeslider,
};
export default call_api;