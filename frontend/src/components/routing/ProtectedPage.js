import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedPage = (props) => {
  const { isLogged, usertype } = useSelector((state) => {
    return { isLogged: state.auth.isLogged, usertype: state.auth.usertype };
  });

  var component = props.children

  if (props.authPath) {
    if (!isLogged) {
      component = <Redirect to="/login" />
    }
  
    if (isLogged && !props.permissionLevels.includes(usertype)) {
      component = <Redirect to="/" />
    }
  } else {
    if (isLogged) {
      component = <Redirect to="/" />
    }
  }

  return component
}

export default ProtectedPage