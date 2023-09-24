import { PropsWithChildren, useEffect, useRef, useState, createContext, useContext } from 'react'

type MindContextType = {
    handleMouseDown: React.MouseEventHandler<HTMLDivElement>;
    handleMouseMove: (e: MouseEvent) => void;
    handleMouseUp: React.MouseEventHandler<HTMLDivElement>;
    currentPosition: { top: number, left: number };
}

const MindContext = createContext<MindContextType>({
    handleMouseDown: () => { },
    handleMouseMove: () => { },
    handleMouseUp: () => { },
    currentPosition: { top: 0, left: 0 }
})

const MindHoc = (props: PropsWithChildren<{}>) => {
    const isMouseDown = useRef(false)
    const [currentPosition, setCurrentPosition] = useState({ top: 0, left: 0 })
    const downPosition = useRef({ top: 0, left: 0 })

    const handleMouseMove = (e: MouseEvent) => {
        if (isMouseDown.current) {
            const newTop = e.clientY - downPosition.current.top
            const newLeft = e.clientX - downPosition.current.left
            if (newTop !== currentPosition.top || newLeft !== currentPosition.left) {
                setCurrentPosition({
                    top: newTop,
                    left: newLeft
                })
            }
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
        <MindContext.Provider value={{ handleMouseDown, handleMouseMove, handleMouseUp, currentPosition }}>
            <div
                style={{ position: 'absolute', ...currentPosition }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            >
                {props.children}
            </div>
        </MindContext.Provider>
    )
}

const useMindContext = () => useContext(MindContext)

export { MindHoc, useMindContext }

