# Feed Filter Reddit App

## Setup
    - install npm 10.1.0
    - @reduxjs/toolkit: "^1.9.7",
    - @testing-library/jest-dom: "^5.17.0",
    - @testing-library/react: "^13.4.0",
    - @testing-library/user-event: "^13.5.0",
    - jest: "^27.5.1",
    - nanoid: "^5.0.3",
    - react: "^18.2.0",
    - react-dom: "^18.2.0",
    - react-markdown: "^9.0.1",
    - react-redux: "^8.1.3",
    - react-router-dom: "^6.18.0",
    - react-scripts: "5.0.1",
    - redux-mock-store: "^1.5.4",

**msw** is also installed as a dev dependencies however currently can not import it into test file due to syntax error "export not supported."
*This is to be use in the the test file to intercept the api request and populate the store with mocked data.* 

TODO: Check for updates or dependencies needed to allow for imports in ES6 when not running app in browser. This is in the refactor-test branch.

## App overview

This app uses the ***reddit.json api*** to populate the apps redux store.

The app has section that make up the app **subreddit list** and **feed**.

### subreddit list

Subreddit list fetches the most popular subreddit's from the the reddit.json api *limited to 5* and displays them in a list with buttons.

The buttons when clicked remove or add subreddit's back to the feed.

There is also a text input that fetches new subreddit from the reddit.json api 

### Feed
Feed displays all of the post fetch from the reddit.json api. and displays them. 


# Application Files
## src/app
### App.js
    App creates Root currently the app only has one page but I am expecting the app to expand, so root has been prematurely implemented.
### Root.js
    Shows where to display file that are in the root.
### page.js
    Page is used to initiate a useState().
    filterHandler function adds name of subreddit to remove from feed to an array of if it already exist remove name from array.

    Function gets passed to the <SubscriberList> so that when button are clicked the name is added to state. 
    The value is passed from state is passed to <Feed> so that it can pass the array to the redux store and filter out the subreddit's return to the <Feed>.
### store.js
    Uses "@reduxjs/toolkit" to create a redux store from the slices. 

## src/feed
### feedSlice.js
Controls the store slice for the Feed component
```
const initialState = {
subredditPost: [],
subreddits: {},
postsLoading: false,
failedToLoadPost: false
}
```
**builder extra reduces**
- Pending will set *PostLoading* to true and *failedToLoadPost* to false.
- rejected will set *PostLoading* to false and *failedToLoadPost* to true.

*This values can be passed to Feed to trigger loading animations or error messages.*

- Fulfilled create ne object from response object of all the things we need to display sorts tham by the provided sort value and added o the end on **subredditPost** so that all new post are added to the end of the Feed.

#### createAsyncThunk
***loadPostFromSubreddits()*** This async thunk excepts an array of subreddit names or a single name to fetch post from given subreddit. If array is passed Promise all is used to wait for an array of response to be returned and return the array of fulfilled.
***builder extra reduces*** Will handle it. 

***loadExtraPosts*** This async thunk is used to fech new post excepting an array of subreddit post name which it will not get, It matches the name of subreddit's that are not there and get the name of the last post which is stored in *subreddit's* it will fetch post after that one. Again using promise all to get an array of promise wait until fulfilled and then returned. ***builder extra reduces*** handle to response in the same manner as above. 

#### feedSlice.js exports
- A selector that filters out an array of subreddit names not to get.
- feelSlice actions.
- feedSlice reduce to build store.

### Feed.js
Get is passed the filter of subreddit names to to retrieve from feedSlice. which gets passed to the useSelector(selectFeed(filter)), this gets the sorted array of post from feedSlice. 

this array is mapped to Post which displays it. 

## src/subscibed-list
Controls the store slice for the SubscribedSlice component
```
const initialState = {
    subReddits: {},
    isLoadingSubreddits: false,
    failedToLoadSubreddits: false,

}
```
**builder extra reduces**
- Pending will set *isLoadingSubreddits* to true and *failedToLoadSubreddits* to false.
- rejected will set *isLoadingSubreddits* to false and *failedToLoadSubreddits* to true.

*This values can be passed to subscribedList to trigger loading animations or error messages.*

- Fulfilled add object to *subReddits* with the subreddit's url as key.

#### createAsyncThunk

***loadInSubreddits()*** send a fetch request that gets 5 subreddit's from the reddit.json api and awaits a response. 

***addNewSubreddit()*** is passed a subreddit name from the use which it then fetch from the api. 
 

#### feedSlice.js exports
- selector
- actions
- reducer to build store

## SubscriberList.js
Displays a list of of buttons that if clicked filter out the post from feed. 

***styleSize*** is a true or false value determent by the inner window size and depending on it being true or false will change the classNames passed to the different JSX element to change there display to suit mobile.

***Dispatches***

*loadInSubreddits()* is dispatch to store to retrieve the most popular subreddit's from reddit.json api. it is in a useEffect() that is only called on the first render.

*loadPostFromSubreddits()* passes an array of subreddit names to get post from to populate Feed with post with filtered out.

*addNewSubreddit()* gets new subreddit and adds it to the list when search form is sent. 

***Returns***

A form to get new subreddit's and maps all the subreddit's to FeedFilter

# Refactoring That is Needed
## SubredditList
- Buttons to show when they have been click a change of color and back again, when clicked again.
- subreddit loading animation and failed to load message.
- Manage edge cases from user input to get new subreddit's and write test for that. 

## FeedSlice
has repetitive code this can be turned into a function. 

## Test
Resolve issue with MSW not importing on ES6 or common.js require. It is a problem with how the package is manage. 

## FeedSlice
clean up feed slice.


