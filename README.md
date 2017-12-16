# SimulatorJS

SimulatorJS is a distributed UML Diagram Simulator
It supports three types of diagrams:

  - System Sequence Diagrams (SSD)
  - Class Diagrams
  - Deployment Diagrams

A live version of the Simulator is available [here][server-url]
# Main Features

  - Upload your diagrams using JSON Files
  - Play animations simultaneously on several devices
  - Chat Room

### Technology, Libraries, Frameworks

SimulatorJS uses a number of open source projects to work properly:

* [node.js] - Event-Based JavaScript runtime environnment
* [socket.io] - Realtime application framework (Node.JS server)
* [express] - Fast, unopinionated, minimalist web framework for node
* [bootstrap] - The most popular HTML, CSS, and JavaScript framework for developing responsive, mobile first projects on the web. 
* [jQuery] - JavaScript Library 

And of course SimulatorJS itself is open source with a [public repository][git-repo-url] on GitHub.

### Installation

SimulatorJS requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and start the server.

```sh
$ cd SimulatorJS
$ npm install -d
$ node server
```
-OR-

```sh
$ cd SimulatorJS
$ npm install -d
$ nodejs server
```

-OR if you want to use nodemon-

```sh
$ cd SimulatorJS
$ npm install -d
$ nodemon server
```

Then navigate to your server address in your preferred browser.

```sh
IP_ADDRESS_HERE:3000
```

License
----

MIT


**Free Software FTW**

   [git-repo-url]: <https://github.com/DIT029Team08/SimulatorJS>
   [bootstrap]: <https://github.com/twbs/bootstrap>
   [jQuery]: <https://github.com/jquery/jquery>
   [socket.io]: <https://github.com/socketio/socket.io>
   [node.js]: <https://github.com/nodejs>
   [express]: <https://github.com/expressjs/express>
   [server-url]: <http://gunray.skip.chalmers.se:3000>
