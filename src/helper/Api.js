const getallcategories = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get_allcategories`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log('Error fetching Data', error);
    return [];
  }

}
const getallmenucategories = async () => {
  try {
    const response = await fetch(`/api/get_all_menu_categories`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log('Error fetching Data', error);
    return [];
  }

}
const getallproducts = async (rbody) => {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rbody),
      Cache: 'no-store',
    };
    const response = await fetch(`/api/get_allproducts`, config);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log('Error fetching Data', error);
    return [];
  }
}

const gethomebanners = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get_all_banners`);
    const result = await response.json();
    if (result.success) {
      return result?.banners;
    } else {
      return [];
    }
  } catch (error) {
    console.log("Error fetching data", error);
    return [];
  }
}

const getallcuisines = async () => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/get_all_cuisines`);
    const result = await response.json();
    if (result.success) {
      return result?.cuisines;
    } else {
      return [];
    }
  } catch (error) {
    console.log("Error fetching data", error);
    return [];
  }
}

const getallhomeblog = async () => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/get_all_blogs`);
    const result = await response.json();
    if (result.success) {
      return result?.blogs;
    } else {
      return [];
    }
  } catch (error) {
    console.log("Error fetching data", error);
    return [];
  }
}
const createblog = async (rbody) => {
  try {
    const config = {
      method: 'POST',
      body: rbody,
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/create_new_blog`, config);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log('Error fetching Data', error);
    return [];
  }
}

const getsingleblog = async (id) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/get_blog_byid/${id}`);
    const result = await response.json();
    if (result.success) {
      return result?.blog;
    } else {
      return [];
    }
  } catch (error) {
    console.log("Error fetching data", error);
    return [];
  }
}

const updatecuisine = async (rbody) => {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rbody),
      cache: 'no-store',
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/add_product_cuisine`, config);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log('Error fetching Data', error);
    return [];
  }
}

const updatespcategory = async (rbody) => {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rbody),
      cache: 'no-store',
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/add_special_categories`, config);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log('Error fetching Data', error);
    return [];
  }
}

const sendemail = async (rbody) => {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rbody),
      cache: 'no-store',
    };
    const response = await fetch(`/api/send_email`, config);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log('Error sending email', error);
    return [];
  }
}

const addtofavourite = async (rbody) => {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rbody),
      cache: 'no-store',
    };
    const response =await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/add_favourite`, config)
    const result = await response.json();
    return result;
  } catch (error) {
    console.log('Error fetching Data', error);
    return [];
  }
}

const uploadproductimages = async (productId,formData) => {
  try {
    const config = {
      method: 'POST',
      body: formData,
  }
    const response =await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload_product_image/${productId}`, config);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log('Error fetching Data', error);
    return [];
  }
}

const editbannerimages = async (bannerId,formData) => {
  try {
    const config = {
      method: 'POST',
      body: formData,
  }
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/edit_banners_images/${bannerId}`, config);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log('Error fetching Data', error);
    return [];
  }
}

const signupuser = async (rbody) => {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rbody),
      cache: 'no-store',
    };
    const response =await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sign_up`, config)
    const result = await response.json();
    return result;
  } catch (error) {
    console.log('Error fetching Data', error);
    return [];
  }
}

const loginuser = async (rbody) => {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rbody),
      cache: 'no-store',
    };
    const response =await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, config);
    console.log(response);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log('Error fetching Data', error);
    return [];
  }
}

const logoutuser = async () => {
  try {
    const response =await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`)
    const result = await response.json();
    return result;
  } catch (error) {
    console.log('Error fetching Data', error);
    return [];
  }
}

const createsubcategory = async (rbody) => {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rbody),
      cache: 'no-store',
    };
    const response =await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/create_sub_category`, config)
    const result = await response.json();
    return result;
  } catch (error) {
    console.log('Error fetching Data', error);
    return [];
  }
}
const createsubsubcategory = async (rbody) => {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rbody),
      cache: 'no-store',
    };
    const response =await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/create_sub_sub_category`, config)
    const result = await response.json();
    return result;
  } catch (error) {
    console.log('Error fetching Data', error);
    return [];
  }
}

const getallsubcategories = async (rbody = {proId:''}) => {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rbody),
      cache: 'no-store',
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get_all_sub_categories`,config);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log('Error fetching Data', error);
    return [];
  }

}
const getallsubsubcategories = async(rbody = {proId:''}) => {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rbody),
      cache: 'no-store',
    };
    const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get_all_sub_sub_categories`,config);
    const result = await resp.json();
    return result;
  } catch (error) {
    console.log("error fetching data", error);
    return [];
  }
}
const addsubcategory = async (rbody) => {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rbody),
      cache: 'no-store',
    };
    const response =await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/add_sub_category`, config)
    const result = await response.json();
    return result;
  } catch (error) {
    console.log('Error adding subcategory', error);
    return [];
  }
}
const addsubsubcategory = async (rbody) => {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rbody),
      cache: 'no-store',
    };
    const response =await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/add_sub_sub_category`, config)
    const result = await response.json();
    return result;
  } catch (error) {
    console.log('Error adding subcategory', error);
    return [];
  }
}
const addhomeslider = async (formData) => {
  try {
    const config = {
      method: 'POST',
      body: formData,
  }
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/add_home_slider`, config);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log('Error fetching Data', error);
    return [];
  }
}
const getallhomeslider = async() => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get_all_homeslider_images`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("Error fetching data", error);
    return [];
  }
}
const deletehomeslider = async (id) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/delete_homeslider/${id}`,{method:'DELETE'});
    const result = await response.json();
    if (result.success) {
      return result;
    } else {
      return [];
    }
  } catch (error) {
    console.log("Error fetching data", error);
    return [];
  }
}
const addsupplierslider = async (formData) => {
  try {
    const config = {
      method: 'POST',
      body: formData,
  }
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/add_supplier_slider`, config);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log('Error fetching Data', error);
    return [];
  }
}
const getallsupplierimages = async() => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get_all_supplier_images`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("Error fetching data", error);
    return [];
  }
}
const deletesupplierslider = async (id) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/delete_supplier_slider/${id}`,{method:'DELETE'});
    const result = await response.json();
    if (result.success) {
      return result;
    } else {
      return [];
    }
  } catch (error) {
    console.log("Error fetching data", error);
    return [];
  }
}
const registerpromotionemail = async (rbody) => {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rbody),
      cache: 'no-store',
    };
    const response =await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/register_promo_email`, config)
    const result = await response.json();
    return result;
  } catch (error) {
    console.log('Error registering email address', error);
    return [];
  }
}
const getallterms = async() => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get_terms_conditions`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("Error fetching data", error);
    return [];
  }
}
const upsertterms = async (rbody) => {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rbody),
      cache: 'no-store',
    };
    const response =await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upsert_terms_conditions`, config)
    const result = await response.json();
    return result;
  } catch (error) {
    console.log('Error adding subcategory', error);
    return [];
  }
}
const adddynamicterms = async (rbody) => {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rbody),
      cache: 'no-store',
    };
    const response =await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/add_new_dynamic_terms`, config)
    const result = await response.json();
    return result;
  } catch (error) {
    console.log('Error adding subcategory', error);
    return [];
  }
}
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
};
export default call_api;