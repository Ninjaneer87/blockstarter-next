import Head from "next/head";
import ErrorPage from "@/components/features/error/ErrorPage";

const ServerErrorPage = () => {
  return (
    <>
      <Head>
        <title>BlockStarter | Server Error</title>
        <meta name="description" content="AndrejGround bad request page" />
      </Head>
      <ErrorPage
        code="500"
        message="The thing you need is not available!"
        buttonText="Take me home"
      />
    </>
  );
};

export default ServerErrorPage;
