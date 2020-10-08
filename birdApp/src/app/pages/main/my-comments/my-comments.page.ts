import { CommentService } from './../../../services/comment/comment.service';
import { Component, OnInit } from '@angular/core';
import { CommentProxy, getFakeCommentProxy } from 'src/app/models/proxies/comment.proxy';
import { TrackablePage } from 'src/app/common/trackable.page';

@Component({
  selector: 'bird-my-comments',
  templateUrl: './my-comments.page.html',
  styleUrls: ['./my-comments.page.scss'],
})
export class MyCommentsPage extends TrackablePage  implements OnInit {

  constructor(
    private readonly comment: CommentService
  ) {
    super();
   }


  /* #region Public properties*/

  public listComments: CommentProxy[] = [];

  /* #Endregion Public properties*/

  /* #region LifeCycle Events*/

  /*** 
   * Método executado ao iniciar o componente
   */
  public async ngOnInit(): Promise<void> {
    this.listComments = await this.comment.getMyComments();
  }

  /* #Endregion LifeCycle Events*/

}
