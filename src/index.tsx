import React from 'react'
import { createRoot } from 'react-dom/client'
const Test = () => {
    return (
        <div>
            test
        </div>
    )
}


createRoot(document.getElementById('root')!).render(<Test />)