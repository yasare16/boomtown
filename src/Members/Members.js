import NotFound from '../NotFound'
import './Repos.scss'

const Repos = ({ membersData }) => {
    return (
        
        <section className="repo-list">
            {
                !!membersData.length ?
                    <ul>
                        {membersData.map(dataItem =>
                            <li key={dataItem.id} id={dataItem.id}>
                                <div className="admin">
                                    <span>{dataItem.language}</span>
                                </div>
                                <div>
                                <h2 className="name">
                                    <a href={dataItem['html_url']}>{dataItem.login}</a>
                                </h2>
                                    <figure className="desc">
                                        <img src={dataItem['avatar_url']} alt="" width="50"/>
                                    </figure>
                                    
                                </div>
                        
                                <span className='date'>{dataItem.type}</span>
                                
                            </li>
                        )}
            
                    </ul> : <NotFound subject="Members" />
            }
        </section>
    )
}

export default Repos