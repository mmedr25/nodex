import type { ReactNode } from "react";
import AppContentContainer from "../app-content-container";

interface EntityContainerProps {
  header: ReactNode;
  search?: ReactNode;
  pagination?: ReactNode;
  children?: ReactNode;
}
const EntityContainer = ({
  header,
  search,
  pagination,
  children,
}: EntityContainerProps) => {
  return (
    <AppContentContainer>
      <div>
        <div>{header}</div>
        <div>
          {search}
          {children}
        </div>
        <div>{pagination}</div>
      </div>
    </AppContentContainer>
  );
};

export default EntityContainer;
