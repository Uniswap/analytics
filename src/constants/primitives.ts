/**
 * Event names that can occur in this application.
 *
 * Subject to change as new features are added and new events are defined
 * and logged.
 */
export enum EventName {
  APP_LOADED = 'Application Loaded',
  APPROVE_TOKEN_TXN_SUBMITTED = 'Approve Token Transaction Submitted',
  CONNECT_WALLET_BUTTON_CLICKED = 'Connect Wallet Button Clicked',
  EXPLORE_BANNER_CLICKED = 'Explore Banner Clicked',
  EXPLORE_SEARCH_SELECTED = 'Explore Search Selected',
  EXPLORE_TOKEN_ROW_CLICKED = 'Explore Token Row Clicked',
  PAGE_VIEWED = 'Page Viewed',
  NAVBAR_RESULT_SELECTED = 'Navbar Result Selected',
  NAVBAR_SEARCH_SELECTED = 'Navbar Search Selected',
  NAVBAR_SEARCH_EXITED = 'Navbar Search Exited',
  NFT_ACTIVITY_SELECTED = 'NFT Activity Selected',
  NFT_BUY_ADDED = 'NFT Buy Bag Added',
  NFT_BUY_BAG_CHANGED = 'NFT Buy Bag Changed',
  NFT_BUY_BAG_PAY = 'NFT Buy Bag Pay Clicked',
  NFT_BUY_BAG_REFUNDED = 'NFT Buy Bag Refunded',
  NFT_BUY_BAG_SIGNED = 'NFT Buy Bag Signed',
  NFT_BUY_BAG_SUCCEEDED = 'NFT Buy Bag Succeeded',
  NFT_FILTER_OPENED = 'NFT Collection Filter Opened',
  NFT_FILTER_SELECTED = 'NFT Filter Selected',
  NFT_TRENDING_ROW_SELECTED = 'Trending Row Selected',
  SWAP_AUTOROUTER_VISUALIZATION_EXPANDED = 'Swap Autorouter Visualization Expanded',
  SWAP_DETAILS_EXPANDED = 'Swap Details Expanded',
  SWAP_MAX_TOKEN_AMOUNT_SELECTED = 'Swap Max Token Amount Selected',
  SWAP_PRICE_UPDATE_ACKNOWLEDGED = 'Swap Price Update Acknowledged',
  SWAP_QUOTE_RECEIVED = 'Swap Quote Received',
  SWAP_SIGNED = 'Swap Signed',
  SWAP_SUBMITTED_BUTTON_CLICKED = 'Swap Submit Button Clicked',
  SWAP_TOKENS_REVERSED = 'Swap Tokens Reversed',
  SWAP_TRANSACTION_COMPLETED = 'Swap Transaction Completed',
  TOKEN_IMPORTED = 'Token Imported',
  TOKEN_SELECTED = 'Token Selected',
  TOKEN_SELECTOR_OPENED = 'Token Selector Opened',
  WALLET_CONNECT_TXN_COMPLETED = 'Wallet Connect Transaction Completed',
  WALLET_SELECTED = 'Wallet Selected',
  WEB_VITALS = 'Web Vitals',
  WRAP_TOKEN_TXN_INVALIDATED = 'Wrap Token Transaction Invalidated',
  WRAP_TOKEN_TXN_SUBMITTED = 'Wrap Token Transaction Submitted',
  // alphabetize additional event names.
}

/**
 * Known events that trigger callbacks.
 * @example
 *  <TraceEvent events={[Event.onClick]} element={name}>
 */
export enum BrowserEvent {
  onClick = 'onClick',
  onFocus = 'onFocus',
  onKeyPress = 'onKeyPress',
  onSelect = 'onSelect',
  // alphabetize additional events.
}

export enum Browser {
  FIREFOX = 'Mozilla Firefox',
  SAMSUNG = 'Samsung Internet',
  OPERA = 'Opera',
  INTERNET_EXPLORER = 'Microsoft Internet Explorer',
  EDGE = 'Microsoft Edge (Legacy)',
  EDGE_CHROMIUM = 'Microsoft Edge (Chromium)',
  CHROME = 'Google Chrome or Chromium',
  SAFARI = 'Apple Safari',
  BRAVE = 'Brave',
  UNKNOWN = 'unknown',
}

export enum CustomerUserProperties {
  ALL_WALLET_ADDRESSES_CONNECTED = 'all_wallet_addresses_connected',
  ALL_WALLET_CHAIN_IDS = 'all_wallet_chain_ids',
  USER_AGENT = 'user_agent',
  BROWSER = 'browser',
  DARK_MODE = 'is_dark_mode',
  EXPERT_MODE = 'is_expert_mode',
  SCREEN_RESOLUTION_HEIGHT = 'screen_resolution_height',
  SCREEN_RESOLUTION_WIDTH = 'screen_resolution_width',
  WALLET_ADDRESS = 'wallet_address',
  WALLET_TYPE = 'wallet_type',
}
