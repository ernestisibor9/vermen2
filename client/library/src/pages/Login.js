import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


function Login() {
    const navigate = useNavigate()
    const persons = {
       email: '',
        password: '',
    }
    const[person, setPerson] = useState(persons)

    const inputHandler = (e)=>{
        const {name, value} = e.target;
         setPerson({...person, [name]:value})
        console.log(person)
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()

        if(person.email === '' || person.password === ''){
            toast.error('All fields are required')
            return
        }
        
        try{
            const response = await axios.post('http://localhost:5000/api/person/login', person)
            console.log(response)
            if(response.data.success){
                toast.success(response.data.message)
                localStorage.setItem('person', JSON.stringify(response.data.data))
                navigate('/')
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
                <h4 className='text-center p-2'>Login Form</h4>
                <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                    <div className='mb-2'>
                        <input type='email' className='form-control' placeholder='Email'
                        onChange={inputHandler} name='email'/>
                    </div>
                    <div className='mb-2'>
                        <input type='password' className='form-control' placeholder='Password'
                        onChange={inputHandler} name='password'/>
                    </div>
                    <div className='mb-2 mt-2'>
                        <button type='submit' className='btn btn-primary'>Login</button>
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

export default Login
