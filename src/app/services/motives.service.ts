import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MotivesService {
  baseUrl = 'http://motivos.devel/index.php?';

  constructor(private http: HttpClient) {
    console.log('Servicio Listo');
  }


  getAllMotives(){
    const headers = new HttpHeaders({});
    return this.http.get( this.baseUrl + 'function=GET/AllMotives', {headers});
  }

  getMotives(filter){
    const headers = new HttpHeaders({});
    return this.http.get( this.baseUrl + `function=GET/Motives&filter=${filter}`, {headers});
  }

  getAllMotivesSorted( type:string ){
    const headers = new HttpHeaders({});
    return this.http.get( this.baseUrl + 'function=GET/AllMotives&sort=' + type , {headers});
  }

  updateMotive( id:number, description: string, estado: string, tipo:string ){
    const headers = new HttpHeaders({});
    return this.http.get( this.baseUrl + `function=UPDATE/Motive&id=${id}&motiveName=${description}&state=${estado}&type=${tipo}`, {headers});
  }

  createMotive(description: string, estado: string, tipo:string){
    const headers = new HttpHeaders({});
    return this.http.get( this.baseUrl + `function=POST/Motive&motiveName=${description}&state=${estado}&type=${tipo}`, {headers});
  }

  deleteMotive( id: number ){
    const headers = new HttpHeaders({});
    return this.http.get( this.baseUrl + `function=DELETE/Motive&id=${id}`, {headers});  
  }

}
