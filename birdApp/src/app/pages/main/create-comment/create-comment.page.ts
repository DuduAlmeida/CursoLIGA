import { CommentService } from 'src/app/services/comment/comment.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AvatarItem } from 'src/app/models/interfaces/avatar-item';
import { CreateCommentPayload } from 'src/app/models/payloads/create-comment.payload';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.page.html',
  styleUrls: ['./create-comment.page.scss'],
})
export class CreateCommentPage implements OnInit {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly comment: CommentService,
    private readonly toast: ToastController,
    private readonly loading: LoadingController,

  ) {

    this.categoryId = Number(this.route.snapshot.paramMap.get('categoryId')) | 0;

    if (this.categoryId === 0)
      return void this.router.navigateByUrl('/main/categories');

      this.formGroup = this.fb.group({
        personName: ['', Validators.required],
        personAvatarIndex: [0, Validators.required],
        categoryId: [this.categoryId, Validators.required],
        message: ['', Validators.required],
      })

  }

  ngOnInit() {
  }

  /* #region Public Properties*/
  
  /*** 
   * A identificação da categoria
   */
  public categoryId: number;

  /*** 
   * A referência do formulário
   */
  public formGroup: FormGroup;

  /*** 
   * Diz se você está enviando esse formulário
   */
  public isSendingForm: boolean = false;

  /*** 
   * A lista de avatares disponíveis para o usuário
   */
  public readonly listAvatars: AvatarItem[] = [
    { personColor: '#ffc542', personEmoji:'🤖'},
    { personColor: '#ff575f', personEmoji:'🎣'},
    { personColor: '#3dd598', personEmoji:'👻'},
    { personColor: '#755fe2', personEmoji:'👩🏼‍🚀'},
  ]
  
  /* #Endregion Public Properties*/

  /* #region Public Methods*/
  
  /*** 
   * Método executado quando o formulário é enviado
   */
  public async onSubmit(){
    if(this.isSendingForm)
      return;
    
    this.isSendingForm = true;

    const { personAvatarIndex, ...otherValues } = this.formGroup.getRawValue();

    const payload: CreateCommentPayload = {
      ...otherValues,
      personEmoji: this.listAvatars[personAvatarIndex].personEmoji,
      personColor: this.listAvatars[personAvatarIndex].personColor,
    }
    
    const loading = await this.loading.create({
      cssClass: 'bird--loading'
    });
    
    loading.present();
    const [ isSuccess, result]  = await this.comment.createComment(payload);
    loading.dismiss();

    await this.showMessage(result);

    if(!isSuccess)
      return ;

    await this.router.navigateByUrl(`/main/categories/${this.categoryId}`);
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
