import { Link } from "react-router-dom";
import { JSXSpan } from "../Elements";
import Header from "../sections/Header";
import RandomQuiz from "../sections/RandomQuiz";

export default function HomePage({ token, setToken, userId, setUserId }) {
  return (
    <>
      <Link to="/">
        <h1>
          <JSXSpan text="Know It All" />
        </h1>
      </Link>
      <h1>Welcome!</h1>
      <p>
        Welcome to Know It All – the ultimate destination for trivia lovers! Test
        your knowledge, challenge your friends, and discover fascinating facts
        across a variety of topics. Whether you're a trivia expert or just
        looking to learn something new, there's always something exciting
        waiting for you here. Let’s see how much you really know – start playing
        now and prove you're the ultimate Know It All!
      </p>
      <Header
        token={token}
        setToken={setToken}
        setUserId={setUserId}
        userId={userId}
        isHeader={false}
      />

    <RandomQuiz />
    </>
  );
}
