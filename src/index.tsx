
import { createRoot } from 'react-dom/client'
import { Node } from './components/node'
import { MindHoc } from './components/mindHoc'
const Test = () => {
    return (
        <>
            <MindHoc>
                <Node />
            </MindHoc>
        </>
    )
}


createRoot(document.getElementById('root')!).render(<Test />)