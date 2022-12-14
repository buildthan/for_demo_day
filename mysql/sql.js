module.exports = {
  userList: `select * from user`,
  userInsert: `insert into user set ?`,
  userCheckDB: `select * from user where id = ?`,
  userUpdate: `update user set username = ? where id = ?`,

  profileList: `select * from profile`,
  profileInsert: `insert into profile set ?`,
  profileCheck: `select * from profile where id = ?`,

  profileUpdate1: `update profile set username1 = ? where id = ? and username1 = ?`,
  profileUpdate2: `update profile set username2 = ? where id = ? and username2 = ?`,
  profileUpdate3: `update profile set username3 = ? where id = ? and username3 = ?`,

  contentsList: `select * from contents where id = ? and username = ? order by incre DESC`,
  contentsInsert: `insert into contents set ?`,
  contentsSwitch: `update contents set incre = ? where contents_id = ?`,

  contentsUpdate_username: `update contents set username = ? where id = ? and username = ?`,
  select_last_insertid: `SELECT max(contents_id) FROM contents;`,

  user_detail_introduction: `select * from user_detail where id = ? and username = ?`,
  user_detail_update: `update user_detail set username = ? , introduction = ? where id = ? and username = ?`,

  follower_update_username: `update follower set username = ? where id = ? and username = ?`,
  follower_update_username2: `update follower set follower_username = ? where follower_id = ? and follower_username = ?`,

  following_update_username: `update following set username = ? where id = ? and username = ?`,
  following_update_username2: `update following  set following_username = ? where following_id = ? and following_username = ?`,

  contentsUpdate: `update contents set title = ?, contents = ? where contents_id = ?`,
  contentsDelete: `delete from contents where contents_id = ?`,

  sessionList: `select * from sessions`,

  user_detail_List: `select * from user_detail where id = ?`,
  user_detail_Insert: `insert into user_detail set ?`, //회원가입하면 자동으로 user_detail 테이블에 생성되도록
  user_detail_follow_check: `select * from user_detail where id = ? and username = ?`,
  user_detail_following_num_Update: `update user_detail, (select count(*) as cnt from following where id=? and username=?) as F set following_num = F.cnt where id=? and username=?`, //following 수 업데이트
  user_detail_follower_num_Update: `update user_detail, (select count(*) as cnt from follower where id=? and username=?) as F set follower_num = F.cnt where id=? and username=?`, //follower 수 업데이트

  followerList: `select * from follower where id = ? and username = ?`,
  followerInsert: `insert into follower values (?, ?, ?, ?)`,
  followerDelete: `delete from follower where id = ? and username = ? and follower_id = ? and follower_username = ?`,

  followingList: `select * from following where id = ? and username = ?`,
  followingInsert: `insert into following values (?, ?, ?, ?)`,
  followingDelete: `delete from following where id = ? and username = ? and following_id = ? and following_username = ?`,
  followingCheck: `select * from following where id = ? and username = ? and following_id = ? and following_username = ?`,

  userSearch: `select * from user_detail where username like ?`,

  commentsList: `select * from comments where contents_id = ? order by incre DESC `,
  commentsInsert: `insert into comments set contents_id =?, id = ?, username = ?, contents = ?`,
  comments_update_username: `update comments set username = ? where id = ? and username = ?`,
};
