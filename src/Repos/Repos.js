import NotFound from '../NotFound'
import './Repos.scss'
import moment from 'moment'

const Repos = ({ repoData }) => {
    return (
        
        <section className="repo-list">
            {
                !!repoData.length ? <>
                    <h2 className='title'>Repositories</h2>
                    <ul>
                        {repoData.map(dataItem =>
                            <li key={dataItem.id}>
                                <div className="category">
                                    <span>{dataItem.language}</span>
                                </div>
                                <h3 className="name">
                                    <a href={dataItem.url}>{dataItem.name}</a>
                                </h3>
                                <p className="desc">{dataItem.description}</p>
                        
                                <span className='date'>Created {moment(dataItem['created_at']).format('MMM Do, yyyy')}</span>
                                <span className='date'>Updated {moment(dataItem['updated_at'], 'YYYYMMDD').fromNow()}</span>
                                <span className="date">
                                    Pushed {moment(dataItem['pushed_at'], 'YYYYMMDD').fromNow() /*Relative dates work well for events that have possibly happened  recent memory */}
                                </span>
                            </li>
                        )}
            
                    </ul></> : <NotFound subject="Repositories" />
            }
        </section>
    )
}

export default Repos