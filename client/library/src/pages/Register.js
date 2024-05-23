import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'


function Register() {
    const persons = {
        name: '',
        email: '',
        password: '',
        phone: '',
    }
    const[person, setPerson] = useState(persons)

    const inputHandler = (e)=>{
        const {name, value} = e.target;
         setPerson({...person, [name]:value})
        console.log(person)
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        
        try{
            const response = await axios.post('http://localhost:5000/api/person/addperson', person)
            console.log(response)
            if(response.data.success){
                toast.success(response.data.message)
            }else{
                toast.error(response.data.message)
            }
        }
        catch(err){
            console.log(err)
        }
    }
    
  return (
    <div>
      <div className='container mt-4'>
        <div className='row justify-content-center'>
            <div className='col-md-6'>
            <div className='card shadow'>
                <h4 className='text-center p-2'>Registration Form</h4>
                <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                    <div className='mb-2'>
                        <input type='text' className='form-control' placeholder='Name'
                        onChange={inputHandler} name='name'/>
                    </div>
                    <div className='mb-2'>
                        <input type='email' className='form-control' placeholder='Email'
                        onChange={inputHandler} name='email'/>
                    </div>
                    <div className='mb-2'>
                        <input type='password' className='form-control' placeholder='Password'
                        onChange={inputHandler} name='password'/>
                    </div>
                    <div className='mb-2'>
                        <input type='text' className='form-control' placeholder='Phone'
                        onChange={inputHandler} name='phone'/>
                    </div>
                    <div className='mb-2 mt-2'>
                        <button type='submit' className='btn btn-primary'>Sign Up</button>
                    </div>
                    </form>
                </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Register
