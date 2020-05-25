# Code Challenge Discussion

## Technologies Used

**Frontend**
* React
* Redux
* localStorage (for persisting favorites and lists)
* Jest, Enzyme

**Backend**
* Node
* Express
* Jest, Supertest

## Q&A

### Q: Do you have any strong rationale for why you chose specific development technologies for this project that you would like to share with the team?

Vue.js and Angular are both suitable for an application of this nature, but I chose to build this application in React since it's a mature framework and currently [the most popular](https://www.npmtrends.com/react-vs-vue-vs-@angular/core) of the three. 

I wanted to build the application in such a way that the next developer who needs to work on it is most likely already familiar with the structure, patterns, and tooling necessary to do so.

### Q: Do you have any strong rationale for why you made specific design decisions (software architecture design) over alternatives?

**SPA Only vs. SPA + Lightweight Backend**

Although the [Unsplash API Guidelines](https://help.unsplash.com/en/articles/2511245-unsplash-api-guidelines) don't explicitly require the application's `access key` to be kept confidential, I wanted the front-end to search images through the application's own backend so that this credential is not made publicly available to anyone who wants to query images on behalf of this application. In future iterations, controls such as rate limiting and key rotation can be applied at the backend. 

The backend can also help insulate the frontend from breaking changes to Unsplash's own API by mapping Unsplash API responses to a contract agreed upon between the frontend and backend. This mapping also reduces the amount of data returned to the frontend, as it doesn't require nearly as much information as what is returned by the Unsplash API.

**Build & Deployment**

This application is containerized for easy deployment to cloud infrastructure. The current Dockerfile builds the front-end bundle into the backend image so that the entire application can run out of a single container.

If the build and delivery pipeline were in scope for this code challenge, I would have considered omitting the front-end bundle from the backend image and deploying it to a storage bucket (S3, etc..) instead.
 
### Q: Do you have any strong rationale for why you made specific implementation decisions over alternatives?

I used a domain-driven design approach to organize components and files within the frontend application. Rather than organizing files into directories named after their function (e.g. `components`, `actions`, `reducers`, etc...), everything is colocated within directories named after the _features_ of the application. The intent is to make it easier for the next developer who comes along to understand the structure of the application.

I don't think there is any one correct way to structure a frontend application, but the structure I chose aligns with the requirement to `Design and organize in a way to allow the next developer to maintain`.

## Todos

There's a few things I'd like to do if I had more time to work on this challenge.

* Testing
  * The store-connected components in this application aren't as well tested as some of the 'dumb' components. I'd like to increase unit test code coverage on these components. This testing should also assert specific functionality instead of simply relying on snapshot comparisons.
  * Write a small suite of verifiction e2e tests
* Bug fixes
  * Resizing gets a bit janky when the image list contains a lot of items. To keep the application performant, I'd like to minimize as much resizing and relayout of the grid as possible. Fixed breakpoints helps with this. 
  * Query input box value goes missing when navigating to `/favorites` and back to `/`
* Functionality
  * Error messaging when an API call fails
  * Implement proper error handling in the backend
  * Support removing an image from a list - Wire the 'Add to List' dialog into the store and pre-check the list checkboxes.
* Other
  * Backend readme and API docs
  * Convert components, tests, and redux slices to TypeScript
  * Build a CI pipeline
  * Refactor navigation component and routing strategy
  * Script infrastructure (Terraform, CloudFormation, etc...)