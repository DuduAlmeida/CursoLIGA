import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AvatarItem } from 'src/app/models/interfaces/avatar-item';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.page.html',
  styleUrls: ['./create-comment.page.scss'],
})
export class CreateCommentPage implements OnInit {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {

    this.categoryId = Number(this.route.snapshot.paramMap.get('categoryId')) | 0;

    if (this.categoryId === 0)
      return void this.router.navigateByUrl('/main/categories');

    console.log(this.categoryId);

  }

  ngOnInit() {
  }

  /* #region Public Properties*/
  
  /*** 
   * A identificação da categoria
   */
  public categoryId: number;

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
}
