import React from 'react'
import reactCSS from 'reactcss'
import _ from 'lodash'

import SlackSelectorHeaderTab from './SlackSelectorHeaderTab'
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export const SlackSelectorHeader = ({ tabs, active }) => {
  const styles = reactCSS({
    'default': {
      header: {
        padding: '4px 0 0 7px',
        borderBottom: '1px solid rgba(0,0,0,.15)',
        display: 'flex',
      },
    },
  })

  const handleClick = (id) => document.getElementById(id).scrollIntoView(false)

  return (
    <div style={ styles.header }>
      { _.map(tabs, (tab) => {
        return (
          <SlackSelectorHeaderTab
            icon={ tab.icon }
            id={ tab.id }
            key={ tab.id }
            active={ tab.id === active }
            onClick={ handleClick }
          />
        )
      }) }
    </div>
  )
}

SlackSelectorHeader.defaultProps = {
  tabs: [{
    icon: '',
    id: 'mine',
  }, {
    icon: '',
    id: 'people',
  }, {
    icon: '🐑',
    id: 'nature',
  }, {
    icon: '',
    id: 'food-and-drink',
  }, {
    icon: '',
    id: 'activity',
  }, {
    icon: '',
    id: 'travel-and-places',
  }, {
    icon: '',
    id: 'objects',
  }, {
    icon: '',
    id: 'symbols',
  }, {
    icon: '',
    id: 'flags',
  }],
}

export default SlackSelectorHeader
