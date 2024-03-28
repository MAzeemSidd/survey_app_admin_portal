import React from 'react'
import { ConfigProvider } from 'antd'

const SurveyAppColorTheme = ({children}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            siderBg: '#36454f'
          },
          Menu: {
            darkItemBg: '#36454f',
            darkItemHoverBg: '#375263',
            darkItemSelectedBg: '#26343d',
          },
          // Button: {
          //   defaultBg: '#375263',
          //   defaultHoverBg: '#4d7289',
          //   defaultColor: '#fff',
          //   defaultHoverColor: '#fff',
          //   defaultActiveBg: '#5e8ba8',
          //   defaultActiveColor: '#fff'
          // }
          Table: {
            headerBg: '#485d6b',
            headerColor: '#f0f0f0',
            headerBorderRadius: 7,
            footerBg: '#808080'
          },
          Segmented: {
            itemSelectedBg: '#f0f0f0',
            itemSelectedColor: '#485d6b',
            itemHoverBg: '#375263',
            itemHoverColor: '#fff',
            trackBg: '#485d6b',
            itemColor: '#f0f0f0',
            // trackPadding: 5
          }
        },
        token: {
          colorPrimary: '#375263'
        }
      }}
    >
      {children}
    </ConfigProvider>
  )
}

export default SurveyAppColorTheme
