import { Dexie } from 'dexie';
import { CommentsEntity } from './comments-entity';

const WEB_ARCADE_DB_NAME = 'web-arcade-dexie';
const OBJECT_STORE_GAME_COMMENTS = 'gameComments';

export class WebArcadeDB extends Dexie {
    comments: Dexie.Table<CommentsEntity>;
    
    constructor() {
      super(WEB_ARCADE_DB_NAME);
      this.version(2).stores({
        gameComments: '++IdxCommentId,timeCommented, userName'
      });
      this.comments = this.table(OBJECT_STORE_GAME_COMMENTS);
     }
  }