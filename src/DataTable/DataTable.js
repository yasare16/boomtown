import icon from '../images/menu.png'

const DataTable = ({data}) => {

    const headers = ['Name', 'Location', 'Purchase Date', 'Category', 'Description', 'Price', ' ']

    return (
        <table className="purchase-history-table">
            <thead>
                <tr>
                    {
                        headers.map((header, index) => {
                            const align = header === 'Category' ? {textAlign: 'center'} : {}
                            return <th style={align} key={index}>{header}</th>
                        })
                        
                    }
                </tr>
            </thead>
            <tbody>
                {
                    !!data && data.map(dataItem =>
                        <tr key={dataItem.id}>
                            <td className="name">{ dataItem.name }</td>
                            <td className="location">
                                <img src={dataItem.location} alt={ dataItem.name + '.' } />
                            </td>
                            <td className="date" data-col="Purchase Date">
                                {new Date(dataItem.purchaseDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </td>
                            <td className="category">
                               <span data-cat={dataItem.category}>{dataItem.category}</span>
                            </td>
                            <td className="desc">{dataItem.description.replace(/&#x(\d+);/g, "'")}</td>
                            <td className="price">${parseFloat(dataItem.price / 100).toFixed(2)}</td>
                            <td className="row-menu">
                                <button title="More options."><img src={icon} alt="" /></button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}

export default DataTable