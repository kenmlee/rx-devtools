## RxJS Devtools

This is a chrome extension that can be used to visualize RxJS streams in realtime. 

**Disclaimer:** This project started out as a POC to see if it was possible to visualize RxJS streams. It was later redefined as a chrome extension. This project is still a WIP. I encourage you to use it but remember, at this moment in time it is still in an early alpha phase and might not always work properly. I haven't properly tested all the operators, check the table below to see which ones should be working as of the current version. Feel free to create github issues when you discover problems, I will try to tackle them asap. 
 
### Installation

#### In your project

Install the following dependency in your project using yarn:

```yarn add rx-devtools```

or npm:

```npm i -S rx-devtools```

Initialize the package by calling the `setupRxDevtools` function:

```
import { setupRxDevtools } from 'rx-devtools/rx-devtools';
setupRxDevtools();
```

** Note: this should only be active in a development environment. Try to avoid having this code in your production build.**

#### Chrome extension



### How to use

The extension can be used to visualize streams in your application using marble diagrams. To mak

You are all set to go.

### Supported and tested operators

| Operators        | Tested           | Supported since |
| ------------- |:-------------:| -----:|
| Map      |yes|0.0.1-alpha.29|
| Filter      | yes|  0.0.1-alpha.29 |
| Take | yes     |    0.0.1-alpha.29 |
| Skip | yes     |    0.0.1-alpha.29 |
| MergeMap | yes     |    0.0.1-alpha.29 |
| Do | yes     |    0.0.1-alpha.29 |
| CombineLatest | yes     |    0.0.1-alpha.29 |


#### TODO

- [ ] Add correct time calculation (the lib should start it
