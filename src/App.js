import { useEffect, useState } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import Repos from './Repos/Repos';
import Tab from './Tabs/Tabs';
import ErrorHandler from './ErrorHandler/ErrorHandler';
import NotFound from './NotFound';
import './App.scss';

function App() {
  const [gitData, setGitData] = useState(null)
  const [repos, setRepos] = useState([])
  const[content, setContent] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchInput, setSearchInput] = useState('boomtownroi')
  const [error, setError] = useState({ state: false, message: '', code: '', text:'' })
  
  //This bravely assumes we're always going for org accounts
  const baseUrl = 'https://api.github.com/orgs/'
  const url = `${baseUrl}${searchInput}`.toLowerCase()
 
  
  useEffect(() => {
    fetchGitData(url)
  }, [])

  const fetchGitData = async (dataUrl) => {
    const payload = await fetch(dataUrl, {
      headers: [
        ['Content-Type', 'application/json'],
        ['Accept', 'application/vnd.github.v3+json'],
        //['Authorization', 'Bearer ...'],
      ],
    })
    .then(response => {
      if (response.ok) {
        setError({state: false})
        return response.json()
      } else {
        const message = 'Oops! There was a problem retrieving the info you requested.'
        
        response.json().then(res => {
          console.error('There was a problem fetching the response: ', res.message)
          setError({ state: true, message, code: response.status, text: res.message })
          return Promise.reject(res.message)
        })
  
    }})
    .then(response => {
      setGitData(response)
      return Promise.allSettled([
        fetch(response['repos_url']).then(response => response.json()),
        fetch(response['events_url']).then(response => response.json()),
        fetch(response['public_members_url'].replace('{/member}', '')).then(response => response.json()),
        fetch(response['issues_url']).then(response => response.json()),
        fetch(response['hooks_url']).then(response => response.json()),
      ])
      .catch(response => console.log(`${response.url} was rejected->`, response.status))
    })
      .then(response => {
      //extracting data from response...
      const [
        repoData,
        eventsData,
        membersData,
        issuesData,
        hooksData,
      ] = response
      // as fodder for endpoint components 
      setRepos(repoData.value)
      setContent([
        { id: 'events', content: eventsData?.value},
        { id: 'members', content: membersData?.value },
        { id: 'issues', content: issuesData?.value },
        { id: 'hooks', content: hooksData?.value },
      ])
      //console.log(gitData, error.state)
      setLoading(false)
    })
    .catch(response => {
      console.error(response)
      setLoading(false)
    })
      
    return payload
  }

  const searchHandler = ({target}) => {
    setSearchInput(target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    fetchGitData(url)
  }

  //Ascertains newer date by simple comparison
  const getMostRecentDate = () => {
    return new Date(gitData['updated_at']).getTime() >= new Date(gitData['created_at']).getTime()
  }

  if (loading) {
    return <div className='loading'>Loading...</div>
  }
  
  return (
    
    <div className="App">
      <header className="content container App-header">
        <form onSubmit={submitHandler}>
          <input className="main-search" type="text" value={searchInput} onChange={searchHandler} />
        </form>
      </header>
      <main className="App-main">
        <div className="content container">
          {!error.state ?
            !!gitData ? <> 
              <h2 className='org--name' id={gitData.id}>
                <img src={gitData['avatar_url']} alt={gitData.name} width="40" />
                <a href={gitData['html_url']}>
                  {gitData.name}
                </a>
                <span className={classnames('org--status', { verified: gitData['is_verified'] })}>
                  {!!gitData['is_verified'] ? 'Verified' : 'Unverified'}
                </span>
              </h2>
              <div className="org--meta">
                <span className={classnames('org--created', { recent: !getMostRecentDate() })}>
                  Created {new Date(gitData['created_at']).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span className={classnames('org-updated', { recent: getMostRecentDate() })}>
                  Updated {moment(gitData['updated_at'], 'YYYYMMDD').fromNow()}
                </span>
              </div>
                <Tab content={content}/>
                <Repos repoData={repos} />
            </> : <NotFound subject="Data"/>
            :
            <ErrorHandler error={error} />
          }
          </div>
      </main>
    </div>

  )
}

export default App;
