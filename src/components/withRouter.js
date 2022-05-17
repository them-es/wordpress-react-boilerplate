import { useParams } from 'react-router-dom';


export function withRouter( Children ) {
  return ( props ) => {
    const match = { params: useParams() };
    return <Children { ...props } match={ match }/>
  }
}
