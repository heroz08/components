import * as COMS from '@coms'
import style from './index.module.less'
const suffix = 'Config'
const { config:CONFIG,COMPONENTS} = Object.keys(COMS).reduce((pre, key) => {
 if(key.includes(suffix)) {
   (pre.config)[key] = COMS[key]
 } else {
   (pre.COMPONENTS)[key] = COMS[key]
 }
 return pre
}, {config: {}, COMPONENTS: {}})

export default function Demo(){
  return (
    <div className={style.wrap}>
      {
        Object.keys(COMPONENTS).map(key => {
          const Com = COMPONENTS[key];
          const props = CONFIG[key + suffix]
          return (
            <div className={style.content} key={key}>
              <span className={style.title}>{key}</span>
              <div className={style.gridContent}>
                <Com {...props}/>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
