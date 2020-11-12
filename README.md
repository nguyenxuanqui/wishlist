### Wishlist
Wishlist API provides some APIs for user to create/edit/observe the wishlist (user logged in as default).

### Built With

* [Nodejs](https://nodejs.org)
* [PostgreSQL](https://www.postgresql.org)

### Prerequisites
Nodejs, PostgreSQL installed. Please follow the guide in each site to install them.

### Installation

1. Clone a repo
```sh
git clone https://github.com/nguyenxuanqui/wishlist.git
```

2. Install NPM packages
```sh
npm install
```

3. Edit .env variables.
You can edit any variable in .env file (assume that you have created database, users in PostgreSQL).
But notice that the PORT variable is hardcoded in ./swagger/swagger-ui.yml so If you change the PORT value, please change in swagger too.

4. Start the API service.
```sh
npm start
```

Please wait for a few secs to see 2 lines

```sh
create wishlists done
create wishes done
```

5. Use the API

This project has 7 APIs to serve the requirements about wishlists.
- Get Wishlists: GET localhost:3000/wishlists/
- Create Wishlist: POST localhost:3000/wishlists/
- Get Wishlist By Id: GET localhost:3000/wishlists/:id
- Delete Wishlist By Id: DELETE localhost:3000/wishlists/:id
- Add Wish to Wishlist: POST localhost:3000/wishlists/:id/wishes/
- Update a Wish in the Wishlist: PUT localhost:3000/wishlists/:id/wishes/:wid
- Delete a Wish in the Wishlist: DELETE localhost:3000/wishlists/:id/wishes/:wid

You can also use the swagger UI to test by fill in value in the field.
Link: localhost:3000/wishlists/api-docs.

6. Unit test
Check and modify the value inside the file with path ./test/wishlist.js.
Run:

```sh
npm test
```

### Contact
Nguyen Xuan Qui - nxqstar@gmail.com
Project Link: https://github.com/nguyenxuanqui