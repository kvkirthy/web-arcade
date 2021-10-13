import { Dexie } from 'dexie';
import { CommentsEntity } from './comments-entity';

const WEB_ARCADE_DB_NAME = 'web-arcade-dexie';
const OBJECT_STORE_GAME_COMMENTS = 'gameComments';

export class WebArcadeDb extends Dexie {
    comments: Dexie.Table<CommentsEntity>;
    
    constructor() {
      super(WEB_ARCADE_DB_NAME);
      this.version(1.2).stores({
        gameComments: '++IdxCommentId,timeCommented, userName, gameId',
        boardGameComments: null 
      }).upgrade( idb => 
        idb.table(OBJECT_STORE_GAME_COMMENTS)
          .toCollection()
          .modify( comments => {
            delete comments.userName;
          }) );
     
      this.comments = this.table(OBJECT_STORE_GAME_COMMENTS);
     }
  }
