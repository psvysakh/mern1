import axios from 'axios';

export const signInFetch=async(data)=>{
    return await axios.post('/auth/signin',
    {
            email:data.email,
            password:data.password
    });

}

export const signUpFetch=async(data)=>{
    return await axios.post('/auth/signup',
    {
        name:data.name,
        email:data.email,
        password:data.password
    })
}

export const resetFetch=async(data)=>{
    return await axios.post('/auth/resetform',
    {
        email:data.email
    })
}

export const verifyFetch=async(data)=>{
    return await axios.post('/auth/activate',
    {
        token:data
    })
}

export const resetPassFetch=async(data)=>{
    return await axios.post('/auth/resetPassword',
{
    password:data.password,
    token:data.token
})
}

export const googleFetch=async(accessToken)=>{
    return await axios.post('/auth/oauth/google',
    {
        access_token:accessToken
    })
}