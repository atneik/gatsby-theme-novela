import styled from "@emotion/styled";
import mediaqueries from "@styles/media";

const Blockquote = styled.blockquote`
  transition: ${p => p.theme.colorModeTransition};
  margin: 15px auto 50px;
  color: ${p => p.theme.colors.articleText};
  font-family: ${p => p.theme.fonts.serif};
  font-style: italic;

  ${mediaqueries.tablet`
    margin: 10px auto 35px;
  `};

  & > p {
    font-family: ${p => p.theme.fonts.serif};
    max-width: 680px !important;
    padding-right: 0;
    padding-bottom: 0;
    width: 100%;
    margin: 0 auto;
    font-size: 22px;
    line-height: 1.32;
    font-weight: bold;

    ${mediaqueries.tablet`
      font-size: 18px;
      padding: 0 180px;
    `};

    ${mediaqueries.phablet`
      font-size: 20px;
      padding: 0 20px 0 40px;
    `};
  }
`;

export default Blockquote;
