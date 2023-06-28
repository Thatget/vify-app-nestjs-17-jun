import { TextField } from '@shopify/polaris'
import React from 'react'

type Props = {}

const FormTemplatePrivew = (props: Props) => {
  return (
    <div>
      <div>previwe</div>
      <div>
        <div style={{textAlign: 'center', width: '100%'}}>Title</div>
        <div style={{display: 'flex'}}>
          <div style={{flexGrow: 2}}>image product</div>
          <div style={{flexGrow: 3}}>image product</div>
        </div>
        <div>
          <div style={{display: 'flex', width: '100%'}}>
            <div style={{flexGrow: 1}}>Name</div>
            <div style={{flexGrow: 4}}>
              <input style={{width: '100%'}} type="email" name="email" id="email" />
            </div>
          </div>
          <div style={{display: 'flex', width: '100%'}}>
            <div style={{flexGrow: 1}}>Name</div>
            <div style={{flexGrow: 4}}>
              <input style={{width: '100%'}} type="email" name="email" id="email" />
            </div>
          </div>
          <div style={{display: 'flex', width: '100%'}}>
            <div style={{flexGrow: 1}}>Name</div>
            <div style={{flexGrow: 4}}>
              <textarea style={{width: '100%'}} name="email" id="email" />
            </div>
          </div>
        </div>
        <div style={{textAlign: "center"}}>
          <button>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default FormTemplatePrivew
