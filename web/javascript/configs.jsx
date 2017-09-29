import ProductView from "./productView/containers/ProductView.jsx";
import OrderView from "./orderView/containers/OrderView.jsx";
import OrderQueryView from "./orderQueryView/containers/OrderQueryView.jsx";

export const VIEWS_CONFIG = {
  CONFIG: [
    // Insert views and their path mappings
    {component: ProductView, path: '/'},
    {component: OrderView, path: '/order'},
    {component: OrderQueryView, path: '/query'}
  ],
};

export const NAVBAR_CONFIG = {
  // The different tabs and the link to where they are routed to.
  categories: [
    {title: 'Product Selection', link: '/'},
    {title: 'Your Order', link: '/order'},
    {title: 'Query Orders', link: '/query'},
  ],
  // The title image placed at the top, above nav.
  titleSrc: {
    path: 'images/brand.svg',
    alt: 'Streaming-online-analytics-demo'
  }
};

export const MODALS = {
  CART_MODAL : "001",
  PRODUCT_MODAL: "002"
};
