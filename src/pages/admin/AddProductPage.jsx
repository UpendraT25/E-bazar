import React, { useState } from 'react'
import service from '../../appwrite/config';
import toast from 'react-hot-toast';
import Loader from '../../components/loader/Loader';
import { useNavigate } from 'react-router-dom';

const categoryList = [
  {
      name: 'fashion'
  },
  {
      name: 'shirt'
  },
  {
      name: 'jacket'
  },
  {
      name: 'mobile'
  },
  {
      name: 'laptop'
  },
  {
      name: 'shoes'
  },
  {
      name: 'home'
  },
  {
      name: 'books'
  }
]
const AddProductPage=()=>{
  const navigate=useNavigate();
  const [loading,setLoading]=useState(false);
  const [product,setproduct]=useState({
        title: "",
        price: "",
        productImageUrl: "",
        category: "",
        description: "",
        quantity : 1,
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
  })

  const AddProductFunction=async()=>{
    if (product.title == "" || product.price == "" || product.productImageUrl == "" || product.category == "" || product.description == "") {
      return toast.error("all fields are required")
    }
    setLoading(true);
    try{
      const a=await service.AddDoc(product);
      if(a){
        toast.success("Add Product successfuly")
        navigate('/admin-dashboard')
      }
      setLoading(false);
    }catch(error){
      toast.error("Something went wrong");
      setLoading(false);
    }
  }
  return(
    <div>
      <div className='flex justify-center items-center h-screen'>
        {loading && <Loader />} 
        <div className='login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md'>
          <div className='mb-5'>
            <h2 className='text-center text-2xl font-bold text-pink-500'>
              Add Product
            </h2>
          </div>

        {/* input1 */}
        <div className='mb-3'>
          <input 
          type="text"
          name='title'
          placeholder='Product Title'
          className='bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
          onChange={(e)=>{
            setproduct({
              ...product,
              title:e.target.value
            })
          }}
           />
        </div>

        {/* Input Two  */}
        <div className="mb-3">
                        <input
                            type="number"
                            placeholder='Product Price'
                            className='bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                            onChange={(e)=>{
                              setproduct({
                                ...product,
                                price:e.target.value
                              })
                            }}
                        />
        </div>

        {/* Input Three  */}
        <div className="mb-3">
                        <input
                            type="text"
                            placeholder='Product Image Url'
                            onChange={(e)=>{
                              setproduct({
                                ...product,
                                productImageUrl:e.target.value
                              })
                            }}
                            className='bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
          </div>

          <div className="mb-3">
                        <select 
                        onChange={(e)=>{
                          setproduct({
                            ...product,
                            category:e.target.value
                          })
                        }}
                        className="w-full px-1 py-2 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none  ">
                           <option disabled>Select Product Category</option>
                           {categoryList.map((value,index)=>{
                            return(
                            <option className='first-letter:uppercase' key={index} value={value.name}>{value.name}</option>
                            ) 
                          })}
                        </select>
            </div>
            <div className='mb-3'>
              <textarea 
              value={product.description}
              onChange={(e)=>{
                setproduct({
                  ...product,
                  description:e.target.value
                })
              }}
              name="description" placeholder="product description" rows="10" className=" w-full px-2 py-1 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-pink-300 ">

              </textarea>
            </div>

             {/* Add Product Button  */}
             <div className="mb-3">
                        <button
                            onClick={AddProductFunction}
                            type='button'
                            className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md '
                        >
                          Add Product
                        </button>
              </div>
        </div>
      </div>
    </div>
  )
}

export default AddProductPage