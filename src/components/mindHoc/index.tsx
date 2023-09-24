import { PropsWithChildren, useEffect, useRef, useState } from 'react'
const MindHoc = (props: PropsWithChildren<{}>) => {
    const isMouseDown = useRef(false)
    const [currentPosition, setCurrentPosition] = useState({ top: 0, left: 0 })
    const downPosition = useRef({ top: 0, left: 0 })
    const handleMouseMove = (e: MouseEvent) => {
        if (isMouseDown.current) {
            setCurrentPosition({
                top: e.clientY - downPosition.current.top,
                left: e.clientX - downPosition.current.left
            })
        }
    }
    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove)
        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault()
        e.stopPropagation()
        downPosition.current = {
            top: e.clientY - currentPosition.top,
            left: e.clientX - currentPosition.left
        }
        isMouseDown.current = true
    }

    const handleMouseUp: React.MouseEventHandler<HTMLDivElement> = () => {
        isMouseDown.current = false
    }


    return (
        <div
            style={{ position: 'absolute', ...currentPosition }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            {props.children}

        </div>
    )
}

export { MindHoc }