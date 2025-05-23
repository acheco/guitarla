import Guitar from "../components/Guitar";

export type Guitar = {
  id: number,
  name: string,
  image: string,
  description: string,
  price: number,
}

export type GuitarProps = {
  guitar: Guitar,
  addToCart: (item: Guitar) => void,
}

export type CartItem = Guitar & {
  quantity: number,
}
