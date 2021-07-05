import React, { useReducer } from "./mock-react.js";
const { render } = React;
function reducer(state = {}, action = {}) {
  console.log(state);
  const clonedState = { ...state };
  let { user = {} } = clonedState;
  let { first_name, last_name, age, showMenu } = user;
  switch (action.type) {
    case "Age":
      age++;
      break;
    case "toggle-menu":
      showMenu = !showMenu;
    default:
      break;
  }
  return { user: { first_name, last_name, age, showMenu } };
}

function counter(state = {}, action = {}) {
  const clonedState = { ...state };
  let { count = 0 } = clonedState;
  switch (action.type) {
    case "incr":
      count++;
      break;

    default:
      break;
  }
  return { count };
}

const Welcome = () => {
  return `<p>Welcome to my Javascript Program!</p>`;
};
const Menu = (show = false) => {
  return ` 
            <nav>
            ${
              show
                ? `<ul>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Login</li>
                </ul>`
                : ``
            }
            </nav>`;
};

const App = () => {
  const [dispatch, state] = useReducer(reducer, {
    user: {
      first_name: "John",
      last_name: "Doe",
      age: 0,
      showMenu: false,
    },
  });
  function toggle() {
    dispatch({ type: "toggle-menu" });
  }
  const content = document.createElement("div");
  const button = document.createElement("button");
  const button2 = document.createElement("button");
  const header = document.createElement("div");
  const body = document.createElement("div");
  button.innerText = "Toggle";
  button2.innerText = "Age Me";
  button.onclick = toggle;
  button2.onclick = () => dispatch({ type: "Age" });
  header.innerHTML = `<h1>${Welcome()}<h1>`;
  body.innerHTML = `${Menu(state.user.showMenu || false)}
          <h2> I ${state.user.first_name} ${state.user.last_name} EXIST! Iam ${
    state.user.age
  } years old </h2>`;
  content.appendChild(header);
  content.appendChild(button);
  content.appendChild(button2);
  content.appendChild(body);
  return content;
};

render(App, "root");
