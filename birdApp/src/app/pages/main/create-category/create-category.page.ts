import { CategoryService } from 'src/app/services/category/category.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { CreateCategoryPayload } from 'src/app/models/payloads/create-category.payload';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.page.html',
  styleUrls: ['./create-category.page.scss'],
})
export class CreateCategoryPage implements OnInit {

  constructor(
    private readonly fb: FormBuilder,
    private readonly toast: ToastController,
    private readonly loading: LoadingController,
    private readonly router: Router,
    private readonly category: CategoryService
  ) {
    
    this.formGroup = this.fb.group({
      categoryName: ['', Validators.required],
      colorIndex: [0, Validators.required]
    })
   }

  ngOnInit() {
  }
  

  /* #region Public properties*/
  
  /*** 
   * A referência do formulário
   */
  public formGroup: FormGroup;

  /*** 
   * Diz se você está enviando esse formulário
   */
  public isSendingForm: boolean = false;
  
  /* #Endregion Public properties*/

  /* #region Private properties*/
  
  /*** 
   * A lista de cores disponíveis para o usuário
   */
  public readonly listCategoryColors: {color: string}[] = [
    { color: '#ffc542'},
    { color: '#ff575f'},
    { color: '#3dd598'},
    { color: '#755fe2'},
  ]
  
  /* #Endregion Private properties*/

  /* #region Public Methods*/
  
  public async onSubmit() {
    if(this.isSendingForm)
      return;
    
    this.isSendingForm = true;

    const { colorIndex, ...otherValues } = this.formGroup.getRawValue();

    const payload: CreateCategoryPayload = {
      ...otherValues,
      color: this.listCategoryColors[colorIndex].color
    }
    
    const loading = await this.loading.create({
      cssClass: 'bird--loading'
    });
    
    loading.present();
    const [ isSuccess, result]  = await this.category.createCategory(payload);
    loading.dismiss();

    await this.showMessage(result);

    if(!isSuccess)
      return ;

    await this.router.navigateByUrl(`/main/categories`);
    this.isSendingForm = false;
  }
  
  /* #Endregion Public Methods*/

  /* #region Private Methods*/
  
  /*** 
   * Método que exibe a mensagem de erro
   * 
   * @param message A mensagem
   */
  private async showMessage(message: string): Promise<void>{
    const toast = await this.toast.create({
      message,
      duration: 5_000,
    });

    await toast.present();
  }
  
  /* #Endregion Private Methods*/

}
