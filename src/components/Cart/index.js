import * as React from "react";
import { arrayOf, string, shape, oneOfType, number, func } from "prop-types";
import { CardItem, Button } from "upkit";
import { config } from "../../config";
import FaArrowRight from "@meronex/icons/fa/FaArrowRight";
import FaCartPlus from "@meronex/icons/fa/FaCartPlus";

const Cart = ({ items, onItemInc, onItemDec, onCheckout }) => {
  return (
    <div>
      <div className="px-2 pb-5 mt-5 border-b">
        <div className="flex items-center text-3xl text-red-700">
          <FaCartPlus />
          <div className="ml-2">Keranjang</div>
        </div>
        <Button
          text="Checkout"
          fitContainer
          iconAfter={<FaArrowRight />}
          disabled={!items.length}
          onClick={onCheckout}
        />
      </div>

      {!items.length ? (
        <div className="text-sm text-center text-red- 900">
          belum ada items di keranjang
        </div>
      ) : null}

      <div className="p-2">
        {items.map((item, index) => {
          return (
            <div key={index} className="mb-2">
              <CardItem
                imgUrl={`${config.api_host}/upload/${item.image_url}`}
                name={item.name}
                qty={item.qty}
                color="orange"
                onInc={() => onItemInc(item)}
                onDec={() => onItemDec(item)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

Cart.propTypes = {
  items: arrayOf(
    shape({
      _id: string.isRequired,
      name: string.isRequired,
      qty: oneOfType([string, number]).isRequired,
    })
  ),
  onItemInc: func, // (1)
  onItemDec: func,
  onCheckout: func,
};

export default Cart;
