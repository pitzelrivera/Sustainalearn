import { GoogleLogin } from 'react-google-login';

const clientId = "582207653637-v3rikhn31efm2nshrtbclkq4bqogeh47.apps.googleusercontent.com";

const responseGoogle = (response) => {
  console.log(response);
}


<Login/>
function Login() {
    return (
	    <div>
	    <GoogleLogin
	clientId={clientId}
	render={renderProps => (
		<button onClick={renderProps.onClick} disabled={renderProps.disabled}>Login</button>
	)}
	onSuccess={responseGoogle}
	    onFailure={responseGoogle}
	    cookiePolicy={'single_host_origin'}
	    />
	    </div>
    );
}

export default Login;
