/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

interface DefaultLayoutProps {
  hideNavbar?: boolean;
}

const DefaultLayout = ({ hideNavbar = false }: DefaultLayoutProps) => {
  const GNB_HEIGHT = "62px";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main css={mainStyle({ hideNavbar, GNB_HEIGHT })}>
        <Outlet />
      </main>
    </>
  );
};

export default DefaultLayout;

const mainStyle = ({
  hideNavbar,
  GNB_HEIGHT,
}: {
  hideNavbar: boolean;
  GNB_HEIGHT: string;
}) => css`
  min-height: 100vh;
  padding-top: ${!hideNavbar ? GNB_HEIGHT : "0"};
`;
