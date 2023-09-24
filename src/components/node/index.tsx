const Node = () => {
    const defaultStyle: React.CSSProperties = {
        width: 100,
        height: 30,
        fontSize: 13,
        background: 'pink',
        border: '1px solid black',
        borderRadius: '3px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    }
    return (
        <div style={defaultStyle}>
            节点
        </div>
    )
}

export { Node }