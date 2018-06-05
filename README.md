# NearMe Service

This is a micro service that will live in the sidebar of a yelp recreation which will takecare of displaying 3 nearby businesses. This micro-service will also have a modal to display all the nearby businesses of the same category. This repo contains 100 entries to show basic functionality.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

you will need to install [mongo]: https://treehouse.github.io/installation-guides/mac/mongo-mac.html

### Installing

1. first install all the packages by running this command in the root of the repo

```
npm install
```

2. run the Seed.js file inside of the db folder with node. This will populate your mongo database with 100 entries

```
node server/db/Seed.js
```

3. run webpack

```
npm run build
```

4. in a new terminal window start component

```
npm start
```

5. if everything worked it should look like this when you visit http://localhost:3005/biz/-iFvYhgysvjkxckCr42NRw/

![alt text](https://github.com/foodees/NearMe-service/new/master/NearMeSideBarView.png "NearMeSideBarView")

![alt text](https://github.com/foodees/NearMe-service/new/master/NearMeModalView.png "NearMeModalView")
