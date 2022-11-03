# Uniswap Labs Analytics
[![npm](https://img.shields.io/npm/v/@uniswap/analytics)](https://www.npmjs.com/package/@uniswap/analytics)

The `@uniswap/analytics` package is a [npm package](https://www.npmjs.com/package/@uniswap/analytics) of React components and functions used to provide Analytics capability to Uniswap Labs products. 

## Installation

Install the widgets library via `npm` or `yarn`.

```js
yarn add @uniswap/analytics
```
```js
npm i --save @uniswap/analytics
```

Make sure the environment variable `REACT_APP_STAGING` is set to `false` in production.

## Release

Releasing is performed manually using the [release](/.github/workflows/release.yaml) Github workflow.


## Documentation


The client should be initialized before it is used. To initialize the client, pass in the url of the reverse proxy server:
```js
import { initializeAnalytics } from '@uniswap/analytics'

initializeAnalytics(REVERSE_PROXY_URL)
```

Before logging an event, make sure to add it under the `EventName` enum. To log an analytics event:
```js
import { sendAnalyticsEvent, EventName } from '@uniswap/analytics'

sendAnalyticsEvent(EventName.EXPLORE_BANNER_CLICKED, {})
```

There is also a built in React component that logs an event when it is first mounted. You may use it as a wrapper:
```js
import { Trace, EventName, ModalName } from '@uniswap/analytics'


<Trace name={EventName.TOKEN_SELECTOR_OPENED} modal={ModalName.TOKEN_SELECTOR}>
    <SomeComponent/>
</Trace>
```
Depending on the context that `<Trace/>` is used in, you may have to define new values for the enums that are passed in as arguments such: `Event`, `EventName`, `ModalName`, `ElementName`.

There is a React component that wraps event callbacks with logging logic:
```js
import { TraceEvent, EventName, ElementName } from '@uniswap/analytics'

<TraceEvent events={[Event.onClick]} name={EventName.SWAP_MAX_TOKEN_AMOUNT_SELECTED} element={ElementName.MAX_TOKEN_AMOUNT_BUTTON}>
    <SomeButton onClick={onClickHandler}/>
</TraceEvent>
``` 

Finally, you can set properties about the user of the application:
```js
import { CUSTOM_USER_PROPERTIES, user } from 'analytics'

user.set(CUSTOM_USER_PROPERTIES.DARK_MODE, isDarkMode)
```

## Example Apps

This package is used into a few of Uniswap Labs repos:

- [Interface](https://github.com/Uniswap/widgets-demo/tree/nextjs)
- [Docs](https://github.com/Uniswap/docs)




## Legal notice

Uniswap Labs encourages integrators to evaluate their own regulatory obligations when integrating this package into their products, including, but not limited to, those related to economic or trade sanctions compliance.

