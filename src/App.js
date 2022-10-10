import { useEffect, useState, Suspense } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import Repos from './Repos/Repos';
import Tab from './Tabs/Tabs';
import ErrorHandler from './ErrorHandler/ErrorHandler';
import './App.scss';

function App() { //orgs/boomtownroi
  const [gitData, setGitData] = useState({})
  const [repos, setRepos] = useState([])
  const[content, setContent] = useState([])
  //const [loading, setLoading] = useState(true)
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
        ['Authorization', 'Bearer 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'],
      ],
    })
        .then(response => {
          if (response.ok) {
            setError({state: false})
          return response.json()
          } else {
            const message = 'Oops! there was a problem retrieving the info you requested. Maybe you made a typo?'
            response.json().then(res => {
              console.error('There was a problem fetching the response: ', res.message)
              setError({ state: true, message, code: response.status, text: res.message })
              Promise.reject(res.message)
            })
      
        }  })
        .then(response => {
          setGitData(response)
          return Promise.all([
            fetch(response['repos_url']).then(response => response.json()),
            fetch(response['events_url']).then(response => response.json()),
            fetch(response['issues_url']).then(response => response.json()),
            fetch(response['hooks_url']).then(response => response.json()),
            fetch(response['public_members_url']).then(response => response.json()),
          ])
          .catch(response => console.log('A promise was rejected->', response))
        })
        .then(response => {
          const [
            repoData,
            eventsData,
            issuesData,
            hooksData,
            membersData,
          ] = response
          setRepos(repoData)
          setContent([
            { id: 'events', content: eventsData},
            { id: 'issues', content: issuesData },
            { id: 'hooks', content: hooksData },
            { id: 'members', content: membersData },
          ])
          console.log(response)
          //setLoading(false)
        })
        .catch(response => {
          console.error(response)
          //setLoading(false)
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

  const getMostRecentDate = () => {
    return new Date(gitData['updated_at']).getTime() >= new Date(gitData['created_at']).getTime()
  }

  return (
    <Suspense fallback={<div className='loading'>Loading...</div>}>
    <div className="App">
      <header className="content container App-header">
        <form onSubmit={submitHandler}>
          <input className="main-search" type="text" value={searchInput} onChange={searchHandler} />
        </form>
      </header>
      <main className="App-main">
        <div className="content container">
          {!error.state ?
            !!gitData && <>
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
            </>
            :
            <ErrorHandler error={error} />
          }
          </div>
      </main>
    </div>
    </Suspense>
    
  )
}

export default App;
