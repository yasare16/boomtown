import NotFound from '../NotFound'
import './Events.scss'
import {format} from 'date-fns'

const Event = ({ eventsData }) => {
    //console.log(eventsData)
    return (<>
        {
            !!eventsData.length ?
                <table className="events-list">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Event Type</th>
                            <th>Repository</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
        
                    {eventsData.map(event =>
                        <tr key={event.id}>
                            <td>{event.id}</td>
                            <td>{event.type.replace('Event', '')}</td>
                            <td>
                                <a href={event.repo.url} className="name">
                                    {event.repo.name.replace(`${event.org.login}/`, '')}
                                </a></td>
                            <td>{format(new Date(event.created_at), 'MMMM do, yyyy')}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
                :
                <NotFound subject="Events" />
        }
    </>)
}

export default Event