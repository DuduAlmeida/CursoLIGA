import { Component, OnInit } from '@angular/core';
import { CommentProxy, getFakeCommentProxy } from 'src/app/models/proxies/comment.proxy';

@Component({
  selector: 'bird-my-comments',
  templateUrl: './my-comments.page.html',
  styleUrls: ['./my-comments.page.scss'],
})
export class MyCommentsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  /* #region Public properties*/
  
  public listComments: CommentProxy[] = [
    getFakeCommentProxy(), 
    getFakeCommentProxy(),
    getFakeCommentProxy(),
    getFakeCommentProxy(),
    getFakeCommentProxy()
  ];
  
  /* #Endregion Public properties*/

  /* #region Public methods*/
  
  /*** 
   * O método que retorna a identificação do item da lista para ser usado
   * para verificar se o item já existe na lista, caso exista, não
   * deve fazer alterações no HTML
   * 
   * @param index -> o índice desse item na lista
   * @param value -> as informações do item
   */
  public trackById(index: number, value: CommentProxy): number{
    return value.id;
  }
  
  /* #Endregion Public methods*/
}
