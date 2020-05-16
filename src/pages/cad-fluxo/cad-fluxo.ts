import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';



@IonicPage({})
@Component({
  selector: 'page-cad-fluxo',
  templateUrl: 'cad-fluxo.html',
})
export class CadFluxoPage {

  total1:any;
  total2:any;
  total3:any;
  soma:any;

  valor:string;
  trasacao_id:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public toastyCrtl: ToastController,
              public server: ServiceProvider) {
                

                this.soma = 0;
  }

  ionViewDidLoad() {
    this.ListarTotal();
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

        }else if ( data.result[i]["status"] == 4) {
          
          total1 += parseFloat(data.result[i]["valor"]);
         
        }else if(data.result[i]["status"] == 5){
          total2 += parseFloat(data.result[i]["valor"]);
        }else{

          total2 += parseFloat(data.result[i]["valor"]);

        }

      }
      this.total1 = total1;
      this.total2 = total2;

      this.soma = (this.total1 - this.total2);
    
    })
     

  }

 
  cadastrar(){

    if(this.trasacao_id === '1' && this.valor >= this.soma){

      const toast = this.toastyCrtl.create({
        message: 'Valor Acima do limite !!!!',
        duration: 3000
      });
      toast.present();
    }else{
      let body = {
        valor:this.valor,
        trasacao_id:this.trasacao_id,
        crud:'adicionar'
  
      }
  
      this.server.postData(body,'Transacao.php').subscribe(data =>{
       
        this.showInsertOk();
  
      })

    }

  }

 showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Transação Efetuada ..',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {

            this.navCtrl.setRoot('HomePage')
          }
        }
      ]
    });
    alert.present();
  }
}
