### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
A: setTimeout, axios, $.getJSON

- What is a Promise?
A: It is an object that represents completion or failure of an asyncronous operation and it's resulting value.

- What are the differences between an async function and a regular function?
A: A regular function will continue to run until it returns or errors an async function will wait for the completion of some other request before completing. 

- What is the difference between Node.js and Express.js?
A: Node.js is the underlying JS code used to execute code outside of a browser.  Express.js sits on top of Node.js's web server function.

- What is the error-first callback pattern?
A: The error argument is passed first before the 'data' to maintain the integrity of callbacks.

- What is middleware?
A: Middleware is the application that is between the request and response.

- What does the `next` function do?
A: next() executes the next function if the previous middleware 'route' has not completed but control needs to be passed to the next function.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)
A: Each request is sequential, meaning 'joel' has to wait for 'elie' to return and so on.  The hardcoded URL is problematic as an API query may be better, and the return is not in order.  A paralell await on all and a promise would work better.
```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
