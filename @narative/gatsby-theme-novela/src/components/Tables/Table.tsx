import React from "react";
import styled from "@emotion/styled";
import mediaqueries from "@styles/media";

const StyledTable = styled.table`
  position: relative;
  line-height: 1.65;
  color: ${p => p.theme.colors.grey};
  font-family: ${p => p.theme.fonts.sansSerif};
  transition: ${p => p.theme.colorModeTransition};
  background: ${p => p.theme.colors.card};
  margin: 45px auto 85px;
  width: 100%;
  max-width: 1004px;
  border: 1px solid ${p => p.theme.colors.horizontalRule};
  border-radius: 5px;
  overflow: hidden;
  border-collapse: separate;

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  ${mediaqueries.desktop`
    margin: 25px auto 65px;
  `}

  ${mediaqueries.tablet`
    max-width: 486px;
  `};

  ${mediaqueries.phablet`
    margin: 15px auto 55px;
  `};
`;

const Table: React.FC<{}> = ({ children }) => {
  const hasCaption = React.Children.toArray(children).some(
    child => React.isValidElement(child) && child.type === "caption",
  );

  const enhancedChildren = React.Children.map(children, child => {
    if (!React.isValidElement(child)) return child;

    if (child.type === "thead" || child.type === "tbody" || child.type === "tfoot") {
      const sectionChildren = React.Children.map(child.props.children, row => {
        if (!React.isValidElement(row) || row.type !== "tr") return row;

        const rowChildren = React.Children.map(row.props.children, cell => {
          if (!React.isValidElement(cell) || cell.type !== "th") return cell;
          return React.cloneElement(cell, { scope: cell.props.scope || "col" });
        });

        return React.cloneElement(row, row.props, rowChildren);
      });

      return React.cloneElement(child, child.props, sectionChildren);
    }

    return child;
  });

  return (
    <div
      style={{ overflowX: "auto", padding: "0 20px" }}
      role="region"
      aria-label="Scrollable table container"
    >
      <StyledTable>
        {!hasCaption && <caption className="sr-only">Data table</caption>}
        {enhancedChildren}
      </StyledTable>
    </div>
  );
};

export default Table;
