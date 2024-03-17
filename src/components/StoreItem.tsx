import { Card, Button } from "react-bootstrap";
import { formatCurrency } from "../utils/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  category: string;
  imgurl: string;
};
export function StoreItem({
  id,
  name,
  price,
  category,
  imgurl,
}: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);
  return (
    <Card key={id} className="h-100">
      <Card.Img
        variant="top"
        src={imgurl}
        height="200px"
        style={{ objectFit: "cover", borderRadius: "5px" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-2">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <Card.Subtitle className="text-muted">{category}</Card.Subtitle>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button
              variant="primary"
              className="w-100"
              onClick={() => increaseCartQuantity(id)}
            >
              Add to Cart
            </Button>
          ) : (
            //It's a column with 2 rows
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button variant="danger" onClick={() => removeFromCart(id)}>
                  Remove
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
