
This web app was made with Create-React-App.
To begin after **cloning**, run `npm i` to install the very few dependencies this project 
requires. Run `npm run start` to get going.

##Discussion
The project was heavily dependent upon the Github API and also leaned on its first call at the
organizational level for the rest of its subsequent API calls. 
After the initial fetch call, I bunched up the other calls in a `Promise.all()` function. 
This allowed me to gather the resulting data and distribute
it to the Tab component, through an object literal. The odd diagram below tries to illustrate
the very straight-forward architecture of the app based on how data travels through it.

                        App(with input) - ErrorHandler
                         |
                        / \
                    Repo   Tabs
                            |
                Events, Issues, Hooks, Members
                            |
                        NotFound

The Tabs Component and Search feature exist to make the app just a little more extensible.

###Failures
A major setback for me in building this app was my inability to get proper Authentication from the API.
I explored authentication by utilizing the `fetch` headers and through Github's `.git-credentials`
file(A Personal Access Token). Both of which didn't work in time for the full realization of the app.
Due to this, the */issues* and */hooks* urls always fail to return data. 