# [🐞 Critterpedia Lite 🐛](https://goldmintz.github.io/critterpedia/)


## Overview
This lightweight project was created with [Create React App](https://github.com/facebook/create-react-app).
I wanted to see how far I could take interactions with a simple API call without the need for additional frameworks or libraries (like Redux).

### Screenshots
*coming soon*


## Features & Functionality
This app leverages the [AnimalCrossing API](http://acnhapi.com/) RESTFUL API to help users discover **fish, bugs, and sea creatures** currently available in their hemisphere. 

Users can:
- Search for critters dynamically by name
- Filter critters by type
- Set language preference (currently English or Japanese)
- Set local hemisphere (Northern or Southern)
- View critter details (name, image, facts, and value)


## Tech Stack
Critterpedia Lite was built solely with create-react-app with custom CSS.

### Front-End 
- React
- Custom and standard API React hooks 
- RESTFUL API

## Limitations & Suggested Improvements
**This is a fairly simple project that was more focused on the design and quick usability than tech scaffolding.**

### Engineering
In a future release, I'd add basic global state management. The main benefit would be fetching and storing the returned JSON to gather details like object count and type. This would improve the 'loading' experience outlined below in design improvements.

### Design
- I'd add 'loading' and 'unavailable' icons as 'ghost elements' based on the critter type. Adding these would visually improve the grid loading experience.
- I started diving into flexbox with this project, as it was a perfect fit for what is essentially a grid-based UI. Because I was learning as I coded, there are instances of redundant code.
- If I was feeling extra 🌶️ spicy🌶️, I'd leverage the CSS `calc()` function to resize each grid square and its children so that the returned layout always had an even number of squares in a row. 


Happy critter hunting!
