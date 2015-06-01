Ticket Master
===
[![Supported platforms][badge-platforms]][Releases] [![Latest release][badge-release]][Releases] [![Open issues][badge-issues]][Issues]

**A multi platform Ticket tracker for [Facebook.com][Facebook] **

[![Ticket Master][Preview]][Releases]


## Description

Ticket Master is a [NW.js (formerly Node-Webkit)][NW.js] application, which means that it is a web application written in JavaScript ([AngularJS][AngularJS]), HTML and CSS ([LessCSS][LessCSS]) and is being run by an [Node.js][Node.js] powered version of [Chromium][Chromium].


## When to use

This application will track a facebook event after avaliable tickets for an facebook event. 

It currently requrires a facebook developers account to get a facebook Access Token.

## Download

[Here you can find the list of all recent releases.][Releases]

You can also try out the latest unreleased version by cloning this repository and building the application off the master branch.

## Build

Building the application on your own is simple. Just make sure that the latest stable version of [Node.js][Node.js] (including [npm][npm]) is installed on your machine.  
Then run the following lines from the path of your cloned repository to install all dependencies and to start the build process. You will then find the built executable inside the `build/releases` folder.

```bash
npm install -g grunt-cli bower # may require administrator privileges
npm install
grunt release
```


## Contributing

Every contribution is welcome! Please read [CONTRIBUTING.md][Contributing] first.


## Special Thanks

A specials thanks to the following people or projects:

This projects structure is based on Twitch Livestreamer GUI by Sebastian Meyer

  [Preview]: http://i.imgur.com/Z5dUMKQ.png "Preview image"
  [Releases]: https://github.com/AnteWall/TicketMaster/releases "Ticket Master Releases"
  [Issues]: https://github.com/AnteWall/TicketMaster/issues "Ticket Master Issues"
  [Contributing]: https://github.com/AnteWall/TicketMaster/blob/master/CONTRIBUTING.md
  [Facebook]: http://facebook.com "Facebook.com"
  [NW.js]: https://github.com/nwjs/nw.js "NW.js"
  [AngularJS]: http://angularjs.org/ "AngularJS"
  [LessCSS]: http://lesscss.org/ "LessCSS"
  [Chromium]: https://www.chromium.org/ "Chromium"
  [Node.js]: https://nodejs.org "Node.js"
  [npm]: https://npmjs.org "Node Packaged Modules"
  [badge-platforms]: https://img.shields.io/badge/platform-win%20%7C%20osx%20%7C%20linux-green.svg?style=flat-square "Supported platforms"
  [badge-release]: https://img.shields.io/github/release/AnteWall/TicketMaster.svg?style=flat-square "Latest release"
  [badge-issues]: https://img.shields.io/github/issues/AnteWall/TicketMaster.svg?style=flat-square "Open issues"
  
