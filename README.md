# Jump pack web api
## Store page:
- [ ] GET /store => Get the front-page store games
- [ ] GET /store?game=id => Get game info by id
- [ ] GET /store?search=term => Get all games matching term
- [ ] GET /store/new => Get new recent additions to store
- [ ] GET /store/recommended => Get recommendations based on user data
## Chat:
- [ ] POST /chat/id => Send a message to player id
- [ ] GET  /chat/id => Get back 30 most recent messages from player id
- [ ] GET  /chat => Get all friends and their most recent messages
## Admin manager:
## Login
- [ ] POST /register => create an account {validation required}
- [ ] POST /authenticate => Authenticate app with token and credentials
## User manager:
- [ ] GET /account => get simple user profile info {authentication required}
- [ ] PUT /account/settings => overwrite user profile info {authentication required}  
