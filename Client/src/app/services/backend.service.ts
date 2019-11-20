import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
    
    //Get,insert, update and delete on server side
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
            
        })
    };
    
    constructor(private http: HttpClient) {

    }
  
    get()
    {
       return this.http.get("api/Users");
    }
   
    insert(user:any)
    {
        return this.http.post("api/Users/", user, this.httpOptions);
    }

    update(user:any)
    {
        return this.http.put("api/Users/"+user.id, user, this.httpOptions);
    }

    delete(id)
    {
        return this.http.delete("api/Users/" + id, this.httpOptions )
    }
}

