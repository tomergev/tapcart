# Tapcart Coding Assignment  

Proof of concept of a simple reactive chart created by using a  ```Card``` wrapper containing a ```Graph```component which is updated based on an interval

## Architecture 

### Polling Method

I choose to place the polling method which is producing the values on display in the ```Graph``` component (specifically a ```GraphIntervalContainer``` component which encompasses the ```Graph``` presentation component). One assumption I made in this architectural decision is that the data being displayed in the graph won't be needed in other areas of the Tapcart Merchant Dashboard. Therefore, a shared container component isn't necessary because the data is only needed in the individual ```Graph``` component. 

Also, if the state of all the graphs on display were located in one shared container component, it wouldn't be as performant because every time the state is changed for one graph, the container component will re-render causing all children components to re-render as well. This can be negated using memoized components (useMemo hook or creating a PureComponent), but this will introduce extra layers of complexity.

For the polling system itself, I used a custom react hook which is located in the hooks directory (useInterval.js). I decided to use react hooks for this project because 1: I am interested in improving my abilities with react hooks, 2: I found this excellent custom interval hook which Dan Abramov created (link: https://overreacted.io/making-setinterval-declarative-with-react-hooks/). I have used "setInterval" as a means to update a class component's state before in the past. It requires the use of many react life-cycle method for starting the interval, updating state, and canceling the interval when the component unmounts. This custom hook renders all the extra code which was needed with class components obsolete.  

### Graph Interval Container Component

The ```GraphIntervalContainer``` component is where the graph's metric are created via the setInterval hook. I decided to place every ```Graph``` component in a container component because it keeps the ```Graph``` component stateless and subsequently more easily reusable (this also apples to the ```Card``` component as well because now it is only displaying its children components as opposed to passing down props or handling any data processes). 

I would also like to note two props which the ```GraphIntervalContainer``` receives which allows the metrics displayed to be more customizable: initialData and createNewData. The initialData variable is the data which the graph will display upon its initial render. The createNewData variable is a function which appends new data to the current data stored in the state of the ```GraphIntervalContainer```.  

## Directory Layout:

```
src
│   index.css
│   index.js
│   serviceWorker.js
│
├───components
│   ├───app
│   │       App.module.css
│   │       AppPresentation.js
│   │       index.js
│   │
│   └───global
│       ├───card
│       │       Card.module.css
│       │       CardPresentation.js
│       │       index.js
│       │
│       └───graph
│               GraphIntervalContainer.js
│               GraphPresentation.js
│               index.js
│
├───hooks
│       useInterval.js
│
└───utils
        generateRandomNumber.js
```

## Components Directory

The components directory has two sub-directories: app & global. The global directory contains all reusable components for this POC. The app directory contains the views for this application. For this POC, I decided to only have one view in the app directory because the scope of the assignment only requires one general view. However, if the scope of the project was more complex, I would have multiple views in different sub-directories (dashboard, etc...) located within in the app directory. 

### Naming conventions and file structure for the components directory

All sub-folders located in this directory are lower case and all files conatining a component or CSS styling for those components are upper case. Each component directory can have a container (smart or stateful component), presentation (dumb or stateless component), or css module file. The index.js file located in these directories is the "top-most" layer of that particular directory which is being exported. I implemented this directory exporting style in order to debug problems more easily (because now errors wont be occurring in an index.js file, but instead in a very specific file, such as: GraphPresentation.js). 

### A few notes on the metric data

The data which I am displaying is very simple. The y-axis is a random number between one & ten and the x-axis is the index of the object in the data array. I am using this very simple data set only for this POC. 

Also, the ```GraphIntervalContainer``` can only update data which is a shallow data shape as opposed to a nested data type. I am aware of this future potential bug if a graph needs to be displayed which required a nested data type. However, I chose to keep the application simple and not concentrate on this future potential bug. (reaviz data shape docs: https://reaviz.io/?path=/docs/docs-getting-started-data-shapes--page)

### Bug

I am aware that the reavic scatter plot graph always displays "4pm" as the initial value of the x-axis. I chose to not dive too deep in correcting this bug and instead focus on the objectives of the assignment. 