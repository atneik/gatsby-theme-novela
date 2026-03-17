import styled from "@emotion/styled";
import mediaqueries from "@styles/media";

const Blockquote = styled.blockquote`
  transition: ${p => p.theme.colorModeTransition};
  margin: 15px auto 50px;
  width: 100%;
  max-width: 680px;
  border-left: 3px solid ${p => p.theme.colors.articleText};
  padding: 4px 0 4px 20px;
  color: ${p => p.theme.colors.articleText};
  font-family: ${p => p.theme.fonts.serif};
  font-style: italic;

  ${mediaqueries.desktop`
    max-width: 507px;
  `}

  ${mediaqueries.tablet`
    max-width: 486px;
    margin: 10px auto 35px;
  `};

  ${mediaqueries.phablet`
    padding: 4px 0 4px 16px;
  `};

  & > p {
    font-family: ${p => p.theme.fonts.serif};
    max-width: 100% !important;
    padding: 0;
    width: 100%;
    margin: 0;
    font-size: 22px;
    line-height: 1.32;
    font-weight: bold;

    ${mediaqueries.tablet`
      font-size: 18px;
    `};

    ${mediaqueries.phablet`
      font-size: 20px;
    `};
  }
`;

export default Blockquote;
