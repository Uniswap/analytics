# Uniswap Labs Analytics
[![npm](https://img.shields.io/npm/v/@uniswap/analytics)](https://www.npmjs.com/package/@uniswap/analytics)

The `@uniswap/analytics` package is a [npm package](https://www.npmjs.com/package/@uniswap/analytics) of React components and functions used to provide Analytics capability to Uniswap Labs products.

This package is intended to be used with the [@uniswap/analytics-events](https://www.npmjs.com/package/@uniswap/analytics-events) package, which provides the constant definitions used inside this package.

## Installation

Install via `npm` or `yarn`.

```js
yarn add @uniswap/analytics
```
```js
npm i --save @uniswap/analytics
```

Make sure the environment variable `REACT_APP_STAGING` is set to `false` in production.

## Release

Releasing is performed manually using the [release](/.github/workflows/release.yaml) Github workflow.

This repository uses [semantic-release](https://github.com/semantic-release/semantic-release) for the release process,
which in turn uses the [Angular commit message suggestions](https://github.com/angular/angular/blob/main/CONTRIBUTING.md) to identify the type of release.


## Documentation


The client should be initialized before it is used. To initialize the client, pass in the API key of the application, as well as the name of
the application. If the application name is not listed under `OriginApplication`, it should be added under the enum. An additional
configuration object can be passed.

```js
import { initializeAnalytics, OriginApplication } from '@uniswap/analytics'

initializeAnalytics(MY_API_KEY, OriginApplication.INTERFACE, {
    proxyUrl: MY_PROXY_URL
})
```
Note that an Error is thrown if the client is initialized more than once.

Before logging an event, make sure to add it under the `EventName` enum in the [@uniswap/analytics-events](https://www.npmjs.com/package/@uniswap/analytics-events) package. To log an analytics event:
```js
import { sendAnalyticsEvent } from '@uniswap/analytics'
import { EventName, ElementName } from '@uniswap/analytics-events'

sendAnalyticsEvent(EventName.PAGE_CLICKED, {
    elementName: ElementName.TOP_MENU
})
```

There is also a built in React component that logs an event when it is first mounted. You may use it as a wrapper:
```js
import { Trace } from '@uniswap/analytics'
import { EventName, ModalName } from '@uniswap/analytics-events'


<Trace name={EventName.TOKEN_SELECTOR_OPENED} modal={ModalName.TOKEN_SELECTOR}>
    <SomeComponent/>
</Trace>
```
Depending on the context that `<Trace/>` is used in, you may have to define new values in [@uniswap/analytics-events](https://www.npmjs.com/package/@uniswap/analytics-events) for the enums that are passed in as arguments such: `BrowserEvent`, `EventName`, `ModalName`, `ElementName`.

There is a React component that wraps event callbacks with logging logic:
```js
import { TraceEvent } from '@uniswap/analytics'
import { EventName, ElementName } from '@uniswap/analytics-events'

<TraceEvent events={[Event.onClick]} name={EventName.SWAP_MAX_TOKEN_AMOUNT_SELECTED} element={ElementName.MAX_TOKEN_AMOUNT_BUTTON}>
    <SomeButton onClick={onClickHandler}/>
</TraceEvent>
``` 

Finally, you can set properties about the user of the application:
```js
import { user } from 'analytics'
import { CustomUserProperties } from '@uniswap/analytics-events'

user.set(CUSTOM_USER_PROPERTIES.DARK_MODE, isDarkMode)
```

## Example Apps

This package is used into a few of Uniswap Labs repos:

- [Interface](https://github.com/Uniswap/widgets-demo/tree/nextjs)
- [Docs](https://github.com/Uniswap/docs)




## Legal notice

Uniswap Labs encourages integrators to evaluate their own regulatory obligations when integrating this package into their products, including, but not limited to, those related to economic or trade sanctions compliance.

