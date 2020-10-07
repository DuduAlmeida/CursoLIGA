import { Component, Input, OnInit } from '@angular/core';
import { CommentProxy } from 'src/app/models/proxies/comment.proxy';


/*** 
 * A classe que o componente exibe as informações de um comentário
 */
@Component({
  selector: 'bird-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent {

  constructor() { }

  /* #region Inputs*/
  
  /*** 
   * O conteúdo desse componente
   */
  @Input()
  public content: CommentProxy;
  
  /* #Endregion Inputs*/

}
