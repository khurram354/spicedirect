'use client';
import BlogTitleSection from './BlogTitleSection'
import BlogSellSection from './BlogSellSection'
import BlogThumbUpSection from './BlogThumbUpSection'
import { useEffect, useState } from 'react';
import call_api from '@/helper/Api';
import { useRouter } from 'next/navigation';

const BlogTemplete = ({ type, blog, blogid }) => {
  const [fiveimages, setFiveimages] = useState(type === 'editBlog' ? blog.fiveCircleImage.map(image => `/images/blogs/${image}`) : []);
  const [fivetitles, setFivetitle] = useState(type === 'editBlog' ? blog.fiveCircleTitle.map(title => `/images/blogs/${title}`):[]);
  const [showMainTitleImage, setShowMainTitleImage] = useState(type === 'editBlog' ? `/images/blogs/${blog.mainTitleImage}` : "");
  const [showspOfferImage, setShowspOfferImage] = useState(type === 'editBlog' ? `/images/blogs/${blog.spOfferImage}` : "");
  const [showthumpsupImage, setShowthumpsupImage] = useState(type === 'editBlog' ? `/images/blogs/${blog.thumpsUpImage}` : '')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    mainTitleImage: '',
    fileLimit: false,
    titleLimit: false,
    fiveCircleImage: [],
    fiveCircleTitle: [],
    spOfferImage: '',
    homeBlogTitle: type === 'editBlog' ? blog.homeBlogTitle : '',
    homeBlogDesc: type === 'editBlog' ? blog.homeBlogDesc : '',
    mainTitle: type === 'editBlog' ? blog.mainTitle : '',
    subTitle: type === 'editBlog' ? blog.subTitle : '',
    mainTitleParaFirst: type === 'editBlog' ? blog.mainTitleParaFirst : '',
    mainTitleParaSecond: type === 'editBlog' ? blog.mainTitleParaSecond : '',
    sellSectionParaFirst: type === 'editBlog' ? blog.sellSectionParaFirst : '',
    sellSectionParaSecond: type === 'editBlog' ? blog.sellSectionParaSecond : '',
    sellSectionParaThird: type === 'editBlog' ? blog.sellSectionParaThird : '',
    spOfferMainTitle: type === 'editBlog' ? blog.spOfferMainTitle : '',
    spOfferMainPara: type === 'editBlog' ? blog.spOfferMainPara : '',
    thumpsUpImage: '',
  });
  const [error, setError] = useState({
    mainTitleImage: '',
    fileLimit: false,
    titleLimit: false,
    fiveCircleImage: [],
    fiveCircleTitle: [],
    spOfferImage: '',
    homeBlogTitle: '',
    homeBlogDesc: '',
    mainTitle: '',
    subTitle: '',
    mainTitleParaFirst: '',
    mainTitleParaSecond: '',
    sellSectionParaFirst: '',
    sellSectionParaSecond: '',
    sellSectionParaThird: '',
    spOfferMainTitle: '',
    spOfferMainPara: '',
    thumpsUpImage: '',
  });
  const validate = (field, value, index = null) => {
    switch (field) {
      case 'homeBlogTitle':
        return value.trim() === '' ? "Please Enter home blog title" : '';
      case 'homeBlogDesc':
        return value.trim() === '' ? "Please Enter home blog description" : '';
      case 'mainTitle':
        return value.trim() === '' ? "Please Enter Main Title" : '';
      case 'subTitle':
        return value.trim() === '' ? "Please Enter sub title" : '';
      case 'mainTitleParaFirst':
        return value.trim() === '' ? "Please Enter main title para first" : '';
      case 'mainTitleParaSecond':
        return value.trim() === '' ? "Please Enter Main title para second" : '';
      case 'sellSectionParaFirst':
        return value.trim() === '' ? "Please Enter sell section para first" : '';
      case 'sellSectionParaSecond':
        return value.trim() === '' ? "Please Enter sell section para second" : '';
      case 'sellSectionParaThird':
        return value.trim() === '' ? "Please Enter sell section para third" : '';
      case 'spOfferMainTitle':
        return value.trim() === '' ? "Please Enter special offer main title" : '';
      case 'spOfferMainPara':
        return value.trim() === '' ? "Please Enter Main special offer main para" : '';
      case 'lastCircleTitle':
        return value.trim() === '' ? "Please Enter last circle title" : '';
      case 'fiveCircleTitle':
        if (formData.fiveCircleTitle.length < 5) {
          return `Please enter five circle title iamges`;
        }
      case 'fiveCircleImage':
        if (formData.fiveCircleImage.length < 5) {
          return "Please Enter five circle image";
        }
      default:
        return '';
    }
  }
  const checkFormError = () => {
    const fields = formData;
    let hasError = false;
    const newErrors = {};
    Object.keys(fields).forEach((field) => {
      let errorMessage = '';
      if (field === 'mainTitleImage') {
        if (fields.mainTitleImage.length === 0) {
          newErrors[field] = "Please Enter main title Image";
          hasError = true;
        }
      } else if (field === 'spOfferImage') {
        if (fields.spOfferImage.length === 0) {
          newErrors[field] = "Please Enter banner section Image";
          hasError = true;
        }
      }else if ( field === 'thumpsUpImage') {
        if (fields.thumpsUpImage.length === 0) {
          newErrors[field] = " Please select banner for thumps up section";
          hasError = true;
        }
      } else {
        errorMessage = validate(field, fields[field]);
        newErrors[field] = errorMessage;
        if (errorMessage) { hasError = true }
      }
    });
    setError(newErrors);
    return !hasError
  }

  const router = useRouter();
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const uploadImageHandler = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const getHomeTitleImage = () => {
    const imageFile = formData.mainTitleImage;
    if (imageFile && imageFile instanceof File) {
      const reader = new FileReader();
      reader.onload = () => {
        setShowMainTitleImage(reader.result);
      };
      reader.readAsDataURL(imageFile);
    } else {
      console.log("No valid file selected or the file is not valid.");
    }
  };

  const getspOfferImage = () => {
    const imageFile = formData.spOfferImage;
    if (imageFile && imageFile instanceof File) {
      const reader = new FileReader();
      reader.onload = () => {
        setShowspOfferImage(reader.result);
      };
      reader.readAsDataURL(imageFile);
    } else {
      console.log("No valid file selected or the file is not valid.");
    }
  };

  const getThumpsUPImage = () => {
    const imageFile = formData.thumpsUpImage;
    if (imageFile && imageFile instanceof File) {
      const reader = new FileReader();
      reader.onload = () => {
        setShowthumpsupImage(reader.result);
      };
      reader.readAsDataURL(imageFile);
    } else {
      console.log("No valid file selected or the file is not valid.");
    }
  };
  const getMultipleImages = () => {
    if (formData.fiveCircleImage.length > 0) {
      const imagesPreviews = formData.fiveCircleImage.map((ele) => {
        const reader = new FileReader();
        return new Promise((resolve) => {
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(ele);
        })
      });
      Promise.all(imagesPreviews).then((urls) => {
        setFiveimages(urls);
      })
    };

  }
  const getFiveTitleImages = () => {
    if (formData.fiveCircleTitle.length > 0) {
      const imagesPreviews = formData.fiveCircleTitle.map((ele) => {
        const reader = new FileReader();
        return new Promise((resolve) => {
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(ele);
        })
      });
      Promise.all(imagesPreviews).then((urls) => {
        setFivetitle(urls);
      })
    };

  }
  const uploadMulitipleImage = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    const fiveImages = [...formData.fiveCircleImage];
    let limitExceeded = false;
    chosenFiles.forEach((file) => {
      if (fiveImages.findIndex((f) => f.name === file.name) === -1) {

        if (fiveImages.length < 5) {
          fiveImages.push(file);
        } else {
          setFormData((prevState) => ({
            ...prevState,
            fileLimit: true,
            fiveCircleImage: fiveImages,
          }));
          limitExceeded = true;
          return true;
        }
      }
    });
    if (!limitExceeded) {
      setFormData({
        ...formData,
        fiveCircleImage: fiveImages,
      })
    };
  }

  const uploadFiveTitleImage = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    const fivetitle = [...formData.fiveCircleTitle];
    let limitExceeded = false;
    chosenFiles.forEach((file) => {
      if (fivetitle.findIndex((f) => f.name === file.name) === -1) {

        if (fivetitle.length < 5) {
          fivetitle.push(file);
        } else {
          setFormData((prevState) => ({
            ...prevState,
            titleLimit: true,
            fiveCircleImage: fivetitle,
          }));
          limitExceeded = true;
          return true;
        }
      }
    });
    if (!limitExceeded) {
      setFormData({
        ...formData,
        fiveCircleTitle: fivetitle,
      })
    };
  }
  
  const createBlogHandler = async () => {
    // setLoading(true)
    if (type !== "editBlog") {
      const checkError = checkFormError();
      if (!checkError) { setLoading(false); return };
    }
    const formDatatoSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (key !== 'fiveCircleImage' && key !== 'fiveCircleTitle') {
        formDatatoSend.append(key, formData[key]);
      }
    });
    if (type === 'editBlog') {
      formDatatoSend.append('id', blogid);
    } else { formDatatoSend.append('id', '') }
    if (formData.fiveCircleImage.length > 0) {
      formData.fiveCircleImage.forEach((file, index) => {
        formDatatoSend.append('fiveCircleImage[${index}]', file);
      })
    }
    if (formData.fiveCircleTitle.length > 0) {
      formData.fiveCircleTitle.forEach((file, index) => {
        formDatatoSend.append('fiveCircleTitle[${index}]', file);
      })
    }
    try {
      const result = await call_api.createblog(formDatatoSend);
      if (result.success) {
        setLoading(false)
        router.push('/')
      };
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => { getHomeTitleImage() }, [formData.mainTitleImage])
  useEffect(() => { getFiveTitleImages() }, [formData.fiveCircleTitle])
  useEffect(() => { getMultipleImages() }, [formData.fiveCircleImage])
  useEffect(() => { getspOfferImage() }, [formData.spOfferImage]);
  useEffect(() => { getThumpsUPImage() }, [formData.thumpsUpImage]);
  return (
    <div className="w-3/4 px-4 mx-auto mt-6 relative left-24 top-5">
      <div className="w-full border border-gray-200 shadow-lg p-4">
        <BlogTitleSection
          formData={formData}
          handleInputChange={handleInputChange}
          uploadImageHandler={uploadImageHandler}
          showMainTitleImage={showMainTitleImage}
          error={error} />
        <BlogSellSection
          formData={formData}
          handleInputChange={handleInputChange}
          uploadMulitipleImage={uploadMulitipleImage}
          uploadFiveTitleImage={uploadFiveTitleImage}
          fiveimages={fiveimages}
          fiveCircleTitleImages={fivetitles}
          error={error}
        />
        <BlogThumbUpSection
          formData={formData}
          handleInputChange={handleInputChange}
          createBlogHandler={createBlogHandler}
          showspOfferImage={showspOfferImage}
          showthumpsupImage={showthumpsupImage}
          type={type}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  )
}

export default BlogTemplete