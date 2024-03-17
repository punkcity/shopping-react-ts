import { Card } from "react-bootstrap";
import { formatCurrency } from "../utils/formatCurrency";

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
  return (
    <Card key={id}>
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
      </Card.Body>
    </Card>
  );
}
