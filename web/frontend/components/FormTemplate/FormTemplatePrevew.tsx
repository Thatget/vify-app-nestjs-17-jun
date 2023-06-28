import { TextField } from '@shopify/polaris'
import React from 'react'
import previewProduct from '../../assets/previewPrpduct.jpeg'

type Props = {}


const FormTemplatePrivew = (props: Props) => {
  return (
    <div>
      <div>previwe</div>
      <div>
        <div style={{textAlign: 'center', width: '100%'}}>Title</div>
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          <div style={{flex: 2}}>
          <img style={{width: '100%'}} src={previewProduct} alt="Product preview" />
          </div>
          <div style={{flex: 3}}>image product</div>
        </div>
        <div>
          <div style={{display: 'flex', width: '100%'}}>
            <div style={{flex: 1}}>Name</div>
            <div style={{flex: 4}}>
              <input style={{width: '100%'}} type="email" name="email" id="email" />
            </div>
          </div>
          <div style={{display: 'flex', width: '100%'}}>
            <div style={{flex: 1}}>Email</div>
            <div style={{flex: 4}}>
              <input style={{width: '100%'}} type="email" name="email" id="email" />
            </div>
          </div>
          <div style={{display: 'flex', width: '100%'}}>
            <div style={{flex: 1}}>Message</div>
            <div style={{flex: 4}}>
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
