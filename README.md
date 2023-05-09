<h1>Project 3: Wanderlust</h1>

<h2>Project Overview</h2>

During the eighth week of the GA Software Engineering immersive course, we were tasked with developing a full-stack app from scratch using the MERN (MongoDB, Express, React.js, and Node.js) framework. 

Our team came up with the idea of 'Wanderlust', a travel destination website that offers inspirational recommendations based on the current weather conditions.  Whether someone wants to visit a hot destination or ski in colder temperatures, Wanderlust provides a tailored list of options to suit their preferences.

<h3>Deployment link</h3>

https://wanderlust-project-3.herokuapp.com/

![My Image](client/src/components/images/image20.png)

<h3>Timeframe & Working Team</h3>

This project was working in a group with 3 members (including myself) with a duration of 1 week for completion.  I worked with fellow General Assembly members Ross Rogerson and Rosie Ventrella.

<h3>Technologies Used</h3>

<b>Front-end</b>
- HTML5
- CSS / SASS
- JavaScript
- React.js

<b>Back-end</b>
- Node.js
- Axios
- MongoDB
- Mongoose
- Express

<b>Tools</b>
- VSCode
- npm
- Git
- Github
- Trello
- Excalidraw
- Insomnia

<h2>Brief</h2>
- Build a full-stack application by making your own backend and your own front-end
- Use an Express API to serve your data from a Mongo database
- Consume your API with a separate front-end built with React
- Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models
- Implement thoughtful user stories / wireframes that are significant enough to help you know which features are core MVP and which you can cut
- Have a visually impressive design

<h2>Planning</h2>

**Step 1: Exploring Ideas**

As a group, we began by brainstorming ideas that would align with our shared interests and create a project that we would all be passionate about. Surprisingly, the process was much faster and simpler than anticipated as we discovered a mutual love for travelling. Additionally, I had an idea from a previous project that I couldn't implement due to API constraints, which perfectly aligned with our project's objectives.

Some other ideas we considered were: a restaurant finder in your area (as we are all foodies) and a social media replacement to Facebook. We all agreed the travel idea was our favourite, so we proceeded onto mocking out what the concept might look like.


**Step 2: Formulating the concept**

Right from the outset, I wanted to emphasise that we shared a cohesive vision for our product, which helped ensure that our desired outcomes were in sync. 

During the dark, cold, and gloomy weather of March in the UK, we wanted our product to assist us in discovering destinations across the globe where we could be informed about the current temperature in that location, and subsequently suggest places that align with our temperature preferences.

We explored some weather APIs that we could integrate with to help facilitate this, and we came across a few that did the job well (and free!), the best one being Open Meteo API. 


**Step 3: Creating the Wireframe and Database Diagram**

Creation of wireframe based on the above vision and requirements, at a high-level using Excalidraw - which would help define the HTML and SASS of the page, along with what potential functionality would be needed.

The homepage:

![My Image](client/src/components/images/image10.png)

The destinations index page:

![My Image](client/src/components/images/image6.png)

The single destination page:

![My Image](client/src/components/images/image9.png)

Based on the above, we then created a data diagram of the relationships of the data, using a tool called Quick DBD, which would help inform the creation of the data models / schemas:

![My Image](client/src/components/images/image19.png)

And then briefly sketched out the routes and controllers required:

![My Image](client/src/components/images/image13.png)

**Step 4: Defining the MVP**

For our minimum product, we all agreed we wanted the basic abilities of being able to have a landing page with carousel of destinations with desired temperature selection, a destination index showing all the results filtering down based on set temperature, a single destination page with more details about the destination (and to leave reviews), and a profile section to manage destinations and reviews

Stretched goals for post-MVP would be to have a nice slide-show mechanic that was smooth when scrolling imagery, a 7-day weather forecast displayed on the single destination page, have the login/register routes available on all pages via a modal (rather than separate routes as listed above), multiple images per destination, 100+ destinations of content to make the site feel authentic and useful, and possibly a search (although we already had a lot of work cut out for us ahead!)








