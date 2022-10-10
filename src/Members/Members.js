import NotFound from '../NotFound'
import './Members.scss'

const Repos = ({ membersData }) => {
    return (
        
        <section className="member-list">
            {
                !!membersData.length ?
                    <ul>
                        {membersData.map(dataItem =>
                            <li key={dataItem.id} id={dataItem.id}>
                                <div className='profile'>
                                    <figure>
                                        <img src={dataItem['avatar_url']} alt=""/>
                                    </figure>
                                    <div className='info'>
                                        <h2 className="name">
                                            <a target="_blank" rel="noreferrer" href={dataItem['html_url']}>
                                                {dataItem.login}
                                            </a>
                                        </h2>
                                        <span className='type'>{dataItem.type}</span> | <span className='admin'>{dataItem['site_admin'] ? 'Site Admin' : 'Member'}</span>
                                    </div>
                                     
                                </div>
                        
                               
                                
                            </li>
                        )}
            
                    </ul> : <NotFound subject="Members" />
            }
        </section>
    )
}

export default Repos