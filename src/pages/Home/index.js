import * as React from "react";
import {
  SideNav,
  LayoutSidebar,
  Responsive,
  CardProduct,
  Pagination,
  InputText,
  Pill,
} from "upkit";
import { config } from "../../config";
import menus from "./menus";
import TopBar from "../../components/TopBar";
import Cart from "../../components/Cart";
import {
  fetchProducts,
  setPage,
  goToNextPage,
  goToPrevPage,
  setKeyword,
  setCategory,
  toggleTag,
} from "../../features/Products/actions";
import BounceLoader from "react-spinners/BounceLoader";
import { tags } from "./tags";
import { addItem, clearItems } from "../../features/Cart/actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Home = () => {
  let dispatch = useDispatch();
  let products = useSelector((state) => state.products);
  let cart = useSelector((state) => state.cart);
  let history = useHistory();

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [
    dispatch,
    products.currentPage,
    products.keyword,
    products.category,
    products.tags,
  ]);

  return (
    <div>
      <LayoutSidebar
        sidebar={
          <SideNav
            items={menus}
            active={products.category}
            verticalAlign="top"
            onChange={(category) => dispatch(setCategory(category))}
          />
        }
        content={
          <div className="w-full h-full mr-5 md:flex md:flex-row-reverse min-h- screen">
            <div className="w-full pb-10 pl-5 md:w-3/4">
              <TopBar />

              <div className="w-full mt-5 mb-10 text-center">
                <InputText
                  fullRound
                  value={products.keyword}
                  placeholder="cari makanan favoritmu..."
                  fitContainer
                  onChange={(e) => {
                    dispatch(setKeyword(e.target.value));
                  }}
                />
              </div>

              <div className="flex pb-5 pl-2 mb-5 overflow-auto w-3/3">
                {tags[products.category].map((tag, index) => {
                  return (
                    <div key={index}>
                      <Pill
                        text={tag}
                        icon={tag.slice(0, 1).toUpperCase()}
                        isActive={products.tags.includes(tag)}
                        onClick={() => dispatch(toggleTag(tag))}
                      />
                    </div>
                  );
                })}
              </div>

              {products.status === "process" && !products.data.length ? (
                <div className="flex justify-center">
                  <BounceLoader color="red" />
                </div>
              ) : null}

              <Responsive desktop={3} items="stretch">
                {products.data.map((product, index) => {
                  return (
                    <div key={index} className="p-2">
                      <CardProduct
                        title={product.name}
                        imgUrl={`${config.api_host}/upload/${product.image_url}`}
                        price={product.price}
                        onAddToCart={() => dispatch(addItem(product))}
                      />
                    </div>
                  );
                })}
              </Responsive>
              <div className="my-10 text-center">
                <Pagination
                  totalItems={products.totalItems}
                  page={products.currentPage}
                  perPage={products.perPage}
                  onChange={(page) => dispatch(setPage(page))}
                  onNext={() => dispatch(goToNextPage())}
                  onPrev={() => dispatch(goToPrevPage())}
                />
              </div>
            </div>
            <div className="w-full h-full bg-gray-100 border-r border-white shadow-lg md:w-1/4">
              <Cart
                items={cart}
                onItemInc={(item) => dispatch(addItem(item))}
                onItemDec={(item) => dispatch(clearItems(item))}
                onCheckout={() => history.push("/checkout")}
              />
            </div>
          </div>
        }
        sidebarSize={80}
      />
    </div>
  );
};

export default Home;
