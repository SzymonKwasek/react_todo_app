const todoAPI = "/api/todos";


export async function getTodos(){
     return fetch(todoAPI)
            .then(resp => {
                if(!resp.ok){
                    if(resp.status >=400 && resp.status < 500){
                        return resp.json().then(data=>{
                            let err = {errorMessage: data.message};
                            throw err;
                        });
                    }else{
                        let err = {errorMessagege: "Please try again later, server is not responding.."};
                        throw err;
                    }
                }
                return resp.json();
                
            })
}

export async function addTodo(val){
 return fetch(todoAPI, {
           method: 'post',
           headers: new Headers({
               'Content-Type': 'application/json'
           }),
           body: JSON.stringify({name: val})
       })
        .then(resp => {
            if(!resp.ok){
                if(resp.status >=400 && resp.status < 500){
                    return resp.json().then(data=>{
                        let err = {errorMessage: data.message};
                        throw err;
                    });
                }else{
                    let err = {errorMessagege: "Please try again later, server is not responding.."};
                    throw err;
                }
            }
            return resp.json();
            
        })   
}


export async function deleteTodo(todo){
    return fetch(todoAPI+"/"+todo, {
            method: 'delete',
        })
        .then(res => res.json())
}
