import ErrorPage from "@/components/features/error/ErrorPage";
import Head from "next/head";

const NotFoundPage = () => {
  return (
    <>
      <Head>
        <title>BlockStarter | Page Not Found</title>
        <meta name="description" content="AndrejGround page not found" />
      </Head>
      <ErrorPage
        code="404"
        message="Wrong turn, check your map!"
        buttonText="Take me home"
      />
    </>
  );
};

export default NotFoundPage;
