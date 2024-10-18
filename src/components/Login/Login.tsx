import useGetAccessToken from "../../hooks/useGetAccessToken";

const Login = () => {
  const { handlePost } = useGetAccessToken();
  return (
    <button onClick={handlePost} type="submit">
      Get Access Token
    </button>
  );
};

export default Login;
