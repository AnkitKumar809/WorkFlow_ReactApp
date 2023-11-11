function LoginValidation(values) {
    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if(values.email ===""){
        error.email = "Email is required";
    }else if(!email_pattern.test(values.email)){
        error.email = "Email Didn't Match";
    }else{
        error.email ='';
    }

    if(values.password ===""){
        error.password = "Password is required";
    }else if(!password_pattern.test(values.password)){
        error.password = "Password Didn't Match";
    }else{
        error.password ='';
    }
    
    return error;
}

export default LoginValidation;