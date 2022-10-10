import { useState } from "react";
import classNames from "classnames";
import Events from "../Events/Events";

import './Tabs.scss';


const Tab = ({content}) => {
  const [chosenIndex, setChosenIndex] = useState(1);
    
  const toggleTab = (index) => {
    setChosenIndex(index);
  };

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
                                    return null
                                case 'issues':
                                    return null
                                case 'members':
                                    return null
                                default:
                                    throw Error(`Tab content id, ${c.id}, doesn't exist`)
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