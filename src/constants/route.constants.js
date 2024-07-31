export const ROUTE_CONSTANTS = {
  USER_SCHEMA: [
    'name',
    'password',
    'userName',
    'email',
    'isAdmin',
    'bio',
    'image',
  ],
  GAME_SCHEMA: ['name', 'description', 'developer', 'releaseDate', 'image'],
  RATING_SCHEMA: ['gameId', 'userId', 'rating'],
  REVIEW_SCHEMA: ['gameId', 'userId', 'review', 'imageUrl'],
}
