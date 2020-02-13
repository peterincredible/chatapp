 function signup_validator(name,surname,username,email,password,confirmpassword){
    let error = {};
    let validate = true;
    if(name == ""){
        error.name ="name field empty";
        validate = false
    }
    if(surname == ""){
        error.surname ="surname surname field empty";
        validate = false;
    }
    if(username == ""){
        error.username ="username field empty";
        validate = false;
    }
    if(email == ""){
        error.email ="email field empty";
        validate = false;
    }
    if(password == "" || confirmpassword == ""){
        error.password ="password or confirm password field empty";
        validate = false;
    }
    if(password != confirmpassword ){
        error.password ="password or confirm password field empty";
        validate = false;
    }
    return {error,validate} ;   
}

function signin_validator(username,password){
    let error = {}
    let validate = true;
    if(username == ""){
       error.username = "username field empty";
       validate = false;
    }
    if(password == ""){
        error.password ="password fielld empty";
        validate = false;
    }

    return{error,validate};
}
export default {signin_validator,signup_validator};