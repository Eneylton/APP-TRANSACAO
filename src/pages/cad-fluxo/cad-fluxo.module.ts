import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadFluxoPage } from './cad-fluxo';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    CadFluxoPage,
  ],
  imports: [
    BrMaskerModule ,
    IonicPageModule.forChild(CadFluxoPage),
  ],
})
export class CadFluxoPageModule {}
