export let  adduser = (data)=>({type:"add",payload:data})
   
export let remove=()=>({type:"remove"})

export let addmessage= (data)=>({type:"add message",payload:data});
export let modifymessage=(data)=>({type:"modify data",payload:data});