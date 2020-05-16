import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage({})
@Component({
  selector: 'page-detalhes',
  templateUrl: 'detalhes.html',
})
export class DetalhesPage {

  total1:any;
  total2:any;
  total3:any;
  soma:any;

  detalhes:any = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public server: ServiceProvider) {
  }

  ionViewDidLoad() {
    this.ListarTotal();
    this.listarDetalhes();
   
  }

  ListarTotal(){

    let body ={
      crud: 'lista_transacao'
    }

    this.server.postData(body, 'Transacao.php').subscribe(data =>{
      let total1 = 0;
      let total2 = 0
      for(let i =0; i < data.result.length; i++){
        if(data.result[i]["status"] == 2 ){

          total1 += parseFloat(data.result[i]["valor"]);
        }else  {

          total2 += parseFloat(data.result[i]["valor"]);
        }
      }
      this.total1 = total1;
      this.total2 = total2;

      this.soma = (this.total1 - this.total2);
    
    })
     

  }



  listarDetalhes(){

    let body = {
      crud:'lista_Detalhes'
    }

    this.server.postData(body, 'Transacao.php').subscribe(data =>{

      for(let i=0; i < data.result.length; i++){
          
        this.detalhes.push({

          data: data.result[i]["data"],
          status: data.result[i]["status"],
          descricao: data.result[i]["descricao"],
          valor: data.result[i]["valor"]

        })

      }
    })

  }




}
