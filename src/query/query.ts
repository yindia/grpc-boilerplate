export class Query {

  static CREATE_USER =`INSERT INTO user_info (name, username, password)
    VALUES (?, ?, ?)`;

  static CREATE_TWEET =`INSERT INTO tweets (author_id, content,published)
    VALUES (?, ?,?)`;
  static GET_USER = `SELECT
	users.name,
	users.username,
	COALESCE(following, 0) AS following,
	COALESCE(followers, 0) AS followers,
    COALESCE(tweets, 0) AS tweets,
    COALESCE(favorites, 0) AS favorites
FROM user_info users 
LEFT JOIN (
	SELECT user_id, COUNT(*) AS following
	FROM following
	GROUP BY user_id
) following ON following.user_id = users.id
LEFT JOIN (
	SELECT follow_id, COUNT(*) AS followers
	FROM following
	GROUP BY follow_id
) followers ON followers.follow_id = users.id
LEFT JOIN (
	SELECT author_id, COUNT(*) AS tweets
	FROM tweets
	GROUP BY author_id
) tweets ON tweets.author_id = users.id
LEFT JOIN (
	SELECT user_id, COUNT(*) AS favorites
	FROM favourites
	GROUP BY user_id
) favorites ON favorites.user_id = users.id
where users.id = ?`;

  static FOLLOW_USER = `INSERT INTO following (user_id,follow_id) VALUES (?,?)`;

  static GET_TIMELINE = `SELECT
	users.username,
  tweets.content,
  tweets.author_id,
	tweets.id as tweet_id,
	COALESCE(favourites,0) AS favourites
FROM user_info users 
INNER JOIN tweets ON tweets.author_id=users.id
LEFT JOIN (
	SELECT tweet_id, COUNT(*) AS favourites
	FROM favourites
	GROUP BY tweet_id
) favourites ON favourites.tweet_id = tweets.id
where users.id = ?`;

  static GET_HOME = `SELECT tweets.author_id,tweets.content,user.username,COALESCE(favourites,0) AS favourites
  FROM tweets 
  LEFT JOIN (
  SELECT username,id from user_info
  ) user ON tweets.author_id = user.id
  LEFT JOIN (
    SELECT tweet_id, COUNT(*) AS favourites
    FROM favourites
    GROUP BY tweet_id
  ) favourites ON favourites.tweet_id = tweets.id
  WHERE tweets.author_id = ? OR 
  tweets.author_id IN (SELECT follow_id FROM following WHERE user_id= ?) `;

}
