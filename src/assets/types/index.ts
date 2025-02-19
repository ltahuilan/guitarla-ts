// interface Guitar {
//        property: string
// }

export type Guitar = {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number
}

/**utility types Pick<> Omit<>*/
// export type CartItem = Omit<Guitar, "description"> & {
//     quantity: number
// }
// export type CartItem = Pick<Guitar, "id" | "name" | "price"> & {
//     quantity: number
// }

export type CartItem = Guitar & {
    quantity: number
}

export type GuitarId = Guitar['id']

export type GuitarProps = {
    guitar: Guitar;
    addToCart: (item: Guitar) => void
}

