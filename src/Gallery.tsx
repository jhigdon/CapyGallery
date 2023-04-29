

import { useState } from "react"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import capy1 from "./assets/capy1.webp"
import capy2 from "./assets/capy2.webp"
import capy3 from "./assets/capy3.webp"


type ImageItem = {
    image: string,
    dimensions: { width: number, height: number },
    rotation: number,
}

export const Gallery = () => {

    const dimensions = { width: 500, height: 500 }
    const [current, setCurrent] = useState(0);

    const [items, setItems] = useState<ImageItem[]>([
        { image: capy1, dimensions, rotation: 0 },
        { image: capy2, dimensions, rotation: 0 },
        { image: capy3, dimensions, rotation: 0 },
    ])

    const next = () => current != items.length - 1 ? setCurrent(current + 1) : items.length;
    const prev = () => current <= 0 ? 0 : setCurrent(current - 1)

    const rotateLeft = (rotation: number): number => rotation === -270
        ? 0
        : rotation - 90;

    const rotateRight = (rotation: number): number => rotation === 270
        ? 0
        : rotation + 90;

    return (
        <div>
            <div>
                <a onClick={() => {
                    setItems(prevItems =>
                        prevItems.map((item, idx) => idx === current
                            ? { ...item, rotation: rotateLeft(item.rotation) }
                            : item))
                }}>[rotate left]</a>

                <a onClick={() => {
                    setItems(prevItems =>
                        prevItems.map((item, idx) => idx === current
                            ? { ...item, rotation: rotateRight(item.rotation) }
                            : item))
                }}>[rotate right]</a>

            </div>

            <Carousel items={items} next={next} prev={prev} current={current} />

        </div>
    )
}

type CarouselProps = {
    items: ImageItem[]
    next: () => void,
    prev: () => void,
    current: number,
}

const Carousel = ({ items, next, prev, current }: CarouselProps) => {

    return (
        <TransformWrapper
            initialScale={1}
        >
            {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                    <div className="tools">
                        <button onClick={() => zoomIn()}>+</button>
                        <button onClick={() => zoomOut()}>-</button>
                        <button onClick={() => resetTransform()}>x</button>
                    </div>

                    <div style={{ display: "grid" }}>
                        <div><a onClick={() => prev()}>&lt;--</a></div>
                        <TransformComponent>
                            <img
                                src={items[current].image}
                                {...items[current].dimensions}
                                style={{ transform: `rotate(${items[current].rotation}deg)` }} />
                        </TransformComponent>

                        <div><a onClick={() => next()}>--&gt;</a></div>

                    </div>
                </>
            )}

        </TransformWrapper>
    )
}