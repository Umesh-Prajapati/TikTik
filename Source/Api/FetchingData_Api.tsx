const FetchingData_Api = async ( method_prm : string, endPoint_prm : string, formData_prm :FormData ) => {
    
    try{
        var myHeaders = new Headers();
        myHeaders.append("version", "1.0.0");
        // myHeaders.append("Content-Type", "multipart/form-data");
        
        var requestOptions = {
            method: method_prm,
            headers: myHeaders,
            body: formData_prm,
        };
        
        // const res = await fetch(`http://localhost/social_insta/api/${endPoint_prm}`, requestOptions)
        // .then((response)=>response.json())
        const res = await fetch(`http://192.168.1.6/social_insta/api/${endPoint_prm}`, requestOptions)
        .then((response)=>response.json());
        
        // console.log("fetching respo:::", res)
        return res;

    }catch(e:any){
        console.log("apiError:::",e)
        return e.message
    }
}

export { FetchingData_Api }