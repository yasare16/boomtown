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
                            <td data-th="ID">{event.id}</td>
                            <td data-th="Type">{event.type.replace('Event', '')}</td>
                            <td data-th="Repo">
                                <a href={event.repo.url} className="name">
                                    {event.repo.name.replace(`${event.org.login}/`, '')}
                                </a></td>
                            <td data-th="Date">{format(new Date(event.created_at), 'MMMM do, yyyy')}</td>
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