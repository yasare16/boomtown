import { useState } from "react";
import classNames from "classnames";
import Events from "../Events/Events";
import Members from "../Members/Members";

import './Tabs.scss';


const Tab = ({content}) => {
  const [chosenIndex, setChosenIndex] = useState(1);
    
  const toggleTab = (index) => {
    setChosenIndex(index);
  };

  //Compare index of clicked tab to index state 
  const getActiveClass = (index) => chosenIndex === index

    return (
    <section className="tab-container">
        <ul className="tab-list">
            {content.map((label, index) => 
                <li
                key={index}
                className={classNames('tabs', { 'active': getActiveClass(index + 1) })}
                onClick={() => toggleTab(index + 1)}
            >
            {label.id}
            </li>
            )}
        </ul>
        <div className="content-container">
            {content.map((c, index) =>
                <div className={classNames('content-box', { 'active': getActiveClass(index+1) })} key={c.id+index}>
                    {
                        (() => {
                            switch (c.id) {
                                case 'events':
                                    return <Events eventsData={c.content}/>
                                case 'hooks':
                                    return null // Couldn't reach hooks and issue components...
                                case 'issues':
                                    return null //... because oof issues with github API
                                case 'members':
                                    return <Members membersData={c.content}/>
                                default:
                                    //Making sure we know the defective id. The ids mae or break us
                                    throw Error(`Tab data, id:${c.id}, doesn't exist`)
                            }
                        })()
                    }
                </div>
            )}
        </div>
    </section>
  );
};

export default Tab