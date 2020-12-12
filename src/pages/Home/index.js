import * as React from "react";
import {
  SideNav,
  LayoutSidebar,
  Responsive,
  CardProduct,
  Pagination,
} from "upkit";
import { config } from "../../config";
import menus from "./menus";
import TopBar from "../../components/TopBar";
import {
  fetchProducts,
  setPage,
  goToNextPage,
  goToPrevPage,
} from "../../features/Products/actions";

import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  let dispatch = useDispatch();
  let products = useSelector((state) => state.products);

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, products.currentPage]);

  return (
    <div>
      <LayoutSidebar
        sidebar={<SideNav items={menus} verticalAlign="top" />}
        content={
          <div className="w-full h-full mr-5 md:flex md:flex-row-reverse min-h- screen">
            <div className="w-full pb-10 pl-5 md:w-3/4">
              <TopBar />
              <Responsive desktop={3} items="stretch">
                {products.data.map((product, index) => {
                  return (
                    <div key={index} className="p-2">
                      <CardProduct
                        title={product.name}
                        imgUrl={`${config.api_host}/upload/${product.image_url}`}
                        price={product.price}
                        // onAddToCart={(_) => null}
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
              Keranjang belanja di sini
            </div>
          </div>
        }
        sidebarSize={80}
      />
    </div>
  );
};

export default Home;
