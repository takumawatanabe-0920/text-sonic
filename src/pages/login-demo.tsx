import axios from 'axios';
import { useEffect, useState } from 'react';

const clientId =
  '658478798216-td0kduh6um8appipkc7psv799d8kmplt.apps.googleusercontent.com';
const redirectUri = 'http://localhost:3016/login-demo'; // 例として localhost を使用

async function getUserInfo(accessToken: string) {
  const url =
    'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' +
    accessToken;

  try {
    const response = await axios.get(url);
    return response.data; // returns user data in JSON format
  } catch (error) {
    console.error('Error fetching user info: ', error);
    throw error;
  }
}

function Login() {
  const [userInfo, setUserInfo] = useState<{
    name: string;
    email: string;
    picture: string;
  }>(); // [1
  const handleClick = () => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&response_type=token&scope=openid%20profile%20email&redirect_uri=${redirectUri}`;
    window.location.href = url;
  };

  const accessToken =
    typeof window !== 'undefined' &&
    window?.location?.hash &&
    window.location.hash.includes('access_token')
      ? new URLSearchParams(window.location.hash).get('#access_token')
      : null;

  useEffect(() => {
    if (accessToken) {
      getUserInfo(accessToken).then((userInfo: any) => {
        console.log(userInfo);
        setUserInfo(userInfo);
      });
    }
  }, [accessToken]);

  return (
    <>
      {userInfo ? (
        <div>
          <h2>Logged in!</h2>
          <p>{userInfo.name}</p>
          <p>{userInfo.email}</p>
          <img src={userInfo.picture} alt="代替テキスト" />
        </div>
      ) : (
        <button onClick={handleClick}>Google Login</button>
      )}
    </>
  );
}

export default Login;
