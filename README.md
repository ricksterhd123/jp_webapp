# Jump pack web api
## Store page:
- [x] GET /api/store => Get the front-page store games
- [x] GET /api/store?game=id => Get game info by id
- [ ] GET /api/store?search=term => Get all games matching term
- [ ] GET /api/store/new => Get new recent additions to store
- [ ] GET /api/store/recommended => Get recommendations based on user data
## Chat:
- [ ] POST /api/chat => Send a message to player id
- [ ] GET  /api/chat/id => Get back 30 most recent messages from player id (maybe use request body instead)
- [ ] GET  /api/chat => Get all friends and their most recent messages
## Admin manager:
## Login
- [ ] PUT /api/user => create an account {validation required}
- [ ] POST /api/session => Authenticate app with username and password (encrypted in HTTPs)
## User manager:
- [ ] GET /api/user => get simple user profile info {authentication required}
- [ ] POST /api/user/settings => update user-data {authentication required}  
